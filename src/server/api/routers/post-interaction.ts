import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";
import { reactions, comments, reviews, bookmarks, posts } from "@/server/db/schema";
import { and, eq, sql, desc } from "drizzle-orm";

export const postInteractionRouter = createTRPCRouter({
  // Add a reaction to a post (accurate/inaccurate)
  addReaction: protectedProcedure
    .input(
      z.object({
        postId: z.number(),
        type: z.enum(["accurate", "inaccurate"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user?.id) {
        throw new Error("Not authenticated");
      }

      // Check if user already has a reaction of this type
      const existingReaction = await ctx.db.query.reactions.findFirst({
        where: and(
          eq(reactions.postId, input.postId),
          eq(reactions.userId, ctx.user.id),
          eq(reactions.type, input.type)
        ),
      });

      if (existingReaction) {
        // Remove the reaction if it already exists (toggle off)
        await ctx.db.delete(reactions).where(
          and(
            eq(reactions.postId, input.postId),
            eq(reactions.userId, ctx.user.id),
            eq(reactions.type, input.type)
          )
        );
        return { success: true, added: false };
      }
      
      // Remove any existing opposite reaction
      await ctx.db.delete(reactions).where(
        and(
          eq(reactions.postId, input.postId),
          eq(reactions.userId, ctx.user.id)
        )
      );

      // Add the new reaction
      await ctx.db.insert(reactions).values({
        postId: input.postId,
        userId: ctx.user.id,
        type: input.type,
      });
      return { success: true, added: true };
    }),

  // Get user's reaction to a post
  getUserReaction: protectedProcedure
    .input(z.object({ postId: z.number() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.user?.id) {
        return null;
      }

      const reaction = await ctx.db.query.reactions.findFirst({
        where: and(
          eq(reactions.postId, input.postId),
          eq(reactions.userId, ctx.user.id)
        ),
      });

      return reaction ? reaction.type : null;
    }),

  // Add a comment to a post
  addComment: protectedProcedure
    .input(
      z.object({
        postId: z.number(),
        content: z.string().min(1),
        parentId: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user?.id) {
        throw new Error("Not authenticated");
      }

      const result = await ctx.db.insert(comments).values({
        postId: input.postId,
        userId: ctx.user.id,
        content: input.content,
        parentId: input.parentId,
      }).returning();

      return result[0];
    }),

  // Get comments for a post
  getComments: publicProcedure
    .input(z.object({ postId: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.query.comments.findMany({
        where: eq(comments.postId, input.postId),
        with: {
          user: true,
          replies: {
            with: {
              user: true,
            },
          },
        },
        orderBy: [desc(comments.createdAt)],
      });
    }),

  // Add a review to a post
  addReview: protectedProcedure
    .input(
      z.object({
        postId: z.number(),
        credibilityTag: z.enum(["true", "false", "unverified", "misleading"]),
        comment: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user?.id) {
        throw new Error("Not authenticated");
      }

      // Check if user already has a review for this post
      const existingReview = await ctx.db.query.reviews.findFirst({
        where: and(
          eq(reviews.postId, input.postId),
          eq(reviews.userId, ctx.user.id)
        ),
      });

      if (existingReview) {
        // Update existing review
        await ctx.db
          .update(reviews)
          .set({
            credibilityTag: input.credibilityTag,
            comment: input.comment,
          })
          .where(
            and(
              eq(reviews.postId, input.postId),
              eq(reviews.userId, ctx.user.id)
            )
          );
      } else {
        // Create new review
        await ctx.db.insert(reviews).values({
          postId: input.postId,
          userId: ctx.user.id,
          credibilityTag: input.credibilityTag,
          comment: input.comment,
        });
      }

      // Update post consensus tag based on reviews
      // This is a simple implementation - in a real app, you might want a more sophisticated algorithm
      const reviewCounts = await ctx.db
        .select({
          tag: reviews.credibilityTag,
          count: sql`count(*)`.mapWith(Number),
        })
        .from(reviews)
        .where(eq(reviews.postId, input.postId))
        .groupBy(reviews.credibilityTag);

      if (reviewCounts.length > 0) {
        // Find the tag with the most reviews
        const mostCommonTag = reviewCounts.reduce((prev, current) => 
          prev.count > current.count ? prev : current
        );

        // Update the post's consensus tag
        await ctx.db
          .update(posts)
          .set({
            consensusTag: mostCommonTag.tag,
          })
          .where(eq(posts.id, input.postId));
      }

      return { success: true };
    }),

  // Toggle bookmark for a post
  toggleBookmark: protectedProcedure
    .input(z.object({ postId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user?.id) {
        throw new Error("Not authenticated");
      }

      // Check if bookmark already exists
      const existingBookmark = await ctx.db.query.bookmarks.findFirst({
        where: and(
          eq(bookmarks.postId, input.postId),
          eq(bookmarks.userId, ctx.user.id)
        ),
      });

      if (existingBookmark) {
        // Remove bookmark
        await ctx.db
          .delete(bookmarks)
          .where(
            and(
              eq(bookmarks.postId, input.postId),
              eq(bookmarks.userId, ctx.user.id)
            )
          );
        return { success: true, bookmarked: false };
      }
      
      // Add bookmark
      await ctx.db.insert(bookmarks).values({
        postId: input.postId,
        userId: ctx.user.id,
      });
      return { success: true, bookmarked: true };
    }),

  // Check if user has bookmarked a post
  isBookmarked: protectedProcedure
    .input(z.object({ postId: z.number() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.user?.id) {
        return false;
      }

      const bookmark = await ctx.db.query.bookmarks.findFirst({
        where: and(
          eq(bookmarks.postId, input.postId),
          eq(bookmarks.userId, ctx.user.id)
        ),
      });

      return !!bookmark;
    }),
});
