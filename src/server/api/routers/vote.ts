import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { posts, votes } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const voteRouter = createTRPCRouter({
	upvote: protectedProcedure
		.input(z.object({ postId: z.number() }))
		.mutation(async ({ ctx, input }) => {
			const post = await ctx.db.query.posts.findFirst({
				where: eq(posts.id, input.postId),
			});

			if (!post) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Post not found",
				});
			}

			// Check if the user has already voted on this post
			const existingVote = await ctx.db.query.votes.findFirst({
				where: (vote) =>
					and(eq(vote.userId, ctx.id), eq(vote.postId, input.postId)),
			});

			if (existingVote) {
				// If already upvoted, remove the vote
				if (existingVote.type === "upvote") {
					await ctx.db
						.delete(votes)
						.where(
							and(eq(votes.userId, ctx.id), eq(votes.postId, input.postId)),
						);

					return { message: "Vote removed" };
				}

				// Update the vote to upvote
				await ctx.db
					.update(votes)
					.set({ type: "upvote" })
					.where(and(eq(votes.userId, ctx.id), eq(votes.postId, input.postId)));

				return { message: "Vote updated" };
			}

			// Insert a new vote
			await ctx.db.insert(votes).values({
				userId: ctx.id,
				postId: input.postId,
				type: "upvote",
			});

			return { message: "Vote added" };
		}),

	downvote: protectedProcedure
		.input(z.object({ postId: z.number() }))
		.mutation(async ({ ctx, input }) => {
			const post = await ctx.db.query.posts.findFirst({
				where: eq(posts.id, input.postId),
			});

			if (!post) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Post not found",
				});
			}

			// Check if the user has already voted on this post
			const existingVote = await ctx.db.query.votes.findFirst({
				where: (vote) =>
					and(eq(vote.userId, ctx.id), eq(vote.postId, input.postId)),
			});

			if (existingVote) {
				// If already downvoted, remove the vote
				if (existingVote.type === "downvote") {
					await ctx.db
						.delete(votes)
						.where(
							and(eq(votes.userId, ctx.id), eq(votes.postId, input.postId)),
						);

					return { message: "Vote removed" };
				}

				// Update the vote to downvote
				await ctx.db
					.update(votes)
					.set({ type: "downvote" })
					.where(and(eq(votes.userId, ctx.id), eq(votes.postId, input.postId)));

				return { message: "Vote updated" };
			}

			// Insert a new vote
			await ctx.db.insert(votes).values({
				userId: ctx.id,
				postId: input.postId,
				type: "downvote",
			});

			return { message: "Vote added" };
		}),
});
