import { useModals } from "@/components/modal-manager";
import Overlay from "@/components/overlay";
import PostForm from "@/components/post-form";
import RichTextPreview from "@/components/rich-text-preview";
import { useSheets } from "@/components/sheet-manager";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Clock, MoreVertical } from "lucide-react";
import Image from "next/image";
import PostActions from "./post-actions";
import type { Post } from "@/types";

interface PostCardProps {
	post: Post;
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

export default function PostCard({
	post,
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
}: PostCardProps) {
	const { openContentSheet } = useSheets();
	const { openConfirmModal } = useModals();

	return (
		<Overlay isLoading={updatingPostId === post.id}>
			<Card className="overflow-hidden border-muted/60 shadow-sm transition-shadow duration-200 hover:shadow">
				<CardHeader className="pb-2">
					<div className="flex justify-between">
						<div className="flex items-center gap-3">
							<div className="h-10 w-10 overflow-hidden rounded-full shadow-sm ring-2 ring-background">
								<Image
									src={post.owner?.profileImageUrl ?? "/images/placeholder.png"}
									alt={post.owner?.displayName ?? ""}
									className="h-full w-full object-cover"
									width={40}
									height={40}
								/>
							</div>
							<div>
								<h3 className="font-medium text-foreground/90">
									{post.owner?.displayName}
								</h3>
								<div className="flex items-center gap-1 text-muted-foreground text-xs">
									<Clock className="h-3 w-3" />
									<time dateTime={post.createdAt.toISOString()}>
										{new Date(post.createdAt).toLocaleDateString(undefined, {
											year: "numeric",
											month: "short",
											day: "numeric",
										})}
									</time>
								</div>
							</div>
						</div>
						{post.isOwner && (
							<div className="ml-2">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="ghost" size="sm">
											<MoreVertical className="h-4 w-4" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent>
										<DropdownMenuItem
											onClick={() =>
												openContentSheet({
													title: "Edit Post",
													description: "Edit post details",
													children: (
														<div className="p-5">
															<PostForm post={post} />
														</div>
													),
													side: "bottom",
													width: "full",
													height: "full",
												})
											}
										>
											Edit Post
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() =>
												openConfirmModal({
													title: "Delete Post",
													description:
														"Are you sure you want to delete this post? This action cannot be undone.",
													labels: {
														confirm: "Delete",
														cancel: "Cancel",
													},
													confirmProps: { variant: "destructive" },
													onConfirm: () => {
														console.log("Post deleted");
														// Call your API to delete the post
													},
													onCancel: () => {
														console.log("Delete post canceled");
													},
												})
											}
										>
											Delete Post
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
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
					<PostActions
						post={post}
						isUpvoting={isUpvoting}
						isDownvoting={isDownvoting}
						isAddingBookmark={isAddingBookmark}
						isRemovingBookmark={isRemovingBookmark}
						isSignedIn={isSignedIn}
						onUpvote={() => onUpvote(post.id)}
						onDownvote={() => onDownvote(post.id)}
						onBookmarkToggle={() =>
							onBookmarkToggle(post.id, post.isBookmarked ?? false)
						}
					/>
				</CardFooter>
			</Card>
		</Overlay>
	);
}
