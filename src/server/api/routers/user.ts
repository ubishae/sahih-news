import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";
import { users, follows, userBadges, badges } from "@/server/db/schema";
import { eq, desc, count, and } from "drizzle-orm";

export const userRouter = createTRPCRouter({
  // Get current user profile with credibility score and badges
  getCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.user?.id) {
      return null;
    }

    const user = await ctx.db.query.users.findFirst({
      where: eq(users.id, ctx.user.id),
      with: {
        badges: {
          with: {
            badge: true,
          },
        },
      },
    });

    // Ensure we return null instead of undefined if no user is found
    return user || null;
  }),

  // Get user by ID or username
  getUser: publicProcedure
    .input(
      z.object({
        id: z.string().optional(),
        username: z.string().optional(),
      }).refine(data => data.id || data.username, {
        message: "Either id or username must be provided",
      })
    )
    .query(async ({ ctx, input }) => {
      if (input.id) {
        const user = await ctx.db.query.users.findFirst({
          where: eq(users.id, input.id),
          with: {
            badges: {
              with: {
                badge: true,
              },
            },
          },
        });
        return user || null;
      }
      
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.username, input.username as string),
        with: {
          badges: {
            with: {
              badge: true,
            },
          },
        },
      });
      return user || null;
    }),

  // Get user's followers count
  getFollowersCount: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db
        .select({ count: count() })
        .from(follows)
        .where(eq(follows.followingId, input.userId));
      
      return result[0]?.count || 0;
    }),

  // Get user's following count
  getFollowingCount: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db
        .select({ count: count() })
        .from(follows)
        .where(eq(follows.followerId, input.userId));
      
      return result[0]?.count || 0;
    }),

  // Check if current user is following another user
  isFollowing: protectedProcedure
    .input(z.object({ targetUserId: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.user?.id) {
        return false;
      }

      const follow = await ctx.db.query.follows.findFirst({
        where: and(
          eq(follows.followerId, ctx.user.id),
          eq(follows.followingId, input.targetUserId)
        ),
      });

      return !!follow;
    }),

  // Follow a user
  followUser: protectedProcedure
    .input(z.object({ targetUserId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user?.id || ctx.user.id === input.targetUserId) {
        throw new Error("Cannot follow yourself");
      }

      // Check if already following
      const existingFollow = await ctx.db.query.follows.findFirst({
        where: and(
          eq(follows.followerId, ctx.user.id),
          eq(follows.followingId, input.targetUserId)
        ),
      });

      if (existingFollow) {
        return { success: true, alreadyFollowing: true };
      }

      // Create follow relationship
      await ctx.db.insert(follows).values({
        followerId: ctx.user.id,
        followingId: input.targetUserId,
      });

      return { success: true, alreadyFollowing: false };
    }),

  // Unfollow a user
  unfollowUser: protectedProcedure
    .input(z.object({ targetUserId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user?.id) {
        throw new Error("Not authenticated");
      }

      await ctx.db
        .delete(follows)
        .where(
          and(
            eq(follows.followerId, ctx.user.id),
            eq(follows.followingId, input.targetUserId)
          )
        );

      return { success: true };
    }),

  // Get user's primary badge (the one to display in dropdown)
  getPrimaryBadge: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const userBadge = await ctx.db.query.userBadges.findFirst({
        where: eq(userBadges.userId, input.userId),
        with: {
          badge: true,
        },
        orderBy: [desc(userBadges.awardedAt)],
      });

      return userBadge?.badge || null;
    }),
});
