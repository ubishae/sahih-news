import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Bookmark, ThumbsDown, ThumbsUp } from "lucide-react";
import type { Post } from "@/types";

interface PostActionsProps {
	post: Post;
	isUpvoting: boolean;
	isDownvoting: boolean;
	isAddingBookmark: boolean;
	isRemovingBookmark: boolean;
	isSignedIn: boolean;
	onUpvote: () => void;
	onDownvote: () => void;
	onBookmarkToggle: () => void;
}

export default function PostActions({
	post,
	isUpvoting,
	isDownvoting,
	isAddingBookmark,
	isRemovingBookmark,
	isSignedIn,
	onUpvote,
	onDownvote,
	onBookmarkToggle,
}: PostActionsProps) {
	// Ensure we have default values for optional properties
	const upvoteCount = post.upvoteCount ?? 0;
	const downvoteCount = post.downvoteCount ?? 0;
	const isBookmarked = post.isBookmarked ?? false;

	return (
		<>
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
									onClick={onUpvote}
								>
									<ThumbsUp className="mr-1 h-4 w-4" />
									<span className="font-medium">{upvoteCount}</span>
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
									onClick={onDownvote}
								>
									<ThumbsDown className="mr-1 h-4 w-4" />
									<span className="font-medium">{downvoteCount}</span>
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Mark as inaccurate</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>

				<div className="text-muted-foreground text-xs">
					{upvoteCount > downvoteCount ? (
						<span className="text-green-600 dark:text-green-400">
							Mostly accurate
						</span>
					) : downvoteCount > upvoteCount ? (
						<span className="text-red-600 dark:text-red-400">
							Mostly inaccurate
						</span>
					) : upvoteCount > 0 || downvoteCount > 0 ? (
						<span>Mixed accuracy</span>
					) : null}
				</div>
			</div>

			{/* Bookmark button */}
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant={isBookmarked ? "secondary" : "ghost"}
							size="sm"
							className="gap-2"
							disabled={isAddingBookmark || isRemovingBookmark || !isSignedIn}
							onClick={onBookmarkToggle}
						>
							<Bookmark
								className={cn("h-4 w-4", {
									"fill-current text-primary": isBookmarked,
								})}
							/>
							<span className="text-xs">{isBookmarked ? "Saved" : "Save"}</span>
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>{isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</>
	);
}
