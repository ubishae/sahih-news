"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	ArrowUpRight,
	Calendar,
	MessageSquare,
	Search,
	ThumbsUp,
} from "lucide-react";
import { useState } from "react";

interface UserCommentsProps {
	username: string;
}

export default function UserComments({ username }: UserCommentsProps) {
	const [filter, setFilter] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");

	// Mock comments data - in a real app, this would come from an API
	const comments = [
		{
			id: "1",
			postTitle:
				"International summit on climate change reaches historic agreement",
			postAuthor: "@globalaffairs",
			comment:
				"This is a significant development. The 50% reduction target is ambitious but necessary given the latest IPCC reports. I'm particularly interested in how the $100 billion fund will be distributed.",
			timestamp: "2 days ago",
			likes: 24,
			replies: 3,
		},
		{
			id: "2",
			postTitle: "New breakthrough in renewable energy storage announced",
			postAuthor: "@sciencetoday",
			comment:
				"The efficiency improvements are impressive, but I'd like to see more data on the longevity of these storage solutions. Previous iterations had significant degradation issues after 500-1000 cycles.",
			timestamp: "1 week ago",
			likes: 18,
			replies: 2,
		},
		{
			id: "3",
			postTitle: "Tech company unveils revolutionary AI assistant",
			postAuthor: "@techobserver",
			comment:
				"Having tested this assistant, I can confirm it's a significant improvement over previous generations. The contextual understanding is particularly impressive, though there are still limitations when handling complex, multi-step tasks.",
			timestamp: "2 weeks ago",
			likes: 32,
			replies: 5,
		},
	];

	// Filter comments based on search query
	const filteredComments = comments.filter((comment) => {
		if (!searchQuery) return true;
		return (
			comment.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
			comment.postTitle.toLowerCase().includes(searchQuery.toLowerCase())
		);
	});

	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-4 sm:flex-row">
				<div className="relative flex-1">
					<Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="Search comments..."
						className="pl-10"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
				<Select value={filter} onValueChange={setFilter}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Sort by" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">Most Recent</SelectItem>
						<SelectItem value="likes">Most Liked</SelectItem>
						<SelectItem value="replies">Most Replies</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{filteredComments.length > 0 ? (
				<div className="space-y-4">
					{filteredComments.map((comment) => (
						<Card key={comment.id}>
							<CardContent className="p-4">
								<div className="mb-2 flex items-center justify-between">
									<div className="cursor-pointer font-medium text-sm hover:underline">
										{comment.postTitle}
									</div>
									<div className="text-muted-foreground text-xs">
										{comment.postAuthor}
									</div>
								</div>

								<div className="mt-3 flex gap-3">
									<Avatar className="h-8 w-8">
										<AvatarImage
											src="/placeholder.svg?height=32&width=32"
											alt="Alex Johnson"
										/>
										<AvatarFallback>AJ</AvatarFallback>
									</Avatar>
									<div className="flex-1">
										<p className="text-sm">{comment.comment}</p>

										<div className="mt-2 flex items-center gap-4">
											<div className="flex items-center gap-1 text-muted-foreground text-xs">
												<Calendar className="h-3 w-3" />
												<span>{comment.timestamp}</span>
											</div>
											<div className="flex items-center gap-1 text-muted-foreground text-xs">
												<ThumbsUp className="h-3 w-3" />
												<span>{comment.likes} likes</span>
											</div>
											<div className="flex items-center gap-1 text-muted-foreground text-xs">
												<MessageSquare className="h-3 w-3" />
												<span>{comment.replies} replies</span>
											</div>
											<Button
												variant="ghost"
												size="sm"
												className="ml-auto h-6 px-2"
											>
												<ArrowUpRight className="mr-1 h-3 w-3" />
												<span className="text-xs">View</span>
											</Button>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			) : (
				<div className="py-12 text-center text-muted-foreground">
					<p className="mb-2">No comments found</p>
					<p className="text-sm">Try changing your search criteria</p>
				</div>
			)}
		</div>
	);
}
