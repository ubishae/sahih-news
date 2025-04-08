"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	BarChart3,
	CheckCircle,
	Globe,
	TrendingUp,
	UserPlus,
	Users,
} from "lucide-react";
import EngagementChart from "./engagement-chart";

export default function AudienceInsights() {
	// Sample audience data
	const audienceData = {
		followers: {
			total: 215,
			growth: 12,
			demographics: {
				credibilityDistribution: [15, 42, 98, 60],
				locations: [
					{ name: "United States", percentage: 45 },
					{ name: "United Kingdom", percentage: 15 },
					{ name: "Canada", percentage: 12 },
					{ name: "Australia", percentage: 8 },
					{ name: "Germany", percentage: 5 },
					{ name: "Other", percentage: 15 },
				],
			},
		},
		engagement: {
			byDay: [42, 38, 56, 48, 52, 59, 63],
			byCategory: [
				{ name: "Technology", value: 45 },
				{ name: "Science", value: 32 },
				{ name: "Health", value: 28 },
				{ name: "Business", value: 18 },
				{ name: "Environment", value: 15 },
			],
		},
		topFollowers: [
			{
				name: "Sarah Johnson",
				handle: "@sarahjournalist",
				avatar: "/placeholder.svg?height=40&width=40",
				isVerified: true,
				credibilityScore: 92,
				followers: 1245,
			},
			{
				name: "Tech Observer",
				handle: "@techobserver",
				avatar: "/placeholder.svg?height=40&width=40",
				isVerified: false,
				credibilityScore: 78,
				followers: 876,
			},
			{
				name: "Science Today",
				handle: "@sciencetoday",
				avatar: "/placeholder.svg?height=40&width=40",
				isVerified: true,
				credibilityScore: 91,
				followers: 2340,
			},
			{
				name: "Health Insights",
				handle: "@healthinsights",
				avatar: "/placeholder.svg?height=40&width=40",
				isVerified: false,
				credibilityScore: 72,
				followers: 654,
			},
		],
	};

	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="flex items-center gap-2 text-lg">
							<Users className="h-5 w-5" />
							Follower Growth
						</CardTitle>
						<CardDescription>Your audience growth over time</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<div>
									<div className="font-bold text-3xl">
										{audienceData.followers.total}
									</div>
									<div className="text-muted-foreground text-sm">
										Total followers
									</div>
								</div>
								<Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
									+{audienceData.followers.growth} this month
								</Badge>
							</div>

							<div className="h-[200px]">
								<EngagementChart
									data={[180, 185, 190, 195, 203, 210, 215]}
									labels={["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
									type="line"
									color="#22c55e"
								/>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="flex items-center gap-2 text-lg">
							<BarChart3 className="h-5 w-5" />
							Follower Credibility
						</CardTitle>
						<CardDescription>
							Credibility distribution of your followers
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="grid grid-cols-2 gap-2">
								<div className="rounded-md bg-muted p-3 text-center">
									<div className="font-bold text-2xl">
										{Math.round(
											(((audienceData.followers.demographics
												?.credibilityDistribution?.[2] ?? 0) +
												(audienceData.followers.demographics
													?.credibilityDistribution?.[3] ?? 0)) /
												(audienceData.followers?.total || 1)) *
												100,
										)}
										%
									</div>
									<div className="text-muted-foreground text-xs">
										High credibility
									</div>
								</div>
								<div className="rounded-md bg-muted p-3 text-center">
									<div className="font-bold text-2xl">
										{Math.round(
											((audienceData.followers.demographics
												?.credibilityDistribution?.[3] ?? 0) /
												(audienceData.followers?.total || 1)) *
												100,
										)}
										%
									</div>
									<div className="text-muted-foreground text-xs">
										Verified users
									</div>
								</div>
							</div>

							<div className="space-y-3">
								<div className="space-y-1">
									<div className="flex justify-between text-sm">
										<span>90-100 (Excellent)</span>
										<span>
											{
												audienceData.followers.demographics
													?.credibilityDistribution?.[3] ?? 0
											}{" "}
											followers
										</span>
									</div>
									<div className="h-2 w-full overflow-hidden rounded-full bg-muted">
										<div
											className="h-full bg-green-500"
											style={{
												width: `${((audienceData.followers.demographics?.credibilityDistribution?.[3] ?? 0) / (audienceData.followers?.total || 1)) * 100}%`,
											}}
										></div>
									</div>
								</div>

								<div className="space-y-1">
									<div className="flex justify-between text-sm">
										<span>70-89 (Good)</span>
										<span>
											{
												audienceData.followers.demographics
													?.credibilityDistribution?.[2] ?? 0
											}{" "}
											followers
										</span>
									</div>
									<div className="h-2 w-full overflow-hidden rounded-full bg-muted">
										<div
											className="h-full bg-blue-500"
											style={{
												width: `${((audienceData.followers.demographics?.credibilityDistribution?.[2] ?? 0) / (audienceData.followers?.total || 1)) * 100}%`,
											}}
										></div>
									</div>
								</div>

								<div className="space-y-1">
									<div className="flex justify-between text-sm">
										<span>50-69 (Average)</span>
										<span>
											{
												audienceData.followers.demographics
													?.credibilityDistribution?.[1] ?? 0
											}{" "}
											followers
										</span>
									</div>
									<div className="h-2 w-full overflow-hidden rounded-full bg-muted">
										<div
											className="h-full bg-yellow-500"
											style={{
												width: `${((audienceData.followers.demographics?.credibilityDistribution?.[1] ?? 0) / (audienceData.followers?.total || 1)) * 100}%`,
											}}
										></div>
									</div>
								</div>

								<div className="space-y-1">
									<div className="flex justify-between text-sm">
										<span>0-49 (Low)</span>
										<span>
											{
												audienceData.followers.demographics
													?.credibilityDistribution?.[0] ?? 0
											}{" "}
											followers
										</span>
									</div>
									<div className="h-2 w-full overflow-hidden rounded-full bg-muted">
										<div
											className="h-full bg-red-500"
											style={{
												width: `${((audienceData.followers.demographics?.credibilityDistribution?.[0] ?? 0) / (audienceData.followers?.total || 1)) * 100}%`,
											}}
										></div>
									</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="flex items-center gap-2 text-lg">
							<Globe className="h-5 w-5" />
							Geographic Distribution
						</CardTitle>
						<CardDescription>Where your followers are located</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{audienceData.followers.demographics.locations.map(
								(location, index) => (
									<div key={index} className="space-y-1">
										<div className="flex justify-between text-sm">
											<span>{location.name}</span>
											<span>{location.percentage}%</span>
										</div>
										<div className="h-2 w-full overflow-hidden rounded-full bg-muted">
											<div
												className="h-full bg-blue-500"
												style={{ width: `${location.percentage}%` }}
											></div>
										</div>
									</div>
								),
							)}
						</div>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-lg">
						<TrendingUp className="h-5 w-5" />
						Engagement Metrics
					</CardTitle>
					<CardDescription>
						How your audience interacts with your content
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Tabs defaultValue="daily" className="space-y-4">
						<TabsList>
							<TabsTrigger value="daily">Daily Engagement</TabsTrigger>
							<TabsTrigger value="category">By Category</TabsTrigger>
						</TabsList>

						<TabsContent value="daily" className="space-y-4">
							<div className="h-[300px]">
								<EngagementChart
									data={audienceData.engagement.byDay}
									labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
									type="bar"
									color="#8b5cf6"
								/>
							</div>

							<div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
								<div className="rounded-md bg-muted p-3 text-center">
									<div className="font-bold text-2xl">
										{Math.round(
											audienceData.engagement.byDay.reduce((a, b) => a + b, 0) /
												audienceData.engagement.byDay.length,
										)}
									</div>
									<div className="text-muted-foreground text-xs">
										Avg. daily engagement
									</div>
								</div>
								<div className="rounded-md bg-muted p-3 text-center">
									<div className="font-bold text-2xl">
										{Math.max(...audienceData.engagement.byDay)}
									</div>
									<div className="text-muted-foreground text-xs">
										Peak engagement
									</div>
								</div>
								<div className="rounded-md bg-muted p-3 text-center">
									<div className="font-bold text-2xl">
										{Math.round(
											(audienceData.engagement.byDay.reduce(
												(a, b) => a + b,
												0,
											) /
												audienceData.followers.total) *
												100,
										)}
										%
									</div>
									<div className="text-muted-foreground text-xs">
										Follower engagement rate
									</div>
								</div>
								<div className="rounded-md bg-muted p-3 text-center">
									<div className="font-bold text-2xl">
										{audienceData.engagement.byDay.indexOf(
											Math.max(...audienceData.engagement.byDay),
										) === 6
											? "Sun"
											: audienceData.engagement.byDay.indexOf(
														Math.max(...audienceData.engagement.byDay),
													) === 0
												? "Mon"
												: audienceData.engagement.byDay.indexOf(
															Math.max(...audienceData.engagement.byDay),
														) === 1
													? "Tue"
													: audienceData.engagement.byDay.indexOf(
																Math.max(...audienceData.engagement.byDay),
															) === 2
														? "Wed"
														: audienceData.engagement.byDay.indexOf(
																	Math.max(...audienceData.engagement.byDay),
																) === 3
															? "Thu"
															: audienceData.engagement.byDay.indexOf(
																		Math.max(...audienceData.engagement.byDay),
																	) === 4
																? "Fri"
																: "Sat"}
									</div>
									<div className="text-muted-foreground text-xs">Best day</div>
								</div>
							</div>
						</TabsContent>

						<TabsContent value="category" className="space-y-4">
							<div className="space-y-4">
								{audienceData.engagement.byCategory.map((category, index) => (
									<div key={index} className="space-y-1">
										<div className="flex justify-between text-sm">
											<span>{category.name}</span>
											<span>{category.value} avg. engagement</span>
										</div>
										<div className="h-3 w-full overflow-hidden rounded-full bg-muted">
											<div
												className="h-full bg-purple-500"
												style={{
													width: `${(category.value / (audienceData.engagement.byCategory[0]?.value || 1)) * 100}%`,
												}}
											></div>
										</div>
									</div>
								))}
							</div>

							<div className="rounded-md bg-muted p-4">
								<h4 className="mb-2 font-medium">Insight</h4>
								<p className="text-muted-foreground text-sm">
									Your technology and science content receives the highest
									engagement. Consider focusing more on these topics to grow
									your audience.
								</p>
							</div>
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-lg">
						<UserPlus className="h-5 w-5" />
						Notable Followers
					</CardTitle>
					<CardDescription>
						Influential users following your content
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						{audienceData.topFollowers.map((follower, index) => (
							<div
								key={index}
								className="flex items-center gap-3 rounded-md bg-muted p-3"
							>
								<Avatar>
									<AvatarImage src={follower.avatar} alt={follower.name} />
									<AvatarFallback>{follower.name.charAt(0)}</AvatarFallback>
								</Avatar>
								<div className="flex-1">
									<div className="flex items-center gap-1">
										<span className="font-medium">{follower.name}</span>
										{follower.isVerified && (
											<CheckCircle className="h-3.5 w-3.5 fill-blue-500 text-blue-500" />
										)}
									</div>
									<div className="text-muted-foreground text-xs">
										{follower.handle}
									</div>
									<div className="mt-1 flex items-center gap-2">
										<Badge variant="outline" className="text-xs">
											{follower.credibilityScore} credibility
										</Badge>
										<span className="text-muted-foreground text-xs">
											{follower.followers.toLocaleString()} followers
										</span>
									</div>
								</div>
								<Button variant="outline" size="sm">
									View
								</Button>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
