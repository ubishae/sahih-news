import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { eq } from "drizzle-orm";
import { comments } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";

export const commentRouter = createTRPCRouter({
	create: protectedProcedure
		.input(z.object({ content: z.string(), postId: z.number() }))
		.mutation(async ({ input, ctx }) => {
			// Create a new comment
			try {
				await ctx.db.insert(comments).values({
					content: input.content,
					postId: input.postId,
					ownerId: ctx.id,
				});
			} catch (error) {
				console.error("Error creating comment:", error);
				return new TRPCError({
					code: "BAD_REQUEST",
					message: "Failed to create comment",
				});
			}

			return { message: "Comment created" };
		}),

	delete: protectedProcedure
		.input(z.object({ id: z.number() }))
		.mutation(async ({ input, ctx }) => {
			const { id } = input;

			// Delete the comment
			const deletedComment = await ctx.db
				.delete(comments)
				.where(eq(comments.id, id));

			return { message: "Comment deleted" };
		}),
});
