"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import {
	CheckCircle,
	MessageSquare,
	MoreHorizontal,
	ThumbsDown,
	ThumbsUp,
} from "lucide-react";
import { useState } from "react";

interface Comment {
	id: string;
	user: {
		name: string;
		handle: string;
		avatar: string;
		isVerified: boolean;
		credibilityScore: number;
	};
	content: string;
	timestamp: string;
	likes: number;
	dislikes: number;
	replies?: Comment[];
}

interface CommentSectionProps {
	newsId: string;
}

export default function CommentSection({ newsId }: CommentSectionProps) {
	// Sample comments data - in a real app, this would come from an API
	const [comments, setComments] = useState<Comment[]>([
		{
			id: "1",
			user: {
				name: "Sarah Johnson",
				handle: "@sarahjournalist",
				avatar: "/placeholder.svg?height=40&width=40",
				isVerified: true,
				credibilityScore: 92,
			},
			content:
				"This is a significant development. The 50% reduction target is ambitious but necessary given the latest IPCC reports. I'm particularly interested in how the $100 billion fund will be distributed.",
			timestamp: "1 hour ago",
			likes: 24,
			dislikes: 2,
			replies: [
				{
					id: "1-1",
					user: {
						name: "Climate Scientist",
						handle: "@climatescientist",
						avatar: "/placeholder.svg?height=40&width=40",
						isVerified: true,
						credibilityScore: 95,
					},
					content:
						"You're right about the ambition. The latest models suggest we need at least 45% reduction by 2035 to stay under 1.5°C warming, so this target is aligned with the science.",
					timestamp: "45 minutes ago",
					likes: 18,
					dislikes: 0,
				},
			],
		},
		{
			id: "2",
			user: {
				name: "Policy Analyst",
				handle: "@policyanalyst",
				avatar: "/placeholder.svg?height=40&width=40",
				isVerified: false,
				credibilityScore: 87,
			},
			content:
				"The implementation timeline seems optimistic. Many countries have struggled to meet previous climate commitments. I'd like to see more details about the enforcement mechanisms.",
			timestamp: "1.5 hours ago",
			likes: 15,
			dislikes: 3,
		},
		{
			id: "3",
			user: {
				name: "Energy Expert",
				handle: "@energyexpert",
				avatar: "/placeholder.svg?height=40&width=40",
				isVerified: true,
				credibilityScore: 90,
			},
			content:
				"Phasing out coal by 2030 in developed nations is a critical component. This will require massive investment in renewable infrastructure and grid modernization.",
			timestamp: "2 hours ago",
			likes: 32,
			dislikes: 1,
			replies: [
				{
					id: "3-1",
					user: {
						name: "Economic Insights",
						handle: "@econinsights",
						avatar: "/placeholder.svg?height=40&width=40",
						isVerified: false,
						credibilityScore: 82,
					},
					content:
						"The economic transition will be challenging but ultimately beneficial. Studies show that renewable energy now creates more jobs per dollar invested than fossil fuels.",
					timestamp: "1 hour ago",
					likes: 12,
					dislikes: 2,
				},
			],
		},
	]);

	const [newComment, setNewComment] = useState("");
	const [replyingTo, setReplyingTo] = useState<string | null>(null);
	const [replyContent, setReplyContent] = useState("");

	const handleCommentSubmit = () => {
		if (!newComment.trim()) return;

		// In a real app, this would send the comment to an API
		const newCommentObj: Comment = {
			id: `new-${Date.now()}`,
			user: {
				name: "Current User",
				handle: "@currentuser",
				avatar: "/placeholder.svg?height=40&width=40",
				isVerified: false,
				credibilityScore: 85,
			},
			content: newComment,
			timestamp: "Just now",
			likes: 0,
			dislikes: 0,
		};

		setComments([newCommentObj, ...comments]);
		setNewComment("");
	};

	const handleReplySubmit = (commentId: string) => {
		if (!replyContent.trim()) return;

		// In a real app, this would send the reply to an API
		const newReply: Comment = {
			id: `reply-${Date.now()}`,
			user: {
				name: "Current User",
				handle: "@currentuser",
				avatar: "/placeholder.svg?height=40&width=40",
				isVerified: false,
				credibilityScore: 85,
			},
			content: replyContent,
			timestamp: "Just now",
			likes: 0,
			dislikes: 0,
		};

		const updatedComments = comments.map((comment) => {
			if (comment.id === commentId) {
				return {
					...comment,
					replies: [...(comment.replies || []), newReply],
				};
			}
			return comment;
		});

		setComments(updatedComments);
		setReplyContent("");
		setReplyingTo(null);
	};

	const renderComment = (comment: Comment, isReply = false) => (
		<div
			key={comment.id}
			className={`${isReply ? "mt-4 ml-12" : "mb-6 border-b pb-6 last:border-0"}`}
		>
			<div className="flex gap-3">
				<Avatar>
					<AvatarImage src={comment.user.avatar} alt={comment.user.name} />
					<AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
				</Avatar>
				<div className="flex-1">
					<div className="mb-1 flex items-center gap-1">
						<span className="font-medium">{comment.user.name}</span>
						{comment.user.isVerified && (
							<CheckCircle className="h-3.5 w-3.5 fill-blue-500 text-blue-500" />
						)}
						<span className="ml-1 text-muted-foreground text-xs">
							{comment.user.handle}
						</span>
						<span className="mx-1 text-muted-foreground text-xs">•</span>
						<span className="text-muted-foreground text-xs">
							{comment.timestamp}
						</span>
						<span className="ml-1 rounded-full bg-muted px-1.5 py-0.5 text-xs">
							{comment.user.credibilityScore}
						</span>
					</div>
					<p className="mb-2">{comment.content}</p>
					<div className="flex items-center gap-4">
						<div className="flex items-center gap-1">
							<Button variant="ghost" size="icon" className="h-8 w-8">
								<ThumbsUp className="h-4 w-4" />
							</Button>
							<span className="text-xs">{comment.likes}</span>
						</div>
						<div className="flex items-center gap-1">
							<Button variant="ghost" size="icon" className="h-8 w-8">
								<ThumbsDown className="h-4 w-4" />
							</Button>
							<span className="text-xs">{comment.dislikes}</span>
						</div>
						{!isReply && (
							<Button
								variant="ghost"
								size="sm"
								className="h-8 text-xs"
								onClick={() =>
									setReplyingTo(replyingTo === comment.id ? null : comment.id)
								}
							>
								<MessageSquare className="mr-1 h-4 w-4" />
								Reply
							</Button>
						)}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon" className="ml-auto h-8 w-8">
									<MoreHorizontal className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem>Report</DropdownMenuItem>
								<DropdownMenuItem>Copy link</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>

					{replyingTo === comment.id && (
						<div className="mt-4">
							<Textarea
								placeholder="Write a reply..."
								value={replyContent}
								onChange={(e) => setReplyContent(e.target.value)}
								className="min-h-[100px]"
							/>
							<div className="mt-2 flex justify-end">
								<Button
									size="sm"
									onClick={() => handleReplySubmit(comment.id)}
									disabled={!replyContent.trim()}
								>
									Reply
								</Button>
							</div>
						</div>
					)}

					{comment.replies && comment.replies.length > 0 && (
						<div className="mt-4 space-y-4">
							{comment.replies.map((reply) => renderComment(reply, true))}
						</div>
					)}
				</div>
			</div>
		</div>
	);

	return (
		<div className="space-y-6">
			<div className="mb-6">
				<Textarea
					placeholder="Add a comment..."
					value={newComment}
					onChange={(e) => setNewComment(e.target.value)}
					className="min-h-[100px]"
				/>
				<div className="mt-2 flex items-center justify-between">
					<p className="text-muted-foreground text-xs">
						Be respectful and factual in your comments.
					</p>
					<Button onClick={handleCommentSubmit} disabled={!newComment.trim()}>
						Post Comment
					</Button>
				</div>
			</div>

			<div className="space-y-6">
				{comments.map((comment) => renderComment(comment))}
			</div>
		</div>
	);
}
