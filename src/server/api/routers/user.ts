import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { users } from "@/server/db/schema";

export const userRouter = createTRPCRouter({
	me: protectedProcedure.query(({ ctx }) => {
		return ctx.db.query.users.findFirst({
			where: eq(users.id, ctx.id),
		});
	}),
});
