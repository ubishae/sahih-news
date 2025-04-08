import Header from "@/components/header";
import CredibilityHistory from "@/components/profile/credibility-history";
import UserBookmarks from "@/components/profile/user-bookmarks";
import UserComments from "@/components/profile/user-comments";
import UserPosts from "@/components/profile/user-posts";
import UserReviews from "@/components/profile/user-reviews";
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
	Award,
	BarChart3,
	Bell,
	BellOff,
	BookOpen,
	Calendar,
	CheckCircle,
	Eye,
	FileText,
	LinkIcon,
	MapPin,
	MessageSquare,
	MoreHorizontal,
	Settings,
	Share2,
	Shield,
	TrendingUp,
	UserPlus,
	Users,
} from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
	title: "User Profile | SahihNews",
	description: "View user profile, posts, and credibility on SahihNews",
};

interface ProfilePageProps {
	params: Promise<{
		username: string;
	}>;
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
	// In a real app, we would fetch the user data based on the username
	const resolvedParams = await params;
	const username = resolvedParams.username;

	// Mock user data - in a real app, this would come from an API
	const userData = {
		id: "1",
		name: "Alex Johnson",
		username: "alexj",
		avatar: "/placeholder.svg?height=128&width=128",
		bio: "Journalist and tech enthusiast. Covering emerging technologies and their impact on society. Verified contributor with 5+ years experience in tech journalism.",
		isVerified: true,
		credibilityScore: 85,
		credibilityBadge: "Trustworthy Contributor",
		joinDate: "January 2022",
		location: "San Francisco, CA",
		website: "https://alexjohnson.example.com",
		stats: {
			posts: 142,
			followers: 1256,
			following: 348,
			reviews: 215,
		},
		credibilityHistory: [78, 79, 80, 80, 82, 81, 83, 84, 85],
		isCurrentUser: username === "alexj",
		isFollowing: false,
		isNotificationsEnabled: true,
		achievements: [
			{ name: "Top Contributor", icon: "Award", date: "June 2023" },
			{ name: "Fact-Check Expert", icon: "CheckCircle", date: "March 2023" },
			{ name: "Rising Star", icon: "TrendingUp", date: "February 2023" },
		],
		expertise: ["Technology", "Science", "Climate", "AI"],
		recentActivity: {
			lastActive: "2 hours ago",
			postsThisWeek: 5,
			reviewsThisWeek: 12,
		},
	};

	// If user doesn't exist, show 404
	if (!userData) {
		notFound();
	}

	// Map achievement icons to Lucide icons
	const getAchievementIcon = (iconName: string) => {
		switch (iconName) {
			case "Award":
				return <Award className="h-4 w-4" />;
			case "CheckCircle":
				return <CheckCircle className="h-4 w-4" />;
			case "TrendingUp":
				return <TrendingUp className="h-4 w-4" />;
			default:
				return <Award className="h-4 w-4" />;
		}
	};

	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main className="container mx-auto max-w-4xl px-4 py-6">
				{/* Profile header */}
				<Card className="mb-6">
					<CardContent className="pt-6">
						<div className="flex flex-col gap-6 md:flex-row">
							<div className="flex flex-col items-center md:items-start">
								<Avatar className="mb-4 h-24 w-24 md:h-32 md:w-32">
									<AvatarImage src={userData.avatar} alt={userData.name} />
									<AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
								</Avatar>

								{/* Mobile-only stats */}
								<div className="mb-4 grid w-full grid-cols-4 gap-2 md:hidden">
									<div className="flex flex-col items-center">
										<span className="font-bold">{userData.stats.posts}</span>
										<span className="text-muted-foreground text-xs">Posts</span>
									</div>
									<div className="flex flex-col items-center">
										<span className="font-bold">
											{userData.stats.followers}
										</span>
										<span className="text-muted-foreground text-xs">
											Followers
										</span>
									</div>
									<div className="flex flex-col items-center">
										<span className="font-bold">
											{userData.stats.following}
										</span>
										<span className="text-muted-foreground text-xs">
											Following
										</span>
									</div>
									<div className="flex flex-col items-center">
										<span className="font-bold">{userData.stats.reviews}</span>
										<span className="text-muted-foreground text-xs">
											Reviews
										</span>
									</div>
								</div>

								{/* Mobile-only actions */}
								<div className="flex w-full gap-2 md:hidden">
									{userData.isCurrentUser ? (
										<Button variant="outline" className="flex-1" asChild>
											<a href="/settings/profile">
												<Settings className="mr-2 h-4 w-4" />
												Edit Profile
											</a>
										</Button>
									) : (
										<>
											<Button className="flex-1">
												{userData.isFollowing ? (
													<>
														<Users className="mr-2 h-4 w-4" />
														Following
													</>
												) : (
													<>
														<UserPlus className="mr-2 h-4 w-4" />
														Follow
													</>
												)}
											</Button>
											<Button variant="outline">
												<MessageSquare className="h-4 w-4" />
											</Button>
											<Button variant="outline">
												<MoreHorizontal className="h-4 w-4" />
											</Button>
										</>
									)}
								</div>
							</div>

