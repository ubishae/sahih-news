"use client";

import PostForm from "@/components/post-form";
import RichTextPreview from "@/components/rich-text-preview";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { Bookmark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

export default function PostsPage() {
	const utils = api.useUtils();

	const { data: posts, isLoading: isLoadingPosts } = api.post.getAll.useQuery();

	const { mutate: addBookmark, isPending: isAddingBookmark } =
		api.bookmark.add.useMutation({
			onSuccess: () => {
				toast("Bookmark added", {
					icon: <Bookmark className="fill-current" />,
				});
				utils.post.getAll.invalidate();
			},
		});

	const { mutate: removeBookmark, isPending: isRemovingBookmark } =
		api.bookmark.remove.useMutation({
			onSuccess: () => {
				toast("Bookmark removed", {
					icon: <Bookmark />,
				});
				utils.post.getAll.invalidate();
			},
		});

	return (
		<main>
			<PostForm />
			{posts?.map((post) => (
				<article key={post.id}>
					<Image
						src={post.owner.profileImageUrl}
						alt={post.owner.displayName}
						className="circle"
						width={40}
						height={40}
					/>
					<RichTextPreview content={post.content} />
					<Button
						variant="ghost"
						disabled={isLoadingPosts || isAddingBookmark || isRemovingBookmark}
						onClick={() => {
							if (post.isBookmarked) {
								removeBookmark({ postId: post.id });
							} else {
								addBookmark({ postId: post.id });
							}
						}}
					>
						<Bookmark
							className={cn({
								"fill-current": post.isBookmarked,
							})}
						/>
					</Button>
				</article>
			))}
		</main>
	);
}
