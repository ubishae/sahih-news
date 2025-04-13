import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { users, posts } from "@/server/db/schema";

export const userRouter = createTRPCRouter({
	me: protectedProcedure.query(async ({ ctx }) => {
		const user = await ctx.db.query.users.findFirst({
			where: eq(users.id, ctx.id),
		});

		// Get all posts by the user with their votes
		const userPosts = await ctx.db.query.posts.findMany({
			where: eq(posts.ownerId, ctx.id),
			with: {
				votes: true,
			},
		});

		// Calculate credibility score based on votes
		let totalUpvotes = 0;
		let totalDownvotes = 0;

		// Count all upvotes and downvotes on the user's posts
		for (const post of userPosts) {
			totalUpvotes += post.votes.filter(
				(vote) => vote.type === "upvote",
			).length;
			totalDownvotes += post.votes.filter(
				(vote) => vote.type === "downvote",
			).length;
		}

		// Calculate credibility score
		// Base score is 0
		// Upvotes increase score, downvotes decrease score
		// Minimum score is -100, maximum is 100
		let credibilityScore = 0; // Base score starts at 0

		if (totalUpvotes > 0 || totalDownvotes > 0) {
			// Calculate the difference between upvotes and downvotes
			const voteDifference = totalUpvotes - totalDownvotes;

			// Scale the vote difference to determine the score
			// We'll use a scaling factor to ensure reasonable score progression
			// For example, if a user has 20 upvotes and 0 downvotes, they should have a good positive score
			const scalingFactor = 5; // Adjust this value to control how quickly scores change
			credibilityScore = voteDifference * scalingFactor;

			// Ensure score is within bounds (-100 to 100)
			credibilityScore = Math.max(-100, Math.min(100, credibilityScore));
		}

		return { ...user, credibilityScore };
	}),
});
