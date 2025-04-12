"use client";

import PostForm from "@/components/post-form";
import RichTextPreview from "@/components/rich-text-preview";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { Bookmark, Clock } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export default function PostsPage() {
	const utils = api.useUtils();

	const { data: posts, isLoading: isLoadingPosts } = api.post.all.useQuery();

	const { mutate: addBookmark, isPending: isAddingBookmark } =
		api.bookmark.add.useMutation({
			onSuccess: () => {
				toast("Bookmark added", {
					icon: <Bookmark className="fill-current" />,
				});
				utils.post.all.invalidate();
				utils.bookmark.all.invalidate();
			},
		});

	const { mutate: removeBookmark, isPending: isRemovingBookmark } =
		api.bookmark.remove.useMutation({
			onSuccess: () => {
				toast("Bookmark removed", {
					icon: <Bookmark />,
				});
				utils.post.all.invalidate();
			},
		});

	return (
		<main className="container mx-auto max-w-3xl py-8">
			<div className="mb-8">
				<PostForm />
			</div>

			{isLoadingPosts ? (
				<div className="space-y-4">
					{[1, 2, 3].map((i) => (
						<Card key={i} className="overflow-hidden">
							<CardHeader className="pb-2">
								<div className="flex items-center gap-3">
									<Skeleton className="h-10 w-10 rounded-full" />
									<div className="space-y-2">
										<Skeleton className="h-4 w-32" />
										<Skeleton className="h-3 w-24" />
									</div>
								</div>
							</CardHeader>
							<CardContent className="pb-3">
								<div className="space-y-2">
									<Skeleton className="h-4 w-full" />
									<Skeleton className="h-4 w-full" />
									<Skeleton className="h-4 w-2/3" />
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			) : (
				<div className="space-y-4">
					{posts?.map((post) => (
						<Card key={post.id} className="overflow-hidden">
							<CardHeader className="pb-2">
								<div className="flex justify-between">
									<div className="flex items-center gap-3">
										<Image
											src={post.owner.profileImageUrl}
											alt={post.owner.displayName}
											className="rounded-full object-cover"
											width={40}
											height={40}
										/>
										<div>
											<h3 className="font-medium">{post.owner.displayName}</h3>
											<div className="flex items-center gap-1 text-muted-foreground text-xs">
												<Clock className="h-3 w-3" />
												<time dateTime={post.createdAt.toISOString()}>
													{new Date(post.createdAt).toLocaleDateString()}
												</time>
											</div>
										</div>
									</div>
									{post.isOwner && <PostForm post={post} />}
								</div>
							</CardHeader>
							<CardContent className="pb-3">
								<RichTextPreview content={post.content} />
							</CardContent>
							<CardFooter className="flex justify-between border-t pt-3">
								<div className="text-muted-foreground text-xs">
									{/* Placeholder for future features like comments count */}
								</div>
								<Button
									variant="ghost"
									size="sm"
									className="gap-2"
									disabled={
										isLoadingPosts || isAddingBookmark || isRemovingBookmark
									}
									onClick={() => {
										if (post.isBookmarked) {
											removeBookmark({ postId: post.id });
										} else {
											addBookmark({ postId: post.id });
										}
									}}
								>
									<Bookmark
										className={cn("h-4 w-4", {
											"fill-current text-primary": post.isBookmarked,
										})}
									/>
									<span className="text-xs">
										{post.isBookmarked ? "Bookmarked" : "Bookmark"}
									</span>
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			)}
		</main>
	);
}
