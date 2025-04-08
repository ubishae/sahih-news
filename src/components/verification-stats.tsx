"use client";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	AlertCircle,
	BarChart3,
	CheckCircle,
	Clock,
	Shield,
	ThumbsDown,
	ThumbsUp,
	XCircle,
} from "lucide-react";
import EngagementChart from "./engagement-chart";

export default function VerificationStats() {
	// Sample verification data
	const verificationData = {
		summary: {
			totalReviews: 156,
			accurateReviews: 132,
			inaccurateReviews: 24,
			accuracyRate: 84.6,
			reviewsThisMonth: 28,
		},
		reviewActivity: [12, 18, 15, 22, 28, 32, 29],
		reviewBreakdown: {
			accurate: 132,
			inaccurate: 24,
		},
		reviewedCategories: [
			{ name: "Technology", count: 48 },
			{ name: "Science", count: 35 },
			{ name: "Health", count: 29 },
			{ name: "Politics", count: 22 },
			{ name: "Environment", count: 12 },
			{ name: "Other", count: 10 },
		],
		recentReviews: [
			{
				postTitle: "New breakthrough in renewable energy storage announced",
				verdict: "accurate",
				timestamp: "2 days ago",
			},
			{
				postTitle: "Study claims artificial sweeteners linked to health issues",
				verdict: "misleading",
				timestamp: "3 days ago",
			},
			{
				postTitle: "Government announces new climate policy framework",
				verdict: "accurate",
				timestamp: "5 days ago",
			},
			{
				postTitle: "Tech company unveils revolutionary AI assistant",
				verdict: "accurate",
				timestamp: "1 week ago",
			},
		],
	};

	const getVerificationBadge = (verdict: string) => {
		switch (verdict) {
			case "accurate":
				return (
					<Badge
						variant="outline"
						className="flex items-center gap-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
					>
						<ThumbsUp className="h-3 w-3" />
						Accurate
					</Badge>
				);
			case "inaccurate":
				return (
					<Badge
						variant="outline"
						className="flex items-center gap-1 bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
					>
						<ThumbsDown className="h-3 w-3" />
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
		}
	};

	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="flex items-center gap-2 text-lg">
							<Shield className="h-5 w-5" />
							Verification Summary
						</CardTitle>
						<CardDescription>
							Your contribution to fact-checking
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<div>
									<div className="font-bold text-3xl">
										{verificationData.summary.totalReviews}
									</div>
									<div className="text-muted-foreground text-sm">
										Total reviews
									</div>
								</div>
								<Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
									+{verificationData.summary.reviewsThisMonth} this month
								</Badge>
							</div>

							<div className="grid grid-cols-2 gap-2">
								<div className="rounded-md bg-muted p-3 text-center">
									<div className="font-bold text-green-600 text-xl">
										{verificationData.summary.accurateReviews}
									</div>
									<div className="text-muted-foreground text-xs">
										Accurate reviews
									</div>
								</div>
								<div className="rounded-md bg-muted p-3 text-center">
									<div className="font-bold text-red-600 text-xl">
										{verificationData.summary.inaccurateReviews}
									</div>
									<div className="text-muted-foreground text-xs">
										Inaccurate reviews
									</div>
								</div>
							</div>

							<div className="space-y-1">
								<div className="flex justify-between text-sm">
									<span>Accuracy Rate</span>
									<span>{verificationData.summary.accuracyRate}%</span>
								</div>
								<div className="h-2 w-full overflow-hidden rounded-full bg-muted">
									<div
										className="h-full bg-green-500"
										style={{
											width: `${verificationData.summary.accuracyRate}%`,
										}}
									></div>
								</div>
								<p className="mt-1 text-muted-foreground text-xs">
									Percentage of your reviews that matched the community
									consensus
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="md:col-span-2">
					<CardHeader className="pb-2">
						<CardTitle className="flex items-center gap-2 text-lg">
							<BarChart3 className="h-5 w-5" />
							Review Activity
						</CardTitle>
						<CardDescription>
							Your verification activity over time
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="h-[200px]">
							<EngagementChart
								data={verificationData.reviewActivity}
								labels={["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
								type="bar"
								color="#8b5cf6"
							/>
						</div>
					</CardContent>
					<CardFooter className="text-muted-foreground text-sm">
						Your review activity has increased by 16% in the last 3 months.
					</CardFooter>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-lg">
						<CheckCircle className="h-5 w-5" />
						Review Breakdown
					</CardTitle>
					<CardDescription>
						Categories and topics you've reviewed
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Tabs defaultValue="categories" className="space-y-4">
						<TabsList>
							<TabsTrigger value="categories">By Category</TabsTrigger>
							<TabsTrigger value="recent">Recent Reviews</TabsTrigger>
						</TabsList>

						<TabsContent value="categories" className="space-y-4">
							<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
								<div className="space-y-4">
									{verificationData.reviewedCategories.map(
										(category, index) => (
											<div key={index} className="space-y-1">
												<div className="flex justify-between text-sm">
													<span>{category.name}</span>
													<span>{category.count} reviews</span>
												</div>
												<div className="h-2 w-full overflow-hidden rounded-full bg-muted">
													<div
														className="h-full bg-blue-500"
														style={{
															width: `${(category.count / (verificationData.reviewedCategories[0]?.count || 1)) * 100}%`,
														}}
													></div>
												</div>
											</div>
										),
									)}
								</div>

								<div className="flex flex-col justify-center">
									<div className="rounded-md bg-muted p-4">
										<h4 className="mb-2 font-medium">Verification Insights</h4>
										<ul className="space-y-2 text-muted-foreground text-sm">
											<li className="flex items-start gap-2">
												<CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
												<span>
													You review technology content most frequently,
													aligning with your expertise.
												</span>
											</li>
											<li className="flex items-start gap-2">
												<CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
												<span>
													Your accuracy rate is highest in science and
													technology categories.
												</span>
											</li>
											<li className="flex items-start gap-2">
												<AlertCircle className="mt-0.5 h-4 w-4 text-yellow-600" />
												<span>
													Consider reviewing more diverse topics to increase
													your verification badge level.
												</span>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</TabsContent>

						<TabsContent value="recent">
							<div className="rounded-md border">
								<div className="grid grid-cols-12 border-b bg-muted/50 p-4 font-medium text-sm">
									<div className="col-span-7">Post</div>
									<div className="col-span-3 text-center">Your Verdict</div>
									<div className="col-span-2 text-center">When</div>
								</div>
								{verificationData.recentReviews.map((review, index) => (
									<div
										key={index}
										className={`grid grid-cols-12 p-4 text-sm ${index !== verificationData.recentReviews.length - 1 ? "border-b" : ""}`}
									>
										<div className="col-span-7 font-medium">
											{review.postTitle}
										</div>
										<div className="col-span-3 flex justify-center">
											{getVerificationBadge(review.verdict)}
										</div>
										<div className="col-span-2 text-center text-muted-foreground">
											<div className="flex items-center justify-center gap-1">
												<Clock className="h-3 w-3" />
												<span>{review.timestamp}</span>
											</div>
										</div>
									</div>
								))}
							</div>
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-lg">
						<Shield className="h-5 w-5" />
						Verification Status
					</CardTitle>
					<CardDescription>
						Your current verification level and progress
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-6">
						<div className="flex flex-col gap-6 md:flex-row">
							<div className="flex flex-1 flex-col items-center justify-center rounded-md bg-muted p-6">
								<div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
									<Shield className="h-12 w-12 text-green-600" />
								</div>
								<h3 className="mb-1 font-bold text-xl">Level 2 Verifier</h3>
								<p className="text-center text-muted-foreground text-sm">
									Trusted community reviewer with proven accuracy
								</p>
							</div>

							<div className="flex-1 space-y-4">
								<div className="space-y-1">
									<div className="flex justify-between text-sm">
										<span>Progress to Level 3</span>
										<span>68%</span>
									</div>
									<div className="h-2 w-full overflow-hidden rounded-full bg-muted">
										<div
											className="h-full bg-blue-500"
											style={{ width: "68%" }}
										></div>
									</div>
								</div>

								<div className="space-y-2">
									<h4 className="font-medium">Requirements for Level 3:</h4>
									<ul className="space-y-2 text-sm">
										<li className="flex items-center gap-2">
											<CheckCircle className="h-4 w-4 text-green-600" />
											<span>150+ reviews completed</span>
											<Badge className="ml-auto">156/150</Badge>
										</li>
										<li className="flex items-center gap-2">
											<CheckCircle className="h-4 w-4 text-green-600" />
											<span>80%+ accuracy rate</span>
											<Badge className="ml-auto">84.6%/80%</Badge>
										</li>
										<li className="flex items-center gap-2">
											<AlertCircle className="h-4 w-4 text-yellow-600" />
											<span>Review 5+ different categories</span>
											<Badge className="ml-auto">6/5</Badge>
										</li>
										<li className="flex items-center gap-2">
											<XCircle className="h-4 w-4 text-red-600" />
											<span>200+ total reviews</span>
											<Badge className="ml-auto">156/200</Badge>
										</li>
									</ul>
								</div>
							</div>
						</div>

						<div className="rounded-md bg-muted p-4">
							<h4 className="mb-2 font-medium">Verification Benefits</h4>
							<div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
								<div className="flex items-start gap-2">
									<CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
									<span>Higher credibility score impact</span>
								</div>
								<div className="flex items-start gap-2">
									<CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
									<span>Verification badge on profile</span>
								</div>
								<div className="flex items-start gap-2">
									<CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
									<span>Priority in review consensus</span>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<Button className="w-full">Review More Content</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
