"use client";

import { useAuth } from "@clerk/nextjs";
import { api } from "@/trpc/react";
import { PostList } from "@/components/posts/post-list";
import { usePostInteractions } from "@/hooks/use-post-interactions";
import { useState } from "react";

export default function BookmarksPage() {
	const { isSignedIn } = useAuth();
	const { data: bookmarks, isLoading: isLoadingBookmarks } =
		api.bookmark.all.useQuery();
	const [updatingPostId, setUpdatingPostId] = useState<number | null>(null);

	const {
		isAddingBookmark,
		isRemovingBookmark,
		isUpvoting,
		isDownvoting,
		handleUpvote,
		handleDownvote,
		handleBookmarkToggle,
	} = usePostInteractions();

	// Transform bookmarks data to match the Post interface
	// Ensure all posts are marked as bookmarked
	const posts = bookmarks?.map(({ post }) => ({
		...post,
		isBookmarked: true, // Explicitly set isBookmarked to true for all posts in bookmarks
	}));

	return (
		<main className="container mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-0">
			<h1 className="mb-6 font-bold text-2xl">Your Bookmarks</h1>

			<PostList
				posts={posts}
				isLoading={isLoadingBookmarks}
				updatingPostId={updatingPostId}
				setUpdatingPostId={setUpdatingPostId}
				isUpvoting={isUpvoting}
				isDownvoting={isDownvoting}
				isAddingBookmark={isAddingBookmark}
				isRemovingBookmark={isRemovingBookmark}
				isSignedIn={isSignedIn ?? false}
				onUpvote={handleUpvote}
				onDownvote={handleDownvote}
				onBookmarkToggle={handleBookmarkToggle}
			/>

			{posts?.length === 0 && !isLoadingBookmarks && (
				<div className="mt-8 rounded-lg border bg-card p-8 text-center">
					<h3 className="mb-2 font-medium text-lg">No bookmarks yet</h3>
					<p className="text-muted-foreground">
						When you bookmark posts, they will appear here for easy access.
					</p>
				</div>
			)}
		</main>
	);
}