							<div className="flex-1">
								<div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
									<div>
										<div className="flex items-center gap-2">
											<h1 className="font-bold text-2xl">{userData.name}</h1>
											{userData.isVerified && (
												<CheckCircle className="h-5 w-5 fill-blue-500 text-blue-500" />
											)}
										</div>
										<div className="text-muted-foreground">
											@{userData.username}
										</div>
									</div>

									{/* Desktop-only actions */}
									<div className="hidden gap-2 md:flex">
										{userData.isCurrentUser ? (
											<Button variant="outline" asChild>
												<a href="/settings/profile">
													<Settings className="mr-2 h-4 w-4" />
													Edit Profile
												</a>
											</Button>
										) : (
											<>
												<Button>
													{userData.isFollowing ? (
														<>
															<Users className="mr-2 h-4 w-4" />
															Following
														</>
													) : (
														<>
															<UserPlus className="mr-2 h-4 w-4" />
															Follow
														</>
													)}
												</Button>
												<Button variant="outline">
													<MessageSquare className="mr-2 h-4 w-4" />
													Message
												</Button>
												<Button variant="outline" size="icon">
													{userData.isNotificationsEnabled ? (
														<Bell className="h-4 w-4" />
													) : (
														<BellOff className="h-4 w-4" />
													)}
												</Button>
												<Button variant="outline" size="icon">
													<Share2 className="h-4 w-4" />
												</Button>
											</>
										)}
									</div>
								</div>

								{/* Credibility score */}
								<div className="mt-4 flex items-center gap-2">
									<Badge
										variant="outline"
										className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
									>
										{userData.credibilityBadge}
									</Badge>
									<div className="flex items-center gap-1">
										<Shield className="h-4 w-4 text-primary" />
										<span className="font-medium text-sm">
											{userData.credibilityScore} Credibility
										</span>
									</div>
								</div>

								<p className="mt-4">{userData.bio}</p>

