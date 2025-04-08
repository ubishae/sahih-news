"use client";

import AudienceInsights from "@/components/audience-insights";
import CredibilityChart from "@/components/credibility-chart";
import EngagementChart from "@/components/engagement-chart";
import Header from "@/components/header";
import PostPerformanceTable from "@/components/post-performance-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VerificationStats from "@/components/verification-stats";
import {
	AlertCircle,
	ArrowUpRight,
	BarChart3,
	Calendar,
	CheckCircle,
	Download,
	Eye,
	Filter,
	HelpCircle,
	Info,
	LinkIcon,
	MessageSquare,
	TrendingUp,
	Users,
	XCircle,
} from "lucide-react";
import { useState } from "react";

export default function AnalyticsPage() {
	const [timeRange, setTimeRange] = useState("30d");

	// Sample user data
	const userData = {
		name: "Alex Johnson",
		handle: "@alexj",
		avatar: "/placeholder.svg?height=40&width=40",
		credibilityScore: 85,
		credibilityChange: 3,
		badge: "Trustworthy Contributor",
		stats: {
			posts: 42,
			views: 12580,
			engagement: 1876,
			followers: 215,
		},
		credibilityHistory: [78, 79, 80, 80, 82, 81, 83, 84, 85],
		postBreakdown: {
			verified: 28,
			unverified: 8,
			misleading: 4,
			false: 2,
		},
		topPerformingCategories: [
			{ name: "Technology", posts: 15, avgEngagement: 56 },
			{ name: "Science", posts: 12, avgEngagement: 48 },
			{ name: "Health", posts: 8, avgEngagement: 42 },
		],
		recentPosts: [
			{
				id: "1",
				title: "New breakthrough in renewable energy storage announced",
				timestamp: "2 days ago",
				views: 1245,
				engagement: 187,
				credibilityTag: "verified",
			},
			{
				id: "2",
				title: "Global tech conference highlights AI innovations",
				timestamp: "5 days ago",
				views: 982,
				engagement: 143,
				credibilityTag: "verified",
			},
			{
				id: "3",
				title: "Study suggests link between diet and cognitive health",
				timestamp: "1 week ago",
				views: 756,
				engagement: 98,
				credibilityTag: "unverified",
			},
		],
	};

	// Calculate percentage changes for stats (in a real app, this would come from the API)
	const changes = {
		views: 12.5,
		engagement: 8.3,
		followers: 5.2,
		credibility: 3.5,
	};

	const getCredibilityBadge = (tag: string) => {
		switch (tag) {
			case "verified":
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
		<div className="min-h-screen bg-background">
			<Header />
			<main className="container mx-auto max-w-6xl px-4 py-6">
				<div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
					<div>
						<h1 className="font-bold text-2xl">Analytics Dashboard</h1>
						<p className="text-muted-foreground">
							Track your performance and credibility
						</p>
					</div>
					<div className="flex items-center gap-2">
						<Select value={timeRange} onValueChange={setTimeRange}>
							<SelectTrigger className="w-[180px]">
								<Calendar className="mr-2 h-4 w-4" />
								<SelectValue placeholder="Select time range" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="7d">Last 7 days</SelectItem>
								<SelectItem value="30d">Last 30 days</SelectItem>
								<SelectItem value="90d">Last 90 days</SelectItem>
								<SelectItem value="1y">Last year</SelectItem>
								<SelectItem value="all">All time</SelectItem>
							</SelectContent>
						</Select>
						<Button variant="outline" className="flex items-center gap-1">
							<Download className="h-4 w-4" />
							Export
						</Button>
					</div>
				</div>

				{/* Overview Cards */}
				<div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
					<Card>
						<CardContent className="pt-6">
							<div className="flex items-start justify-between">
								<div>
									<p className="mb-1 font-medium text-muted-foreground text-sm">
										Credibility Score
									</p>
									<div className="flex items-baseline">
										<h3 className="font-bold text-2xl">
											{userData.credibilityScore}
										</h3>
										<Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
											+{userData.credibilityChange}
										</Badge>
									</div>
								</div>
								<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
									<CheckCircle className="h-5 w-5 text-primary" />
								</div>
							</div>
							<div className="mt-4 flex items-center text-sm">
								<ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
								<span className="font-medium text-green-500">
									{changes.credibility}%
								</span>
								<span className="ml-1 text-muted-foreground">
									from last period
								</span>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-6">
							<div className="flex items-start justify-between">
								<div>
									<p className="mb-1 font-medium text-muted-foreground text-sm">
										Total Views
									</p>
									<div className="flex items-baseline">
										<h3 className="font-bold text-2xl">
											{userData.stats.views.toLocaleString()}
										</h3>
									</div>
								</div>
								<div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
									<Eye className="h-5 w-5 text-blue-500" />
								</div>
							</div>
							<div className="mt-4 flex items-center text-sm">
								<ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
								<span className="font-medium text-green-500">
									{changes.views}%
								</span>
								<span className="ml-1 text-muted-foreground">
									from last period
								</span>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-6">
							<div className="flex items-start justify-between">
								<div>
									<p className="mb-1 font-medium text-muted-foreground text-sm">
										Engagement
									</p>
									<div className="flex items-baseline">
										<h3 className="font-bold text-2xl">
											{userData.stats.engagement.toLocaleString()}
										</h3>
									</div>
								</div>
								<div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/20">
									<MessageSquare className="h-5 w-5 text-purple-500" />
								</div>
							</div>
							<div className="mt-4 flex items-center text-sm">
								<ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
								<span className="font-medium text-green-500">
									{changes.engagement}%
								</span>
								<span className="ml-1 text-muted-foreground">
									from last period
								</span>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-6">
							<div className="flex items-start justify-between">
								<div>
									<p className="mb-1 font-medium text-muted-foreground text-sm">
										Followers
									</p>
									<div className="flex items-baseline">
										<h3 className="font-bold text-2xl">
											{userData.stats.followers.toLocaleString()}
										</h3>
									</div>
								</div>
								<div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
									<Users className="h-5 w-5 text-green-500" />
								</div>
							</div>
							<div className="mt-4 flex items-center text-sm">
								<ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
								<span className="font-medium text-green-500">
									{changes.followers}%
								</span>
								<span className="ml-1 text-muted-foreground">
									from last period
								</span>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Main Analytics Content */}
				<Tabs defaultValue="overview" className="space-y-6">
					<TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
						<TabsTrigger value="overview">Overview</TabsTrigger>
						<TabsTrigger value="credibility">Credibility</TabsTrigger>
						<TabsTrigger value="posts">Posts</TabsTrigger>
						<TabsTrigger value="audience">Audience</TabsTrigger>
						<TabsTrigger value="verification">Verification</TabsTrigger>
					</TabsList>

					{/* Overview Tab */}
					<TabsContent value="overview" className="space-y-6">
						<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
							{/* Credibility Score Card */}
							<Card className="lg:col-span-2">
								<CardHeader>
									<CardTitle className="flex items-center gap-2 text-lg">
										<TrendingUp className="h-5 w-5" />
										Credibility Score Trend
									</CardTitle>
									<CardDescription>
										Your credibility score over time
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="h-[300px]">
										<EngagementChart
											data={userData.credibilityHistory}
											labels={[
												"Jan",
												"Feb",
												"Mar",
												"Apr",
												"May",
												"Jun",
												"Jul",
												"Aug",
												"Sep",
											]}
											type="line"
											color="#22c55e"
										/>
									</div>
								</CardContent>
								<CardFooter className="flex justify-between text-muted-foreground text-sm">
									<div>Starting: {userData.credibilityHistory[0]}</div>
									<div>
										Current:{" "}
										{
											userData.credibilityHistory[
												userData.credibilityHistory.length - 1
											]
										}
									</div>
								</CardFooter>
							</Card>

							{/* Post Breakdown Card */}
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2 text-lg">
										<BarChart3 className="h-5 w-5" />
										Post Breakdown
									</CardTitle>
									<CardDescription>
										Distribution by verification status
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="flex h-[300px] items-center justify-center">
										<CredibilityChart
											accurate={userData.postBreakdown.verified}
											inaccurate={
												userData.postBreakdown.false +
												userData.postBreakdown.misleading
											}
											consensusPercentage={Math.round(
												(userData.postBreakdown.verified /
													userData.stats.posts) *
													100,
											)}
										/>
									</div>
								</CardContent>
								<CardFooter>
									<div className="grid w-full grid-cols-2 gap-2">
										<div className="flex items-center gap-2">
											<div className="h-3 w-3 rounded-full bg-green-500"></div>
											<span className="text-sm">
												Verified ({userData.postBreakdown.verified})
											</span>
										</div>
										<div className="flex items-center gap-2">
											<div className="h-3 w-3 rounded-full bg-yellow-500"></div>
											<span className="text-sm">
												Unverified ({userData.postBreakdown.unverified})
											</span>
										</div>
										<div className="flex items-center gap-2">
											<div className="h-3 w-3 rounded-full bg-orange-500"></div>
											<span className="text-sm">
												Misleading ({userData.postBreakdown.misleading})
											</span>
										</div>
										<div className="flex items-center gap-2">
											<div className="h-3 w-3 rounded-full bg-red-500"></div>
											<span className="text-sm">
												False ({userData.postBreakdown.false})
											</span>
										</div>
									</div>
								</CardFooter>
							</Card>
						</div>

						{/* Recent Posts Performance */}
						<Card>
							<CardHeader>
								<div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
									<div>
										<CardTitle className="flex items-center gap-2 text-lg">
											<BarChart3 className="h-5 w-5" />
											Recent Posts Performance
										</CardTitle>
										<CardDescription>
											How your recent posts are performing
										</CardDescription>
									</div>
									<Button
										variant="outline"
										size="sm"
										className="flex items-center gap-1"
									>
										<Filter className="h-4 w-4" />
										Filter
									</Button>
								</div>
							</CardHeader>
							<CardContent>
								<div className="rounded-md border">
									<div className="grid grid-cols-12 border-b bg-muted/50 p-4 font-medium text-sm">
										<div className="col-span-6">Post</div>
										<div className="col-span-2 text-center">Views</div>
										<div className="col-span-2 text-center">Engagement</div>
										<div className="col-span-2 text-center">Status</div>
									</div>
									{userData.recentPosts.map((post, index) => (
										<div
											key={post.id}
											className={`grid grid-cols-12 p-4 text-sm ${index !== userData.recentPosts.length - 1 ? "border-b" : ""}`}
										>
											<div className="col-span-6">
												<div className="font-medium">{post.title}</div>
												<div className="text-muted-foreground text-xs">
													{post.timestamp}
												</div>
											</div>
											<div className="col-span-2 text-center">
												{post.views.toLocaleString()}
											</div>
											<div className="col-span-2 text-center">
												{post.engagement.toLocaleString()}
											</div>
											<div className="col-span-2 flex justify-center">
												{getCredibilityBadge(post.credibilityTag)}
											</div>
										</div>
									))}
								</div>
							</CardContent>
							<CardFooter>
								<Button variant="outline" className="w-full">
									View All Posts
								</Button>
							</CardFooter>
						</Card>

						{/* Top Performing Categories */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-lg">
									<BarChart3 className="h-5 w-5" />
									Top Performing Categories
								</CardTitle>
								<CardDescription>
									Categories with highest engagement
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{userData.topPerformingCategories.map((category, index) => (
										<div key={index} className="space-y-2">
											<div className="flex items-center justify-between">
												<div className="flex items-center gap-2">
													<Badge variant="outline">{category.name}</Badge>
													<span className="text-muted-foreground text-sm">
														{category.posts} posts
													</span>
												</div>
												<div className="font-medium text-sm">
													{category.avgEngagement} avg. engagement
												</div>
											</div>
											<div className="h-2 w-full overflow-hidden rounded-full bg-muted">
												<div
													className="h-full bg-primary"
													style={{
														width: `${userData.topPerformingCategories[0] ? (category.avgEngagement / userData.topPerformingCategories[0].avgEngagement) * 100 : 0}%`,
													}}
												></div>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Credibility Tab */}
					<TabsContent value="credibility" className="space-y-6">
						<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
							<Card className="md:col-span-2">
								<CardHeader>
									<CardTitle className="text-lg">
										Credibility Score Analysis
									</CardTitle>
									<CardDescription>
										Detailed breakdown of your credibility metrics
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-6">
									<div className="flex flex-col gap-6 md:flex-row">
										<div className="flex-1 space-y-2">
											<div className="flex items-center justify-between">
												<h4 className="font-medium text-sm">Current Score</h4>
												<span className="font-bold text-2xl">
													{userData.credibilityScore}
												</span>
											</div>
											<div className="h-2 w-full overflow-hidden rounded-full bg-muted">
												<div
													className="h-full bg-primary"
													style={{ width: `${userData.credibilityScore}%` }}
												></div>
											</div>
											<div className="flex justify-between text-muted-foreground text-xs">
												<span>0</span>
												<span>50</span>
												<span>100</span>
											</div>
										</div>

										<div className="flex-1">
											<div className="mb-4 flex items-center gap-2">
												<Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
													{userData.badge}
												</Badge>
												<Info className="h-4 w-4 text-muted-foreground" />
											</div>

											<div className="space-y-3">
												<div className="flex items-center justify-between">
													<div className="flex items-center gap-2">
														<CheckCircle className="h-4 w-4 text-green-500" />
														<span className="text-sm">Verified Posts</span>
													</div>
													<span className="font-medium text-sm">
														{userData.postBreakdown.verified}
													</span>
												</div>

												<div className="flex items-center justify-between">
													<div className="flex items-center gap-2">
														<AlertCircle className="h-4 w-4 text-orange-500" />
														<span className="text-sm">Misleading Posts</span>
													</div>
													<span className="font-medium text-sm">
														{userData.postBreakdown.misleading}
													</span>
												</div>

												<div className="flex items-center justify-between">
													<div className="flex items-center gap-2">
														<XCircle className="h-4 w-4 text-red-500" />
														<span className="text-sm">False Posts</span>
													</div>
													<span className="font-medium text-sm">
														{userData.postBreakdown.false}
													</span>
												</div>
											</div>
										</div>
									</div>

									<Separator />

									<div>
										<h4 className="mb-4 font-medium text-sm">
											Credibility Factors
										</h4>
										<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
											<div className="space-y-2">
												<div className="flex items-center justify-between">
													<span className="text-sm">Source Citation</span>
													<Badge
														variant="outline"
														className="bg-green-100 text-green-800"
													>
														Good
													</Badge>
												</div>
												<div className="h-2 w-full overflow-hidden rounded-full bg-muted">
													<div
														className="h-full bg-green-500"
														style={{ width: "85%" }}
													></div>
												</div>
											</div>

											<div className="space-y-2">
												<div className="flex items-center justify-between">
													<span className="text-sm">Community Feedback</span>
													<Badge
														variant="outline"
														className="bg-green-100 text-green-800"
													>
														Good
													</Badge>
												</div>
												<div className="h-2 w-full overflow-hidden rounded-full bg-muted">
													<div
														className="h-full bg-green-500"
														style={{ width: "78%" }}
													></div>
												</div>
											</div>

											<div className="space-y-2">
												<div className="flex items-center justify-between">
													<span className="text-sm">Fact-Check Alignment</span>
													<Badge
														variant="outline"
														className="bg-yellow-100 text-yellow-800"
													>
														Average
													</Badge>
												</div>
												<div className="h-2 w-full overflow-hidden rounded-full bg-muted">
													<div
														className="h-full bg-yellow-500"
														style={{ width: "65%" }}
													></div>
												</div>
											</div>

											<div className="space-y-2">
												<div className="flex items-center justify-between">
													<span className="text-sm">Review Participation</span>
													<Badge
														variant="outline"
														className="bg-green-100 text-green-800"
													>
														Good
													</Badge>
												</div>
												<div className="h-2 w-full overflow-hidden rounded-full bg-muted">
													<div
														className="h-full bg-green-500"
														style={{ width: "82%" }}
													></div>
												</div>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle className="text-lg">Credibility Badges</CardTitle>
									<CardDescription>
										Achievements and recognition
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<div className="flex items-center gap-3 rounded-md border border-green-200 bg-green-50 p-3 dark:border-green-900/30 dark:bg-green-900/10">
											<div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
												<CheckCircle className="h-5 w-5 text-green-600" />
											</div>
											<div>
												<h4 className="font-medium">Trustworthy Contributor</h4>
												<p className="text-muted-foreground text-xs">
													Maintained high credibility for 3+ months
												</p>
											</div>
										</div>

										<div className="flex items-center gap-3 rounded-md border border-blue-200 bg-blue-50 p-3 dark:border-blue-900/30 dark:bg-blue-900/10">
											<div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
												<Users className="h-5 w-5 text-blue-600" />
											</div>
											<div>
												<h4 className="font-medium">Community Reviewer</h4>
												<p className="text-muted-foreground text-xs">
													Reviewed 50+ posts with high accuracy
												</p>
											</div>
										</div>

										<div className="flex items-center gap-3 rounded-md border border-purple-200 bg-purple-50 p-3 dark:border-purple-900/30 dark:bg-purple-900/10">
											<div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/50">
												<TrendingUp className="h-5 w-5 text-purple-600" />
											</div>
											<div>
												<h4 className="font-medium">Rising Influence</h4>
												<p className="text-muted-foreground text-xs">
													Growing audience and engagement
												</p>
											</div>
										</div>

										<div className="flex items-center gap-3 rounded-md border bg-muted p-3">
											<div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted-foreground/20">
												<Info className="h-5 w-5 text-muted-foreground" />
											</div>
											<div>
												<h4 className="font-medium">Source Expert</h4>
												<p className="text-muted-foreground text-xs">
													Locked (Cite 20 more verified sources)
												</p>
											</div>
										</div>
									</div>
								</CardContent>
								<CardFooter>
									<Button variant="outline" className="w-full">
										View All Badges
									</Button>
								</CardFooter>
							</Card>
						</div>

						<Card>
							<CardHeader>
								<CardTitle className="text-lg">
									Credibility Improvement Tips
								</CardTitle>
								<CardDescription>
									Recommendations to enhance your credibility score
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="flex items-start gap-3 rounded-md bg-muted p-4">
										<div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
											<LinkIcon className="h-4 w-4 text-blue-600" />
										</div>
										<div>
											<h4 className="font-medium">Improve Source Citation</h4>
											<p className="mt-1 text-muted-foreground text-sm">
												Include multiple credible sources in your posts.
												Official sources, academic publications, and recognized
												news outlets are weighted higher.
											</p>
											<Button
												variant="link"
												className="mt-2 h-auto p-0 text-sm"
											>
												Learn more about source quality
											</Button>
										</div>
									</div>

									<div className="flex items-start gap-3 rounded-md bg-muted p-4">
										<div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
											<CheckCircle className="h-4 w-4 text-green-600" />
										</div>
										<div>
											<h4 className="font-medium">
												Participate in Fact-Checking
											</h4>
											<p className="mt-1 text-muted-foreground text-sm">
												Review and fact-check other users' posts. Accurate
												reviews contribute positively to your credibility score.
											</p>
											<Button
												variant="link"
												className="mt-2 h-auto p-0 text-sm"
											>
												Start reviewing
											</Button>
										</div>
									</div>

									<div className="flex items-start gap-3 rounded-md bg-muted p-4">
										<div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/50">
											<Users className="h-4 w-4 text-purple-600" />
										</div>
										<div>
											<h4 className="font-medium">Engage with Feedback</h4>
											<p className="mt-1 text-muted-foreground text-sm">
												Respond to comments and address concerns about your
												posts. Acknowledging corrections improves your
												reputation.
											</p>
											<Button
												variant="link"
												className="mt-2 h-auto p-0 text-sm"
											>
												View recent feedback
											</Button>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Posts Tab */}
					<TabsContent value="posts" className="space-y-6">
						<PostPerformanceTable />
					</TabsContent>

					{/* Audience Tab */}
					<TabsContent value="audience" className="space-y-6">
						<AudienceInsights />
					</TabsContent>

					{/* Verification Tab */}
					<TabsContent value="verification" className="space-y-6">
						<VerificationStats />
					</TabsContent>
				</Tabs>
			</main>
		</div>
	);
}
