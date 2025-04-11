import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { posts } from "@/server/db/schema";
import { desc } from "drizzle-orm";

export const postRouter = createTRPCRouter({
	getAll: publicProcedure.query(async ({ ctx }) => {
		return await ctx.db.query.posts.findMany({
			orderBy: desc(posts.createdAt),
		});
	}),
	create: protectedProcedure
		.input(z.object({ content: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const post = await ctx.db
				.insert(posts)
				.values({
					content: input.content,
					ownerId: ctx.id,
				})
				.returning();
			return post;
		}),
});
