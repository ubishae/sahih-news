import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { profileRouter } from "./routers/profile";
import { postRouter } from "./routers/post";
import { bookmarkRouter } from "./routers/bookmark";
import { userRouter } from "./routers/user";
import { voteRouter } from "./routers/vote";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	profile: profileRouter,
	post: postRouter,
	bookmark: bookmarkRouter,
	user: userRouter,
	vote: voteRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
