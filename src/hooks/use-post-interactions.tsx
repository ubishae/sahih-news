import { api } from "@/trpc/react";
import { Bookmark, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function usePostInteractions() {
	const utils = api.useUtils();
	const [updatingPostId, setUpdatingPostId] = useState<number | null>(null);

	const { mutate: addBookmark, isPending: isAddingBookmark } =
		api.bookmark.add.useMutation({
			onSuccess: () => {
				toast("Bookmark added", {
					icon: <Bookmark className="fill-current" />,
				});
				utils.post.all.invalidate();
				utils.bookmark.all.invalidate();
				setUpdatingPostId(null);
			},
		});

	const { mutate: removeBookmark, isPending: isRemovingBookmark } =
		api.bookmark.remove.useMutation({
			onSuccess: () => {
				toast("Bookmark removed", {
					icon: <Bookmark />,
				});
				utils.post.all.invalidate();
				utils.bookmark.all.invalidate();
				setUpdatingPostId(null);
			},
		});

	const { mutate: upvote, isPending: isUpvoting } = api.vote.upvote.useMutation(
		{
			onSuccess: (data) => {
				utils.post.all.invalidate();
				toast(data.message, {
					icon: <ThumbsUp className="fill-current" />,
				});
				setUpdatingPostId(null);
			},
		},
	);

	const { mutate: downvote, isPending: isDownvoting } =
		api.vote.downvote.useMutation({
			onSuccess: (data) => {
				utils.post.all.invalidate();
				toast(data.message, {
					icon: <ThumbsDown className="fill-current" />,
				});
				setUpdatingPostId(null);
			},
		});

	const handleUpvote = (postId: number) => {
		setUpdatingPostId(postId);
		upvote({ postId });
	};

	const handleDownvote = (postId: number) => {
		setUpdatingPostId(postId);
		downvote({ postId });
	};

	const handleBookmarkToggle = (postId: number, isBookmarked: boolean) => {
		setUpdatingPostId(postId);
		if (isBookmarked) {
			removeBookmark({ postId });
		} else {
			addBookmark({ postId });
		}
	};

	return {
		updatingPostId,
		setUpdatingPostId,
		isAddingBookmark,
		isRemovingBookmark,
		isUpvoting,
		isDownvoting,
		handleUpvote,
		handleDownvote,
		handleBookmarkToggle,
	};
}
