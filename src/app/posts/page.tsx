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
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { useAuth } from "@clerk/nextjs";
import { Bookmark, Clock, ThumbsDown, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export default function PostsPage() {
	const utils = api.useUtils();
	const { isSignedIn } = useAuth();

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

	const { mutate: upvote, isPending: isUpvoting } = api.vote.upvote.useMutation(
		{
			onSuccess: () => {
				utils.post.all.invalidate();
				toast("Post upvoted", {
					icon: <ThumbsUp className="fill-current" />,
				});
			},
		},
	);

	const { mutate: downvote, isPending: isDownvoting } =
		api.vote.downvote.useMutation({
			onSuccess: () => {
				utils.post.all.invalidate();
				toast("Post downvoted", {
					icon: <ThumbsDown className="fill-current" />,
				});
			},
		});

	return (
		<main className="container mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-0">
			<div className="mb-8 rounded-lg border bg-card p-4 shadow-sm">
				<h2 className="mb-4 font-semibold text-xl">Share News</h2>
				<PostForm />
			</div>

			{isLoadingPosts ? (
				<div className="space-y-4">
					{[1, 2, 3].map((i) => (
						<Card
							key={i}
							className="overflow-hidden border-muted/60 shadow-sm transition-shadow duration-200 hover:shadow"
						>
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
						<Card
							key={post.id}
							className="overflow-hidden border-muted/60 shadow-sm transition-shadow duration-200 hover:shadow"
						>
							<CardHeader className="pb-2">
								<div className="flex justify-between">
									<div className="flex items-center gap-3">
										<div className="h-10 w-10 overflow-hidden rounded-full shadow-sm ring-2 ring-background">
											<Image
												src={post.owner.profileImageUrl}
												alt={post.owner.displayName}
												className="h-full w-full object-cover"
												width={40}
												height={40}
											/>
										</div>
										<div>
											<h3 className="font-medium text-foreground/90">
												{post.owner.displayName}
											</h3>
											<div className="flex items-center gap-1 text-muted-foreground text-xs">
												<Clock className="h-3 w-3" />
												<time dateTime={post.createdAt.toISOString()}>
													{new Date(post.createdAt).toLocaleDateString(
														undefined,
														{
															year: "numeric",
															month: "short",
															day: "numeric",
														},
													)}
												</time>
											</div>
										</div>
									</div>
									{post.isOwner && (
										<div className="ml-2">
											<PostForm post={post} />
										</div>
									)}
								</div>
							</CardHeader>
							<CardContent className="pb-3">
								<div className="prose prose-sm dark:prose-invert max-w-none">
									<RichTextPreview content={post.content} />
								</div>
							</CardContent>
							<CardFooter className="flex items-center justify-between border-t pt-3">
								<div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
									{/* Voting controls */}
									<div className="flex items-center rounded-md border bg-background p-1">
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger asChild>
													<Button
														variant="ghost"
														size="sm"
														disabled={isUpvoting || isDownvoting || !isSignedIn}
														className={`h-8 rounded-r-none border-r px-2 ${
															post.voteType === "upvote"
																? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30"
																: "hover:bg-muted"
														}`}
														onClick={() => upvote({ postId: post.id })}
													>
														<ThumbsUp className="mr-1 h-4 w-4" />
														<span className="font-medium">
															{post.upvoteCount}
														</span>
													</Button>
												</TooltipTrigger>
												<TooltipContent>
													<p>Mark as accurate</p>
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>

										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger asChild>
													<Button
														variant="ghost"
														size="sm"
														disabled={isUpvoting || isDownvoting || !isSignedIn}
														className={`h-8 rounded-l-none px-2 ${
															post.voteType === "downvote"
																? "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
																: "hover:bg-muted"
														}`}
														onClick={() => downvote({ postId: post.id })}
													>
														<ThumbsDown className="mr-1 h-4 w-4" />
														<span className="font-medium">
															{post.downvoteCount}
														</span>
													</Button>
												</TooltipTrigger>
												<TooltipContent>
													<p>Mark as inaccurate</p>
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</div>

									<div className="text-muted-foreground text-xs">
										{post.upvoteCount > post.downvoteCount ? (
											<span className="text-green-600 dark:text-green-400">
												Mostly accurate
											</span>
										) : post.downvoteCount > post.upvoteCount ? (
											<span className="text-red-600 dark:text-red-400">
												Mostly inaccurate
											</span>
										) : post.upvoteCount > 0 || post.downvoteCount > 0 ? (
											<span>Mixed accuracy</span>
										) : null}
									</div>
								</div>

								{/* Bookmark button */}
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												variant={post.isBookmarked ? "secondary" : "ghost"}
												size="sm"
												className="gap-2"
												disabled={
													isLoadingPosts ||
													isAddingBookmark ||
													isRemovingBookmark
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
													{post.isBookmarked ? "Saved" : "Save"}
												</span>
											</Button>
										</TooltipTrigger>
										<TooltipContent>
											<p>
												{post.isBookmarked
													? "Remove from bookmarks"
													: "Add to bookmarks"}
											</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</CardFooter>
						</Card>
					))}
				</div>
			)}
		</main>
	);
}
