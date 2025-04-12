import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { posts as postsTable } from "@/server/db/schema";
import { desc, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const postRouter = createTRPCRouter({
	all: publicProcedure.query(async ({ ctx }) => {
		if (!ctx.user) {
			const allPosts = await ctx.db.query.posts.findMany({
				orderBy: desc(postsTable.createdAt),
				with: {
					owner: true,
				},
			});

			return allPosts.map((post) => ({
				...post,
				isBookmarked: false,
				isOwner: false,
			}));
		}

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
					isOwner: post.ownerId === dbUser.id,
				}));
			}
		}
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

	update: protectedProcedure
		.input(z.object({ id: z.number(), content: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const post = await ctx.db.query.posts.findFirst({
				where: eq(postsTable.id, input.id),
			});

			if (!post) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Post not found",
				});
			}

			if (post.ownerId !== ctx.id) {
				throw new TRPCError({
					code: "UNAUTHORIZED",
					message: "You are not authorized to update this post",
				});
			}

			await ctx.db
				.update(postsTable)
				.set({
					content: input.content,
				})
				.where(eq(postsTable.id, input.id));

			return ctx.db.query.posts.findFirst({
				where: eq(postsTable.id, input.id),
			});
		}),
});
