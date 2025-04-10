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
import { Bookmark, Search } from "lucide-react";
import { useState } from "react";

interface UserBookmarksProps {
	username: string;
}

export default function UserBookmarks({ username }: UserBookmarksProps) {
	const [filter, setFilter] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");

	// Mock bookmarks data - in a real app, this would come from an API
	const bookmarks = [
		{
			id: 1,
			user: {
				name: "Global Affairs",
				handle: "@globalaffairs",
				avatar: "/placeholder.svg?height=40&width=40",
				isVerified: true,
				credibilityScore: 94,
			},
			content:
				"BREAKING: International summit on climate change reaches historic agreement. All major economies commit to 50% emissions reduction by 2035.",
			timestamp: "Saved 2 days ago",
			credibilityTag: "true",
			reviewCount: 342,
			commentCount: 128,
			sources: ["https://example.com/climate-summit"],
			hasMedia: true,
		},
		{
			id: 2,
			user: {
				name: "Science Today",
				handle: "@sciencetoday",
				avatar: "/placeholder.svg?height=40&width=40",
				isVerified: true,
				credibilityScore: 91,
			},
			content:
				"Scientists discover potential breakthrough in renewable energy storage. New material could store solar energy for months without degradation.",
			timestamp: "Saved 1 week ago",
			credibilityTag: "unverified",
			reviewCount: 187,
			commentCount: 76,
			sources: ["https://example.com/energy-breakthrough"],
		},
		{
			id: 3,
			user: {
				name: "Health Insights",
				handle: "@healthinsights",
				avatar: "/placeholder.svg?height=40&width=40",
				isVerified: false,
				credibilityScore: 72,
			},
			content:
				"New diet claims to reverse aging process and extend lifespan by up to 20 years. Experts remain skeptical about extraordinary claims.",
			timestamp: "Saved 2 weeks ago",
			credibilityTag: "misleading",
			reviewCount: 231,
			commentCount: 98,
			sources: ["https://example.com/diet-claims"],
		},
	];

	// Filter bookmarks based on credibility status
	const filteredBookmarks = bookmarks
		.filter((bookmark) => {
			if (filter === "all") return true;
			return bookmark.credibilityTag === filter;
		})
		.filter((bookmark) => {
			if (!searchQuery) return true;
			return bookmark.content.toLowerCase().includes(searchQuery.toLowerCase());
		});

	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-4 sm:flex-row">
				<div className="relative flex-1">
					<Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="Search bookmarks..."
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
						<SelectItem value="all">All Bookmarks</SelectItem>
						<SelectItem value="true">Verified</SelectItem>
						<SelectItem value="unverified">Unverified</SelectItem>
						<SelectItem value="misleading">Misleading</SelectItem>
						<SelectItem value="false">False</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{filteredBookmarks.length > 0 ? (
				<div className="space-y-4">
					{filteredBookmarks.map((bookmark) => (
						<NewsPost
							id={bookmark.id}
							key={bookmark.id}
							user={bookmark.user}
							content={bookmark.content}
							timestamp={bookmark.timestamp}
							credibilityTag={bookmark.credibilityTag}
							reviewCount={bookmark.reviewCount}
							commentCount={bookmark.commentCount}
							sources={bookmark.sources}
							hasMedia={bookmark.hasMedia}
						/>
					))}
				</div>
			) : (
				<div className="py-12 text-center text-muted-foreground">
					<div className="mb-4 flex justify-center">
						<Bookmark className="h-12 w-12 text-muted-foreground" />
					</div>
					<p className="mb-2">No bookmarks found</p>
					<p className="text-sm">Try changing your search or filter criteria</p>
				</div>
			)}
		</div>
	);
}
