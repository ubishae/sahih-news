"use client";

import FeedFilters, { type FilterOptions } from "@/components/feed-filters";
import FloatingActionButton from "@/components/floating-action-button";
import Header from "@/components/header";
import NewsPost from "@/components/news-post";
import QuickPost from "@/components/quick-post";
import TrendingTopics from "@/components/trending-topics";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/trpc/react";
import {
	AlertCircle,
	Calendar,
	CheckCircle,
	HelpCircle,
	Loader2,
	Search,
	X,
	XCircle,
} from "lucide-react";
import { useState } from "react";

export default function Home() {
	const [searchQuery, setSearchQuery] = useState("");
	const [activeFilters, setActiveFilters] = useState<FilterOptions>({
		categories: [],
		credibility: [],
		timeRange: "all",
		followedOnly: false,
	});

	// Fetch posts from the database
	const { data: postsData, isLoading } = api.posts.getAll.useQuery({
		limit: 10,
		filterByCredibility:
			activeFilters.credibility.length > 0
				? activeFilters.credibility
				: undefined,
		timeRange: activeFilters.timeRange,
		searchQuery: searchQuery || undefined,
	});

	const handleSearch = (query: string) => {
		setSearchQuery(query);
	};

	const handleFilter = (filters: FilterOptions) => {
		setActiveFilters(filters);
	};

	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main className="container mx-auto max-w-4xl px-4 py-6">
				<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
					{/* Main content area */}
					<div className="space-y-6 md:col-span-2">
						{/* Feed tabs */}
						<Tabs defaultValue="latest" className="w-full">
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<TabsList>
										<TabsTrigger value="latest">Latest</TabsTrigger>
										<TabsTrigger value="algorithmic">For You</TabsTrigger>
									</TabsList>
								</div>

								<FeedFilters onSearch={handleSearch} onFilter={handleFilter} />

								{/* Active filters */}
								{(activeFilters.categories.length > 0 ||
									activeFilters.credibility.length > 0 ||
									activeFilters.timeRange !== "all" ||
									activeFilters.followedOnly ||
									searchQuery) && (
									<div className="flex flex-wrap items-center gap-2 text-sm">
										<span className="text-muted-foreground">
											Active filters:
										</span>

										{searchQuery && (
											<Badge
												variant="secondary"
												className="flex items-center gap-1"
											>
												<Search className="h-3 w-3" />
												{searchQuery}
												<Button
													variant="ghost"
													size="icon"
													className="ml-1 h-4 w-4 p-0"
													onClick={() => setSearchQuery("")}
												>
													<X className="h-3 w-3" />
												</Button>
											</Badge>
										)}

										{activeFilters.categories.map((category) => (
											<Badge
												key={category}
												variant="secondary"
												className="flex items-center gap-1"
											>
												{category}
												<Button
													variant="ghost"
													size="icon"
													className="ml-1 h-4 w-4 p-0"
													onClick={() => {
														setActiveFilters({
															...activeFilters,
															categories: activeFilters.categories.filter(
																(c) => c !== category,
															),
														});
													}}
												>
													<X className="h-3 w-3" />
												</Button>
											</Badge>
										))}

										{activeFilters.credibility.map((status) => (
											<Badge
												key={status}
												variant="secondary"
												className="flex items-center gap-1"
											>
												{status === "true" && (
													<CheckCircle className="h-3 w-3 text-green-600" />
												)}
												{status === "unverified" && (
													<HelpCircle className="h-3 w-3 text-yellow-600" />
												)}
												{status === "misleading" && (
													<AlertCircle className="h-3 w-3 text-orange-600" />
												)}
												{status === "false" && (
													<XCircle className="h-3 w-3 text-red-600" />
												)}
												{status.charAt(0).toUpperCase() + status.slice(1)}
												<Button
													variant="ghost"
													size="icon"
													className="ml-1 h-4 w-4 p-0"
													onClick={() => {
														setActiveFilters({
															...activeFilters,
															credibility: activeFilters.credibility.filter(
																(s) => s !== status,
															),
														});
													}}
												>
													<X className="h-3 w-3" />
												</Button>
											</Badge>
										))}

										{activeFilters.timeRange !== "all" && (
											<Badge
												variant="secondary"
												className="flex items-center gap-1"
											>
												<Calendar className="h-3 w-3" />
												{activeFilters.timeRange === "today"
													? "Today"
													: activeFilters.timeRange === "week"
														? "This Week"
														: activeFilters.timeRange === "month"
															? "This Month"
															: "This Year"}
												<Button
													variant="ghost"
													size="icon"
													className="ml-1 h-4 w-4 p-0"
													onClick={() => {
														setActiveFilters({
															...activeFilters,
															timeRange: "all",
														});
													}}
												>
													<X className="h-3 w-3" />
												</Button>
											</Badge>
										)}

										{activeFilters.followedOnly && (
											<Badge
												variant="secondary"
												className="flex items-center gap-1"
											>
												Followed Users Only
												<Button
													variant="ghost"
													size="icon"
													className="ml-1 h-4 w-4 p-0"
													onClick={() => {
														setActiveFilters({
															...activeFilters,
															followedOnly: false,
														});
													}}
												>
													<X className="h-3 w-3" />
												</Button>
											</Badge>
										)}

										<Button
											variant="ghost"
											size="sm"
											className="ml-auto h-7 px-2 text-xs"
											onClick={() => {
												setSearchQuery("");
												setActiveFilters({
													categories: [],
													credibility: [],
													timeRange: "all",
													followedOnly: false,
												});
											}}
										>
											Clear All
										</Button>
									</div>
								)}
							</div>

							<TabsContent value="latest" className="mt-2 space-y-4">
								{isLoading ? (
									<div className="flex items-center justify-center py-10">
										<Loader2 className="h-8 w-8 animate-spin text-primary" />
									</div>
								) : postsData?.items && postsData.items.length > 0 ? (
									postsData.items.map((post) => (
										<NewsPost
											key={post.id}
											id={post.id}
											user={post.user}
											content={post.content}
											timestamp={new Date(post.createdAt).toLocaleString()}
											credibilityTag={post.consensusTag || "unverified"}
											reviewCount={post.reviewCount}
											commentCount={post.commentCount}
											sources={post.sources}
											hasMedia={post.hasMedia}
										/>
									))
								) : (
									<div className="py-10 text-center text-muted-foreground">
										No posts found. Try adjusting your filters or be the first
										to post!
									</div>
								)}
							</TabsContent>

							<TabsContent value="algorithmic" className="mt-2 space-y-4">
								{/* Algorithmic feed content would go here */}
								<div className="py-8 text-center text-muted-foreground">
									Personalized content based on your interests and interactions
									will appear here.
								</div>
							</TabsContent>
						</Tabs>
					</div>

					{/* Sidebar */}
					<div className="space-y-6">
						{/* Post news button */}
						<QuickPost fullWidth />

						{/* User credibility card */}
						<div className="space-y-3 rounded-lg border p-4">
							<div className="flex items-center space-x-3">
								<Avatar>
									<AvatarImage
										src="/placeholder.svg?height=40&width=40"
										alt="User"
									/>
									<AvatarFallback>U</AvatarFallback>
								</Avatar>
								<div>
									<h3 className="font-medium">Your Credibility</h3>
									<div className="text-muted-foreground text-sm">
										Trustworthy Contributor
									</div>
								</div>
							</div>
							<div className="flex items-center justify-between">
								<div className="font-bold text-2xl">85</div>
								<Badge
									variant="outline"
									className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
								>
									+3 this week
								</Badge>
							</div>
							<div className="text-muted-foreground text-xs">
								Based on your news sharing accuracy and community feedback
							</div>
							<Button variant="outline" size="sm" className="w-full">
								View Profile
							</Button>
						</div>

						{/* Trending topics */}
						<TrendingTopics />

						{/* Fact-checker spotlight */}
						<div className="space-y-3 rounded-lg border p-4">
							<h3 className="flex items-center font-medium">
								<CheckCircle className="mr-2 h-4 w-4 text-green-600" />
								Fact-Checker Spotlight
							</h3>
							<div className="space-y-3">
								<div className="flex items-center space-x-2">
									<Avatar className="h-8 w-8">
										<AvatarImage
											src="/placeholder.svg?height=32&width=32"
											alt="Fact Checker"
										/>
										<AvatarFallback>FC</AvatarFallback>
									</Avatar>
									<div>
										<div className="font-medium text-sm">
											FactCheck Institute
										</div>
										<div className="text-muted-foreground text-xs">
											Verified 126 stories this week
										</div>
									</div>
								</div>
								<Button variant="outline" size="sm" className="w-full">
									Follow
								</Button>
							</div>
						</div>
					</div>
				</div>
			</main>
			<FloatingActionButton />
		</div>
	);
}
