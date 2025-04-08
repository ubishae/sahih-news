"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
	AlertCircle,
	ArrowUpRight,
	Calendar,
	CheckCircle,
	Search,
	ThumbsDown,
	ThumbsUp,
	XCircle,
} from "lucide-react";
import { useState } from "react";

interface UserReviewsProps {
	username: string;
}

export default function UserReviews({ username }: UserReviewsProps) {
	const [filter, setFilter] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");

	// Mock reviews data - in a real app, this would come from an API
	const reviews = [
		{
			id: "1",
			postTitle: "New breakthrough in renewable energy storage announced",
			postAuthor: "@sciencetoday",
			verdict: "accurate",
			reason:
				"The claims in this post are supported by the published research paper in Nature Energy. The efficiency figures are accurately reported and the limitations are appropriately acknowledged.",
			timestamp: "3 days ago",
			accuracy: true,
		},
		{
			id: "2",
			postTitle: "Study claims artificial sweeteners linked to health issues",
			postAuthor: "@healthnews",
			verdict: "misleading",
			reason:
				"While the post cites a real study, it overstates the conclusions. The study found correlation, not causation, and was limited to a specific population. The headline implies broader implications than the research supports.",
			timestamp: "1 week ago",
			accuracy: false,
		},
		{
			id: "3",
			postTitle: "Government announces new climate policy framework",
			postAuthor: "@policywatch",
			verdict: "accurate",
			reason:
				"The post accurately summarizes the key points from the official government announcement. All quoted figures match the official documentation and the context is appropriately presented.",
			timestamp: "2 weeks ago",
			accuracy: true,
		},
	];

	// Filter reviews based on verdict and search query
	const filteredReviews = reviews.filter((review) => {
		if (filter !== "all" && review.verdict !== filter) return false;
		if (!searchQuery) return true;
		return (
			review.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
			review.postTitle.toLowerCase().includes(searchQuery.toLowerCase())
		);
	});

	// Get verdict badge
	const getVerdictBadge = (verdict: string) => {
		switch (verdict) {
			case "accurate":
				return (
					<Badge
						variant="outline"
						className="flex items-center gap-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
					>
						<CheckCircle className="h-3 w-3" />
						Accurate
					</Badge>
				);
			case "inaccurate":
				return (
					<Badge
						variant="outline"
						className="flex items-center gap-1 bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
					>
						<XCircle className="h-3 w-3" />
						Inaccurate
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
			default:
				return null;
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-4 sm:flex-row">
				<div className="relative flex-1">
					<Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="Search reviews..."
						className="pl-10"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
				<Select value={filter} onValueChange={setFilter}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Filter by verdict" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Reviews</SelectItem>
						<SelectItem value="accurate">Accurate</SelectItem>
						<SelectItem value="misleading">Misleading</SelectItem>
						<SelectItem value="inaccurate">Inaccurate</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{filteredReviews.length > 0 ? (
				<div className="space-y-4">
					{filteredReviews.map((review) => (
						<Card key={review.id}>
							<CardContent className="p-4">
								<div className="mb-2 flex items-center justify-between">
									<div className="cursor-pointer font-medium text-sm hover:underline">
										{review.postTitle}
									</div>
									<div className="text-muted-foreground text-xs">
										{review.postAuthor}
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
										<div className="mb-2 flex items-center gap-2">
											<span className="font-medium text-sm">Verdict:</span>
											{getVerdictBadge(review.verdict)}
										</div>

										<p className="text-sm">{review.reason}</p>

										<div className="mt-2 flex items-center gap-4">
											<div className="flex items-center gap-1 text-muted-foreground text-xs">
												<Calendar className="h-3 w-3" />
												<span>{review.timestamp}</span>
											</div>
											<div className="flex items-center gap-1 text-muted-foreground text-xs">
												{review.accuracy ? (
													<>
														<ThumbsUp className="h-3 w-3 text-green-600" />
														<span>Accurate review</span>
													</>
												) : (
													<>
														<ThumbsDown className="h-3 w-3 text-red-600" />
														<span>Disputed review</span>
													</>
												)}
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
					<p className="mb-2">No reviews found</p>
					<p className="text-sm">Try changing your search or filter criteria</p>
				</div>
			)}
		</div>
	);
}
