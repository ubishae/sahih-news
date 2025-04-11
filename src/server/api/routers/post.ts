import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { posts as postsTable } from "@/server/db/schema";
import { desc, eq } from "drizzle-orm";

export const postRouter = createTRPCRouter({
	getAll: publicProcedure.query(async ({ ctx }) => {
		const allPosts = await ctx.db.query.posts.findMany({
			orderBy: desc(postsTable.createdAt),
			with: {
				bookmarks: true,
				owner: true,
			},
		});

		// If user is authenticated, check if each post is bookmarked by the current user
		if (ctx.user) {
			// First get the database user ID
			const dbUser = await ctx.db.query.users.findFirst({
				where: (user) => eq(user.clerkId, ctx.user?.id || ""),
			});

			if (dbUser) {
				return allPosts.map((post) => ({
					...post,
					isBookmarked: post.bookmarks.some(
						(bookmark) => bookmark.ownerId === dbUser.id,
					),
				}));
			}
		}

		// If user is not authenticated or not found in DB, set isBookmarked to false for all posts
		return allPosts.map((post) => ({
			...post,
			isBookmarked: false,
		}));
	}),

	create: protectedProcedure
		.input(z.object({ content: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const post = await ctx.db
				.insert(postsTable)
				.values({
					content: input.content,
					ownerId: ctx.id,
				})
				.returning();
			return post;
		}),
});
