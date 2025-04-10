"use client";

import NewsPost from "@/components/news-post";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";

interface UserPostsProps {
	username: string;
}

export default function UserPosts({ username }: UserPostsProps) {
	const [filter, setFilter] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");

	// Mock posts data - in a real app, this would come from an API
	const posts = [
		{
			id: 1,
			user: {
				name: "Alex Johnson",
				handle: "@alexj",
				avatar: "/placeholder.svg?height=40&width=40",
				isVerified: true,
				credibilityScore: 85,
			},
			content:
				"New study reveals significant progress in renewable energy adoption across major economies. Solar capacity increased by 25% in the last year alone.",
			timestamp: "2 days ago",
			credibilityTag: "true",
			reviewCount: 124,
			commentCount: 37,
			sources: ["https://example.com/renewable-energy-study"],
		},
		{
			id: 2,
			user: {
				name: "Alex Johnson",
				handle: "@alexj",
				avatar: "/placeholder.svg?height=40&width=40",
				isVerified: true,
				credibilityScore: 85,
			},
			content:
				"Tech conference highlights breakthrough in quantum computing. Researchers demonstrate new algorithm that could revolutionize cryptography and drug discovery.",
			timestamp: "1 week ago",
			credibilityTag: "unverified",
			reviewCount: 56,
			commentCount: 23,
			sources: ["https://example.com/quantum-computing-breakthrough"],
			hasMedia: true,
		},
		{
			id: 3,
			user: {
				name: "Alex Johnson",
				handle: "@alexj",
				avatar: "/placeholder.svg?height=40&width=40",
				isVerified: true,
				credibilityScore: 85,
			},
			content:
				"Global health initiative launches to address antibiotic resistance. Coalition of 50+ countries commits to reducing unnecessary antibiotic use and funding new drug development.",
			timestamp: "2 weeks ago",
			credibilityTag: "true",
			reviewCount: 98,
			commentCount: 42,
			sources: ["https://example.com/antibiotic-resistance-initiative"],
		},
	];

	// Filter posts based on credibility status
	const filteredPosts = posts
		.filter((post) => {
			if (filter === "all") return true;
			return post.credibilityTag === filter;
		})
		.filter((post) => {
			if (!searchQuery) return true;
			return post.content.toLowerCase().includes(searchQuery.toLowerCase());
		});

	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-4 sm:flex-row">
				<div className="relative flex-1">
					<Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="Search posts..."
						className="pl-10"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
				<Select value={filter} onValueChange={setFilter}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Filter by status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Posts</SelectItem>
						<SelectItem value="true">Verified</SelectItem>
						<SelectItem value="unverified">Unverified</SelectItem>
						<SelectItem value="misleading">Misleading</SelectItem>
						<SelectItem value="false">False</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{filteredPosts.length > 0 ? (
				<div className="space-y-4">
					{filteredPosts.map((post) => (
						<NewsPost
							id={post.id}
							key={post.id}
							user={post.user}
							content={post.content}
							timestamp={post.timestamp}
							credibilityTag={post.credibilityTag}
							reviewCount={post.reviewCount}
							commentCount={post.commentCount}
							sources={post.sources}
							hasMedia={post.hasMedia}
						/>
					))}
				</div>
			) : (
				<div className="py-12 text-center text-muted-foreground">
					<p className="mb-2">No posts found</p>
					<p className="text-sm">Try changing your search or filter criteria</p>
				</div>
			)}
		</div>
	);
}
