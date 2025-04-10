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
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { Bookmark, Loader2, Search } from "lucide-react";
import { useState } from "react";

// Define types for filter and sort options
type FilterOption = "all" | "true" | "false" | "unverified" | "misleading";
type SortOption = "recent" | "oldest" | "credibility";

interface UserBookmarksProps {
	username: string;
}

export default function UserBookmarks({ username }: UserBookmarksProps) {
	const [filter, setFilter] = useState<FilterOption>("all");
	const [searchQuery, setSearchQuery] = useState("");
	const [sortBy, setSortBy] = useState<SortOption>("recent");
	const [cursor, setCursor] = useState<number | undefined>(undefined);
	
	// Fetch bookmarks from API
	const { data, isLoading, isFetching, fetchNextPage, hasNextPage } = 
		api.bookmarks.getBookmarks.useInfiniteQuery(
			{
				limit: 10,
				collection: "all",
				sortBy,
			},
			{
				getNextPageParam: (lastPage) => lastPage.nextCursor,
			}
		);

	// Flatten the pages of bookmarks
	const bookmarks = data?.pages.flatMap((page) => page.items) || [];
	
	// Filter bookmarks based on credibility status and search query
	const filteredBookmarks = bookmarks
		.filter((bookmark) => {
			if (filter === "all") return true;
			return bookmark.consensusTag === filter;
		})
		.filter((bookmark) => {
			if (!searchQuery) return true;
			return bookmark.content.toLowerCase().includes(searchQuery.toLowerCase());
		});

	// Handle load more
	const handleLoadMore = () => {
		if (hasNextPage && !isFetching) {
			void fetchNextPage();
		}
	};

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
				<Select value={filter} onValueChange={(value: FilterOption) => setFilter(value)}>
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
				<Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Sort by" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="recent">Most Recent</SelectItem>
						<SelectItem value="oldest">Oldest First</SelectItem>
						<SelectItem value="credibility">Credibility</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{isLoading ? (
				<div className="py-12 text-center text-muted-foreground">
					<div className="mb-4 flex justify-center">
						<Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
					</div>
					<p>Loading bookmarks...</p>
				</div>
			) : filteredBookmarks.length > 0 ? (
				<>
					<div className="space-y-4">
						{filteredBookmarks.map((bookmark) => (
							<NewsPost
								id={bookmark.postId}
								key={bookmark.id}
								user={bookmark.user}
								content={bookmark.content}
								timestamp={`Saved ${new Date(bookmark.bookmarkedAt).toLocaleDateString()}`}
								credibilityTag={bookmark.consensusTag}
								reviewCount={bookmark.reviewCount}
								commentCount={bookmark.commentCount}
								sources={bookmark.sources}
								hasMedia={bookmark.hasMedia}
							/>
						))}
					</div>
					
					{hasNextPage && (
						<div className="mt-6 flex justify-center">
							<Button 
								variant="outline" 
								onClick={handleLoadMore}
								disabled={isFetching}
							>
								{isFetching ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Loading...
									</>
								) : (
									"Load More"
								)}
							</Button>
						</div>
					)}
				</>
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
