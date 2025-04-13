import type { posts } from "@/server/db/schema";

export type Post = typeof posts.$inferSelect & {
	isBookmarked?: boolean;
	isOwner?: boolean;
	owner?: {
		displayName: string;
		profileImageUrl: string;
	};
	voteType?: "upvote" | "downvote" | null;
	upvoteCount?: number;
	downvoteCount?: number;
};
