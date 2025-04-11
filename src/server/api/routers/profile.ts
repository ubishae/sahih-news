import { users } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const profileRouter = createTRPCRouter({
	me: protectedProcedure.query(async ({ ctx }) => {
		const user = await ctx.db.query.users.findFirst({
			where: (user, { eq }) => eq(user.clerkId, ctx.user.id),
		});

		if (!user) {
			throw new TRPCError({
				code: "NOT_FOUND",
				message: "User not found",
			});
		}

		return user;
	}),

	update: protectedProcedure
		.input(
			z.object({
				username: z.string().min(3).max(255),
				displayName: z.string().min(3).max(255),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const username = input.username.trim();
			const displayName = input.displayName.trim();

			const existingUser = await ctx.db.query.users.findFirst({
				where: (user, { eq }) => eq(user.username, username),
			});

			if (existingUser && existingUser.username !== ctx.user.username) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "Username already exists",
				});
			}

			const user = await ctx.db
				.update(users)
				.set({
					username: existingUser ? username : (existingUser ?? username),
					displayName,
				})
				.where(eq(users.clerkId, ctx.user.id))
				.returning();
			return user;
		}),

	existingUsername: protectedProcedure
		.input(z.string())
		.query(async ({ ctx, input }) => {
			const user = await ctx.db.query.users.findFirst({
				where: (user, { eq }) => eq(user.username, input),
			});

			return !!user;
		}),
});
