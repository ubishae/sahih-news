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
import {
	AlertCircle,
	Calendar,
	CheckCircle,
	HelpCircle,
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

	const handleSearch = (query: string) => {
		setSearchQuery(query);
		// In a real app, this would fetch filtered news posts from an API
	};

	const handleFilter = (filters: FilterOptions) => {
		setActiveFilters(filters);
		// In a real app, this would fetch filtered news posts from an API
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
												{status === "verified" && (
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
								<NewsPost
									user={{
										name: "Sarah Johnson",
										handle: "@sarahjournalist",
										avatar: "/placeholder.svg?height=40&width=40",
										isVerified: true,
										credibilityScore: 92,
									}}
									content="Breaking: New climate policy announced today will set ambitious targets for carbon reduction across all industries. The plan includes tax incentives for renewable energy adoption."
									timestamp="2 hours ago"
									credibilityTag="true"
									reviewCount={124}
									commentCount={37}
									sources={["https://example.com/climate-policy"]}
								/>

								<NewsPost
									user={{
										name: "Tech Observer",
										handle: "@techobserver",
										avatar: "/placeholder.svg?height=40&width=40",
										isVerified: false,
										credibilityScore: 78,
									}}
									content="AI startup claims breakthrough in quantum computing that could revolutionize data processing. The company says their new algorithm is 100x faster than current methods."
									timestamp="4 hours ago"
									credibilityTag="unverified"
									reviewCount={56}
									commentCount={23}
									sources={["https://example.com/ai-breakthrough"]}
								/>

								<NewsPost
									user={{
										name: "Sports Update",
										handle: "@sportsupdate",
										avatar: "/placeholder.svg?height=40&width=40",
										isVerified: true,
										credibilityScore: 88,
									}}
									content="National basketball team advances to semifinals after thrilling overtime victory. Star player scores career-high 42 points to lead the comeback."
									timestamp="6 hours ago"
									credibilityTag="true"
									reviewCount={210}
									commentCount={85}
									sources={["https://example.com/basketball-semifinals"]}
									hasMedia={true}
								/>

								<NewsPost
									user={{
										name: "Health News",
										handle: "@healthnews",
										avatar: "/placeholder.svg?height=40&width=40",
										isVerified: true,
										credibilityScore: 90,
									}}
									content="New study suggests regular meditation may significantly reduce stress-related health issues. Researchers found participants showed improved immune response after 8 weeks."
									timestamp="8 hours ago"
									credibilityTag="true"
									reviewCount={98}
									commentCount={42}
									sources={["https://example.com/meditation-study"]}
								/>

								<NewsPost
									user={{
										name: "City Reporter",
										handle: "@cityreporter",
										avatar: "/placeholder.svg?height=40&width=40",
										isVerified: false,
										credibilityScore: 65,
									}}
									content="Local authorities announce major infrastructure project to begin next month. The project will reportedly create hundreds of jobs and improve transportation."
									timestamp="10 hours ago"
									credibilityTag="misleading"
									reviewCount={76}
									commentCount={31}
									sources={["https://example.com/infrastructure-project"]}
								/>
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
