"use client";

import { useAuth } from "@clerk/nextjs";
import { api } from "@/trpc/react";
import { PostList } from "@/components/posts/post-list";
import { PostCreation } from "@/components/posts/post-creation";
import { usePostInteractions } from "@/hooks/use-post-interactions";

export default function PostsPage() {
  const { isSignedIn } = useAuth();
  const { data: posts, isLoading: isLoadingPosts } = api.post.all.useQuery();
  
  const {
    updatingPostId,
    setUpdatingPostId,
    isAddingBookmark,
    isRemovingBookmark,
    isUpvoting,
    isDownvoting,
    handleUpvote,
    handleDownvote,
    handleBookmarkToggle,
  } = usePostInteractions();

  return (
    <main className="container mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-0">
      <PostCreation />

      <PostList
        posts={posts}
        isLoading={isLoadingPosts}
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
    </main>
  );
}