								<div className="mt-4 flex flex-col gap-2">
									{userData.location && (
										<div className="flex items-center gap-2 text-muted-foreground text-sm">
											<MapPin className="h-4 w-4" />
											<span>{userData.location}</span>
										</div>
									)}
									{userData.website && (
										<div className="flex items-center gap-2 text-sm">
											<LinkIcon className="h-4 w-4 text-muted-foreground" />
											<a
												href={userData.website}
												target="_blank"
												rel="noopener noreferrer"
												className="text-blue-600 hover:underline dark:text-blue-400"
											>
												{userData.website.replace(/^https?:\/\//, "")}
											</a>
										</div>
									)}
									<div className="flex items-center gap-2 text-muted-foreground text-sm">
										<Calendar className="h-4 w-4" />
										<span>Joined {userData.joinDate}</span>
									</div>
									<div className="flex items-center gap-2 text-muted-foreground text-sm">
										<Eye className="h-4 w-4" />
										<span>
											Last active {userData.recentActivity.lastActive}
										</span>
									</div>
								</div>

								{/* Desktop-only stats */}
								<div className="mt-4 hidden items-center gap-6 md:flex">
									<div className="flex items-center gap-1">
										<span className="font-bold">{userData.stats.posts}</span>
										<span className="text-muted-foreground">Posts</span>
									</div>
									<div className="flex items-center gap-1">
										<span className="font-bold">
											{userData.stats.followers}
										</span>
										<span className="text-muted-foreground">Followers</span>
									</div>
									<div className="flex items-center gap-1">
										<span className="font-bold">
											{userData.stats.following}
										</span>
										<span className="text-muted-foreground">Following</span>
									</div>
									<div className="flex items-center gap-1">
										<span className="font-bold">{userData.stats.reviews}</span>
										<span className="text-muted-foreground">Reviews</span>
									</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Expertise and Achievements */}
				<div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
					{/* Expertise */}
					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="flex items-center gap-2 text-lg">
								<BookOpen className="h-5 w-5" />
								Areas of Expertise
							</CardTitle>
							<CardDescription>Topics this user specializes in</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="flex flex-wrap gap-2">
								{userData.expertise.map((topic, index) => (
									<Badge key={index} variant="secondary">
										{topic}
									</Badge>
								))}
							</div>
						</CardContent>
					</Card>

					{/* Achievements */}
					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="flex items-center gap-2 text-lg">
								<Award className="h-5 w-5" />
								Achievements
							</CardTitle>
							<CardDescription>Recognition for contributions</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-3">
								{userData.achievements.map((achievement, index) => (
									<div key={index} className="flex items-center gap-2">
										<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
											{getAchievementIcon(achievement.icon)}
										</div>
										<div>
											<div className="font-medium text-sm">
												{achievement.name}
											</div>
											<div className="text-muted-foreground text-xs">
												Earned {achievement.date}
											</div>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Credibility section */}
				<Card className="mb-6">
					<CardHeader className="pb-2">
						<CardTitle className="flex items-center gap-2 text-lg">
							<BarChart3 className="h-5 w-5" />
							Credibility Overview
						</CardTitle>
						<CardDescription>
							Credibility score is based on post accuracy, source quality, and
							community feedback
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
							<div className="col-span-1 md:col-span-2">
								<CredibilityHistory history={userData.credibilityHistory} />
							</div>
							<div className="space-y-4">
								<div className="space-y-2">
									<div className="font-medium text-sm">
										Credibility Breakdown
									</div>
									<div className="space-y-3">
										<div className="space-y-1">
											<div className="flex justify-between text-sm">
												<span>Post Accuracy</span>
												<span>92%</span>
											</div>
											<div className="h-2 w-full overflow-hidden rounded-full bg-muted">
												<div
													className="h-full bg-green-500"
													style={{ width: "92%" }}
												></div>
											</div>
										</div>
										<div className="space-y-1">
											<div className="flex justify-between text-sm">
												<span>Source Quality</span>
												<span>85%</span>
											</div>
											<div className="h-2 w-full overflow-hidden rounded-full bg-muted">
												<div
													className="h-full bg-blue-500"
													style={{ width: "85%" }}
												></div>
											</div>
										</div>
										<div className="space-y-1">
											<div className="flex justify-between text-sm">
												<span>Community Rating</span>
												<span>78%</span>
											</div>
											<div className="h-2 w-full overflow-hidden rounded-full bg-muted">
												<div
													className="h-full bg-purple-500"
													style={{ width: "78%" }}
												></div>
											</div>
										</div>
									</div>
								</div>

								<div className="flex flex-wrap gap-2">
									<Badge
										variant="outline"
										className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
									>
										Trustworthy Contributor
									</Badge>
									<Badge
										variant="outline"
										className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
									>
										Source Expert
									</Badge>
									<Badge
										variant="outline"
										className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
									>
										Active Reviewer
									</Badge>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Recent Activity Summary */}
				<Card className="mb-6">
					<CardHeader className="pb-2">
						<CardTitle className="flex items-center gap-2 text-lg">
							<FileText className="h-5 w-5" />
							Recent Activity
						</CardTitle>
						<CardDescription>Summary of recent contributions</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
							<div className="rounded-lg bg-muted/50 p-4 text-center">
								<div className="font-bold text-3xl">
									{userData.recentActivity.postsThisWeek}
								</div>
								<div className="text-muted-foreground text-sm">
									Posts this week
								</div>
							</div>
							<div className="rounded-lg bg-muted/50 p-4 text-center">
								<div className="font-bold text-3xl">
									{userData.recentActivity.reviewsThisWeek}
								</div>
								<div className="text-muted-foreground text-sm">
									Reviews this week
								</div>
							</div>
							<div className="rounded-lg bg-muted/50 p-4 text-center">
								<div className="font-bold text-3xl">
									{userData.credibilityHistory.length >= 2 ? (
										userData.credibilityScore -
											userData.credibilityHistory[
												userData.credibilityHistory.length - 2
											]! >
										0
											? "+" +
											  (userData.credibilityScore -
													userData.credibilityHistory[
														userData.credibilityHistory.length - 2
													]!)
											: userData.credibilityScore -
											  userData.credibilityHistory[
													userData.credibilityHistory.length - 2
											  ]!
									) : (
										"0"
									)}
								</div>
								<div className="text-muted-foreground text-sm">
									Credibility change
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Content tabs */}
				<Tabs defaultValue="posts" className="w-full">
					<TabsList className="grid w-full grid-cols-4">
						<TabsTrigger value="posts">Posts</TabsTrigger>
						<TabsTrigger value="comments">Comments</TabsTrigger>
						<TabsTrigger value="reviews">Reviews</TabsTrigger>
						<TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
					</TabsList>

					<TabsContent value="posts" className="mt-6">
						<UserPosts username={username} />
					</TabsContent>

					<TabsContent value="comments" className="mt-6">
						<UserComments username={username} />
					</TabsContent>

					<TabsContent value="reviews" className="mt-6">
						<UserReviews username={username} />
					</TabsContent>

					<TabsContent value="bookmarks" className="mt-6">
						<UserBookmarks username={username} />
					</TabsContent>
				</Tabs>
			</main>
		</div>
	);
}
