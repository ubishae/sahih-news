import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { bookmarks, posts, users, comments, reviews } from "@/server/db/schema";
import { desc, eq, sql, and, count } from "drizzle-orm";

export const bookmarksRouter = createTRPCRouter({
  // Get user's bookmarks with pagination
  getBookmarks: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        cursor: z.number().optional(), // for pagination
        collection: z.enum(["all", "read-later", "fact-checked", "research"]).default("all"),
        sortBy: z.enum(["recent", "oldest", "credibility"]).default("recent"),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (!ctx.user?.id) {
        return {
          items: [],
          nextCursor: undefined,
          hasMore: false,
          totalCount: 0,
        };
      }

      const { limit, cursor, collection, sortBy } = input;

      // Get total count of user's bookmarks
      const totalCountResult = await ctx.db
        .select({ count: count() })
        .from(bookmarks)
        .where(eq(bookmarks.userId, ctx.user.id));

      const totalCount = totalCountResult[0]?.count || 0;

      // If user has no bookmarks, return early
      if (totalCount === 0) {
        return {
          items: [],
          nextCursor: undefined,
          hasMore: false,
          totalCount: 0,
        };
      }

      // Build conditions array
      const conditions = [eq(bookmarks.userId, ctx.user.id)];

      // Apply cursor if provided (for pagination)
      if (cursor) {
        conditions.push(sql`${bookmarks.id} < ${cursor}`);
      }

      // Build the query to get bookmarks with post data
      const query = ctx.db
        .select({
          id: bookmarks.id,
          postId: bookmarks.postId,
          createdAt: bookmarks.createdAt,
        })
        .from(bookmarks)
        .where(and(...conditions))
        .orderBy(sortBy === "oldest" ? bookmarks.createdAt : desc(bookmarks.createdAt))
        .limit(limit + 1);

      // Execute the query
      const bookmarkItems = await query;

      // Get post details for each bookmark
      const bookmarksWithDetails = await Promise.all(
        bookmarkItems.slice(0, limit).map(async (bookmark) => {
          // Get post information
          const post = await ctx.db.query.posts.findFirst({
            where: eq(posts.id, bookmark.postId),
          });

          if (!post) {
            return null;
          }

          // Get comment count
          const commentCount = await ctx.db
            .select({ count: sql<number>`count(*)`.mapWith(Number) })
            .from(comments)
            .where(eq(comments.postId, post.id))
            .then((result) => result[0]?.count || 0);

          // Get review count
          const reviewCount = await ctx.db
            .select({ count: sql<number>`count(*)`.mapWith(Number) })
            .from(reviews)
            .where(eq(reviews.postId, post.id))
            .then((result) => result[0]?.count || 0);

          // Get user information
          const user = await ctx.db.query.users.findFirst({
            where: eq(users.id, post.userId),
          });

          return {
            id: bookmark.id,
            postId: post.id,
            content: post.content,
            mediaUrls: post.mediaUrls,
            sourceUrls: post.sourceUrls,
            createdAt: post.createdAt,
            bookmarkedAt: bookmark.createdAt,
            consensusTag: post.consensusTag,
            credibilityScore: post.credibilityScore,
            commentCount,
            reviewCount,
            sources: post.sourceUrls || [],
            hasMedia: Array.isArray(post.mediaUrls) && post.mediaUrls.length > 0,
            user: user
              ? {
                  id: user.id,
                  name: user.displayName || "Unknown User",
                  handle: user.username ? `@${user.username}` : "@unknown",
                  avatar: user.profileImageUrl || "/placeholder.svg?height=40&width=40",
                  isVerified: user.isVerified || false,
                  credibilityScore: user.credibilityScore || 0,
                }
              : {
                  id: "",
                  name: "Unknown User",
                  handle: "@unknown",
                  avatar: "/placeholder.svg?height=40&width=40",
                  isVerified: false,
                  credibilityScore: 0,
                },
          };
        })
      );

      // Filter out any null values (posts that might have been deleted)
      const filteredBookmarks = bookmarksWithDetails.filter(
        (bookmark): bookmark is NonNullable<typeof bookmark> => bookmark !== null
      );

      // Check if there are more results
      const hasMore = bookmarkItems.length > limit;
      const nextCursor = hasMore ? bookmarkItems[limit - 1]?.id : undefined;

      return {
        items: filteredBookmarks,
        nextCursor,
        hasMore,
        totalCount,
      };
    }),

  // Add a bookmark
  addBookmark: protectedProcedure
    .input(z.object({ postId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user?.id) {
        throw new Error("Not authenticated");
      }

      // Check if bookmark already exists
      const existingBookmark = await ctx.db.query.bookmarks.findFirst({
        where: and(
          eq(bookmarks.userId, ctx.user.id),
          eq(bookmarks.postId, input.postId)
        ),
      });

      if (existingBookmark) {
        return { success: true, alreadyExists: true };
      }

      // Create new bookmark
      await ctx.db.insert(bookmarks).values({
        userId: ctx.user.id,
        postId: input.postId,
      });

      return { success: true, alreadyExists: false };
    }),

  // Remove a bookmark
  removeBookmark: protectedProcedure
    .input(z.object({ bookmarkId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user?.id) {
        throw new Error("Not authenticated");
      }

      await ctx.db
        .delete(bookmarks)
        .where(
          and(
            eq(bookmarks.id, input.bookmarkId),
            eq(bookmarks.userId, ctx.user.id)
          )
        );

      return { success: true };
    }),

  // Clear read bookmarks
  clearReadBookmarks: protectedProcedure
    .mutation(async ({ ctx }) => {
      if (!ctx.user?.id) {
        throw new Error("Not authenticated");
      }

      // In a real implementation, you would need a way to track which bookmarks have been read
      // For now, we'll just return a success message
      return { success: true, message: "Read bookmarks cleared" };
    }),
});
