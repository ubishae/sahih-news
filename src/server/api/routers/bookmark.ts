import { bookmarks } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { and, eq } from "drizzle-orm";

export const bookmarkRouter = createTRPCRouter({
	all: protectedProcedure.query(({ ctx }) => {
		return ctx.db.query.bookmarks.findMany({
			where: (bookmarks) => eq(bookmarks.ownerId, ctx.id),
		});
	}),

	add: protectedProcedure
		.input(z.object({ postId: z.number() }))
		.mutation(async ({ ctx, input }) => {
			const { postId } = input;
			const user = await ctx.db.query.users.findFirst({
				where: (users) => eq(users.id, ctx.id),
			});

			if (!user) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "User not found",
				});
			}

			const bookmark = await ctx.db.insert(bookmarks).values({
				ownerId: user.id,
				postId,
			});

			return bookmark;
		}),

	remove: protectedProcedure
		.input(z.object({ postId: z.number() }))
		.mutation(async ({ ctx, input }) => {
			const { postId } = input;
			const user = await ctx.db.query.users.findFirst({
				where: (users) => eq(users.id, ctx.id),
			});

			if (!user) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "User not found",
				});
			}

			const bookmark = await ctx.db
				.delete(bookmarks)
				.where(
					and(eq(bookmarks.ownerId, user.id), eq(bookmarks.postId, postId)),
				);

			return bookmark;
		}),
});
