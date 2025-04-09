import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { posts, users, comments, reviews } from "@/server/db/schema";
import { desc, eq, sql, and, like, or } from "drizzle-orm";

export const postsRouter = createTRPCRouter({
	// Get all posts with pagination
	getAll: publicProcedure
		.input(
			z.object({
				limit: z.number().min(1).max(100).default(10),
				cursor: z.number().optional(), // for pagination
				filterByCategory: z.array(z.string()).optional(),
				filterByCredibility: z.array(z.string()).optional(),
				timeRange: z
					.enum(["all", "today", "week", "month", "year"])
					.default("all"),
				followedOnly: z.boolean().default(false),
				searchQuery: z.string().optional(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const { limit, cursor, filterByCredibility, timeRange, searchQuery } =
				input;

			// Build conditions array
			const conditions = [];

			// Apply cursor if provided (for pagination)
			if (cursor) {
				conditions.push(sql`${posts.id} < ${cursor}`);
			}

			// Apply time range filter
			if (timeRange !== "all") {
				const now = new Date();
				const startDate = new Date();

				switch (timeRange) {
					case "today":
						startDate.setHours(0, 0, 0, 0);
						break;
					case "week":
						startDate.setDate(now.getDate() - 7);
						break;
					case "month":
						startDate.setMonth(now.getMonth() - 1);
						break;
					case "year":
						startDate.setFullYear(now.getFullYear() - 1);
						break;
				}

				conditions.push(sql`${posts.createdAt} >= ${startDate}`);
			}

			// Apply credibility filter if provided
			if (filterByCredibility && filterByCredibility.length > 0) {
				conditions.push(
					sql`${posts.consensusTag} IN (${sql.join(filterByCredibility.map(tag => sql`${tag}`), sql`, `)})`,
				);
			}

			// Apply search query if provided
			if (searchQuery && searchQuery.trim() !== "") {
				conditions.push(like(posts.content, `%${searchQuery}%`));
			}

			// Build the final query
			const query = ctx.db
				.select({
					id: posts.id,
					content: posts.content,
					mediaUrls: posts.mediaUrls,
					sourceUrls: posts.sourceUrls,
					createdAt: posts.createdAt,
					updatedAt: posts.updatedAt,
					userId: posts.userId,
					consensusTag: posts.consensusTag,
					credibilityScore: posts.credibilityScore,
				})
				.from(posts)
				.where(conditions.length > 0 ? and(...conditions) : undefined)
				.orderBy(desc(posts.createdAt))
				.limit(limit + 1);

			// Execute the query
			const items = await query;

			// Get counts and user information for each post
			const postsWithDetails = await Promise.all(
				items.slice(0, limit).map(async (post) => {
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
						...post,
						commentCount,
						reviewCount,
						sources: post.sourceUrls || [],
						hasMedia:
							Array.isArray(post.mediaUrls) && post.mediaUrls.length > 0,
						user: user
							? {
									id: user.id,
									name: user.displayName || "Unknown User",
									handle: user.username ? `@${user.username}` : "@unknown",
									avatar:
										user.profileImageUrl ||
										"/placeholder.svg?height=40&width=40",
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
				}),
			);

			// Check if there are more results
			const hasMore = items.length > limit;
			const nextCursor = hasMore ? items[limit - 1]?.id : undefined;
      
      return {
        items: postsWithDetails,
        nextCursor,
        hasMore,
      };
		}),
});
