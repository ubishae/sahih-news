"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	AlertCircle,
	Bookmark,
	CheckCircle,
	Copy,
	ExternalLink,
	Flag,
	HelpCircle,
	LinkIcon,
	MessageSquare,
	MoreHorizontal,
	Share2,
	ThumbsDown,
	ThumbsUp,
	XCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import RichTextPreview from "./rich-text-preview";

interface User {
	name: string;
	handle: string;
	avatar: string;
	isVerified: boolean;
	credibilityScore: number;
}

interface NewsPostProps {
	user: User;
	content: string;
	timestamp: string;
	credibilityTag: "true" | "false" | "unverified" | "misleading";
	reviewCount: number;
	commentCount: number;
	sources: string[];
	hasMedia?: boolean;
}

export default function NewsPost({
	user,
	content,
	timestamp,
	credibilityTag,
	reviewCount,
	commentCount,
	sources,
	hasMedia = false,
}: NewsPostProps) {
	// State for user interactions
	const [isBookmarked, setIsBookmarked] = useState(false);
	const [userReaction, setUserReaction] = useState<
		"accurate" | "inaccurate" | null
	>(null);
	const [showCommentDialog, setShowCommentDialog] = useState(false);
	const [showReviewDialog, setShowReviewDialog] = useState(false);
	const [showShareDialog, setShowShareDialog] = useState(false);
	const [commentText, setCommentText] = useState("");
	const [reviewReason, setReviewReason] = useState("");
	const [reviewVerdict, setReviewVerdict] = useState<
		"true" | "false" | "misleading" | "unverified"
	>("unverified");

	// Handle user reactions
	const handleReaction = (reaction: "accurate" | "inaccurate") => {
		setUserReaction(userReaction === reaction ? null : reaction);
	};

	// Handle bookmark toggle
	const toggleBookmark = () => {
		setIsBookmarked(!isBookmarked);
	};

	// Handle comment submission
	const submitComment = () => {
		// In a real app, this would send the comment to an API
		console.log("Comment submitted:", commentText);
		setCommentText("");
		setShowCommentDialog(false);
	};

	// Handle review submission
	const submitReview = () => {
		// In a real app, this would send the review to an API
		console.log("Review submitted:", {
			verdict: reviewVerdict,
			reason: reviewReason,
		});
		setReviewReason("");
		setShowReviewDialog(false);
	};

	// Handle share
	const copyToClipboard = () => {
		// In a real app, this would copy the actual URL
		navigator.clipboard.writeText(`https://sahihnews.com/post/123`);
		setShowShareDialog(false);
	};

	const getCredibilityBadge = () => {
		switch (credibilityTag) {
			case "true":
				return (
					<Badge
						variant="outline"
						className="flex items-center gap-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
					>
						<CheckCircle className="h-3 w-3" />
						Verified
					</Badge>
				);
			case "false":
				return (
					<Badge
						variant="outline"
						className="flex items-center gap-1 bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
					>
						<XCircle className="h-3 w-3" />
						False
					</Badge>
				);
			case "unverified":
				return (
					<Badge
						variant="outline"
						className="flex items-center gap-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
					>
						<HelpCircle className="h-3 w-3" />
						Unverified
					</Badge>
				);
			case "misleading":
				return (
					<Badge
						variant="outline"
						className="flex items-center gap-1 bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
					>
						<AlertCircle className="h-3 w-3" />
						Misleading
					</Badge>
				);
		}
	};

	return (
		<Card>
			<CardContent className="p-4">
				<div className="mb-3 flex items-start justify-between">
					<div className="flex items-center gap-2">
						<Avatar>
							<AvatarImage src={user.avatar} alt={user.name} />
							<AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
						</Avatar>
						<div>
							<div className="flex items-center gap-1">
								<span className="font-medium">{user.name}</span>
								{user.isVerified && (
									<CheckCircle className="h-3.5 w-3.5 fill-blue-500 text-blue-500" />
								)}
							</div>
							<div className="flex items-center gap-1 text-muted-foreground text-sm">
								<span>{user.handle}</span>
								<span>•</span>
								<span>{timestamp}</span>
								<span>•</span>
								<span className="rounded-full bg-muted px-1.5 py-0.5 text-xs">
									{user.credibilityScore}
								</span>
							</div>
						</div>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon" className="h-8 w-8">
								<MoreHorizontal className="h-4 w-4" />
								<span className="sr-only">More options</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem
								onClick={toggleBookmark}
								className="cursor-pointer"
							>
								<Bookmark
									className={`mr-2 h-4 w-4 ${isBookmarked ? "fill-current" : ""}`}
								/>
								{isBookmarked ? "Remove bookmark" : "Bookmark"}
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Link href={`/user/${user.handle}`} className="cursor-pointer">
									<Avatar className="mr-2 h-4 w-4">
										<AvatarImage src={user.avatar} alt={user.name} />
										<AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
									</Avatar>
									View profile
								</Link>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<Dialog
								open={showReviewDialog}
								onOpenChange={setShowReviewDialog}
							>
								<DialogTrigger asChild>
									<DropdownMenuItem
										onSelect={(e) => e.preventDefault()}
										className="cursor-pointer"
									>
										<CheckCircle className="mr-2 h-4 w-4" />
										Review credibility
									</DropdownMenuItem>
								</DialogTrigger>
								<DialogContent className="sm:max-w-[425px]">
									<DialogHeader>
										<DialogTitle>Review Credibility</DialogTitle>
										<DialogDescription>
											Help maintain the integrity of SahihNews by reviewing this
											content.
										</DialogDescription>
									</DialogHeader>
									<div className="grid gap-4 py-4">
										<RadioGroup
											value={reviewVerdict}
											onValueChange={(value) => setReviewVerdict(value as any)}
										>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="true" id="true" />
												<Label
													htmlFor="true"
													className="flex items-center gap-1"
												>
													<CheckCircle className="h-4 w-4 text-green-600" />
													True
												</Label>
											</div>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="false" id="false" />
												<Label
													htmlFor="false"
													className="flex items-center gap-1"
												>
													<XCircle className="h-4 w-4 text-red-600" />
													False
												</Label>
											</div>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="misleading" id="misleading" />
												<Label
													htmlFor="misleading"
													className="flex items-center gap-1"
												>
													<AlertCircle className="h-4 w-4 text-orange-600" />
													Misleading
												</Label>
											</div>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="unverified" id="unverified" />
												<Label
													htmlFor="unverified"
													className="flex items-center gap-1"
												>
													<HelpCircle className="h-4 w-4 text-yellow-600" />
													Unverified
												</Label>
											</div>
										</RadioGroup>
										<div className="grid gap-2">
											<Label htmlFor="reason">Reason for your review</Label>
											<Textarea
												id="reason"
												placeholder="Provide evidence or reasoning for your review..."
												value={reviewReason}
												onChange={(e) => setReviewReason(e.target.value)}
											/>
										</div>
									</div>
									<DialogFooter>
										<Button
											variant="outline"
											onClick={() => setShowReviewDialog(false)}
										>
											Cancel
										</Button>
										<Button onClick={submitReview}>Submit Review</Button>
									</DialogFooter>
								</DialogContent>
							</Dialog>
							<DropdownMenuItem className="cursor-pointer text-red-600">
								<Flag className="mr-2 h-4 w-4" />
								Report
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				<div className="mb-3">
					<div className="mb-2">
						<RichTextPreview content={content} />
					</div>
					{hasMedia && (
						<div className="mt-3 overflow-hidden rounded-lg">
							<Image
								src="/placeholder.svg?height=300&width=500"
								alt="News media"
								width={500}
								height={300}
								className="w-full object-cover"
							/>
						</div>
					)}
					{sources.length > 0 && (
						<div className="mt-2">
							{sources.map((source, index) => (
								<Link
									key={index}
									href={source}
									className="flex items-center gap-1 text-blue-600 text-sm hover:underline dark:text-blue-400"
								>
									<LinkIcon className="h-3 w-3" />
									Source {index + 1}
								</Link>
							))}
						</div>
					)}
				</div>

				<div className="flex items-center justify-between">
					<div className="flex items-center gap-1">
						{getCredibilityBadge()}
						<span className="ml-1 text-muted-foreground text-xs">
							{reviewCount} reviews
						</span>
					</div>
				</div>
			</CardContent>

			<CardFooter className="flex justify-between border-t px-4 py-2">
				<div className="flex items-center gap-1">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant="ghost"
									size="sm"
									className={`h-8 px-2 ${userReaction === "accurate" ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" : ""}`}
									onClick={() => handleReaction("accurate")}
								>
									<ThumbsUp className="mr-1 h-4 w-4" />
									Accurate
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
									className={`h-8 px-2 ${userReaction === "inaccurate" ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400" : ""}`}
									onClick={() => handleReaction("inaccurate")}
								>
									<ThumbsDown className="mr-1 h-4 w-4" />
									Inaccurate
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Mark as inaccurate</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
				<div className="flex items-center gap-1">
					<Dialog open={showCommentDialog} onOpenChange={setShowCommentDialog}>
						<DialogTrigger asChild>
							<Button variant="ghost" size="sm" className="h-8 px-2">
								<MessageSquare className="mr-1 h-4 w-4" />
								{commentCount}
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>Add Comment</DialogTitle>
								<DialogDescription>
									Share your thoughts on this news item.
								</DialogDescription>
							</DialogHeader>
							<div className="grid gap-4 py-4">
								<Textarea
									placeholder="Write your comment..."
									value={commentText}
									onChange={(e) => setCommentText(e.target.value)}
									className="min-h-[100px]"
								/>
							</div>
							<DialogFooter>
								<Button
									variant="outline"
									onClick={() => setShowCommentDialog(false)}
								>
									Cancel
								</Button>
								<Button onClick={submitComment} disabled={!commentText.trim()}>
									Post Comment
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>

					<Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
						<DialogTrigger asChild>
							<Button variant="ghost" size="sm" className="h-8 px-2">
								<Share2 className="h-4 w-4" />
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>Share News</DialogTitle>
								<DialogDescription>
									Share this news item with others.
								</DialogDescription>
							</DialogHeader>
							<div className="grid gap-4 py-4">
								<div className="flex items-center justify-between rounded-md border p-2">
									<span className="truncate text-sm">
										https://sahihnews.com/post/123
									</span>
									<Button variant="ghost" size="sm" onClick={copyToClipboard}>
										<Copy className="h-4 w-4" />
									</Button>
								</div>
								<div className="grid grid-cols-4 gap-2">
									<Button
										variant="outline"
										className="flex h-auto flex-col items-center py-2"
									>
										<svg
											className="h-5 w-5 text-blue-500"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
										</svg>
										<span className="mt-1 text-xs">Twitter</span>
									</Button>
									<Button
										variant="outline"
										className="flex h-auto flex-col items-center py-2"
									>
										<svg
											className="h-5 w-5 text-blue-600"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
										</svg>
										<span className="mt-1 text-xs">Facebook</span>
									</Button>
									<Button
										variant="outline"
										className="flex h-auto flex-col items-center py-2"
									>
										<svg
											className="h-5 w-5 text-blue-500"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
										</svg>
										<span className="mt-1 text-xs">LinkedIn</span>
									</Button>
									<Button
										variant="outline"
										className="flex h-auto flex-col items-center py-2"
									>
										<svg
											className="h-5 w-5 text-green-500"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"></path>
										</svg>
										<span className="mt-1 text-xs">WhatsApp</span>
									</Button>
								</div>
								<Button
									variant="outline"
									className="flex w-full items-center justify-center gap-2"
								>
									<ExternalLink className="h-4 w-4" />
									Open in new tab
								</Button>
							</div>
						</DialogContent>
					</Dialog>

					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant="ghost"
									size="sm"
									className={`h-8 px-2 ${isBookmarked ? "text-blue-600 dark:text-blue-400" : ""}`}
									onClick={toggleBookmark}
								>
									<Bookmark
										className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`}
									/>
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>{isBookmarked ? "Remove bookmark" : "Bookmark"}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</CardFooter>
		</Card>
	);
}
