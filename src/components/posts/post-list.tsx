import type { Post } from "@/types";
import PostCard from "./post-card";
import { PostSkeleton } from "./post-skeleton";

interface PostListProps {
	posts?: Post[];
	isLoading: boolean;
	updatingPostId: number | null;
	setUpdatingPostId: (id: number | null) => void;
	isUpvoting: boolean;
	isDownvoting: boolean;
	isAddingBookmark: boolean;
	isRemovingBookmark: boolean;
	isSignedIn: boolean;
	onUpvote: (postId: number) => void;
	onDownvote: (postId: number) => void;
	onBookmarkToggle: (postId: number, isBookmarked: boolean) => void;
}

export function PostList({
	posts,
	isLoading,
	updatingPostId,
	setUpdatingPostId,
	isUpvoting,
	isDownvoting,
	isAddingBookmark,
	isRemovingBookmark,
	isSignedIn,
	onUpvote,
	onDownvote,
	onBookmarkToggle,
}: PostListProps) {
	if (isLoading) {
		return (
			<div className="space-y-4">
				{[1, 2, 3].map((i) => (
					<PostSkeleton key={i} />
				))}
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{posts?.map((post) => (
				<PostCard
					key={post.id}
					post={post}
					updatingPostId={updatingPostId}
					setUpdatingPostId={setUpdatingPostId}
					isUpvoting={isUpvoting}
					isDownvoting={isDownvoting}
					isAddingBookmark={isAddingBookmark}
					isRemovingBookmark={isRemovingBookmark}
					isSignedIn={isSignedIn}
					onUpvote={onUpvote}
					onDownvote={onDownvote}
					onBookmarkToggle={onBookmarkToggle}
				/>
			))}
		</div>
	);
}
