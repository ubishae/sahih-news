import EmptyState from "@/components/empty-state";
import Header from "@/components/header";
import NewsPost from "@/components/news-post";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	AlertTriangle,
	Bookmark,
	CheckCircle,
	Clock,
	Filter,
	FolderPlus,
	Plus,
	Search,
	Trash2,
} from "lucide-react";

export default function BookmarksPage() {
	// Sample bookmarks data - in a real app, this would come from an API or state
	const hasBookmarks = true;

	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main className="container mx-auto max-w-4xl px-4 py-6">
				<div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
					<div>
						<h1 className="font-bold text-2xl">Bookmarks</h1>
						<p className="text-muted-foreground">Your saved news and stories</p>
					</div>
					<div className="flex gap-2">
						<Button variant="outline" size="sm">
							<FolderPlus className="mr-2 h-4 w-4" />
							New Collection
						</Button>
						<Select defaultValue="all">
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="All Bookmarks" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Bookmarks</SelectItem>
								<SelectItem value="verified">Verified Only</SelectItem>
								<SelectItem value="unread">Unread</SelectItem>
								<SelectItem value="read">Read</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				{/* Search and filter */}
				<div className="mb-6 flex flex-col gap-4 md:flex-row">
					<div className="relative flex-1">
						<Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
						<Input placeholder="Search your bookmarks" className="pl-10" />
					</div>
					<Button variant="outline" size="icon">
						<Filter className="h-4 w-4" />
					</Button>
				</div>

				{/* Collections tabs */}
				<Tabs defaultValue="all" className="mb-6 w-full">
					<TabsList className="mb-4 w-full flex-nowrap justify-start overflow-x-auto">
						<TabsTrigger value="all" className="flex items-center">
							<Bookmark className="mr-2 h-4 w-4" />
							All Bookmarks
						</TabsTrigger>
						<TabsTrigger value="read-later" className="flex items-center">
							<Clock className="mr-2 h-4 w-4" />
							Read Later
						</TabsTrigger>
						<TabsTrigger value="fact-checked" className="flex items-center">
							<CheckCircle className="mr-2 h-4 w-4" />
							Fact-Checked
						</TabsTrigger>
						<TabsTrigger value="research" className="flex items-center">
							<AlertTriangle className="mr-2 h-4 w-4" />
							Research
						</TabsTrigger>
						<TabsTrigger value="new" className="flex items-center">
							<Plus className="mr-2 h-4 w-4" />
							Add Collection
						</TabsTrigger>
					</TabsList>

					{hasBookmarks ? (
						<>
							<TabsContent value="all" className="space-y-4">
								<div className="mb-2 flex items-center justify-between">
									<div className="text-muted-foreground text-sm">
										12 bookmarks
									</div>
									<Select defaultValue="recent">
										<SelectTrigger className="w-[150px]">
											<SelectValue placeholder="Sort By" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="recent">Most Recent</SelectItem>
											<SelectItem value="oldest">Oldest First</SelectItem>
											<SelectItem value="credibility">
												Highest Credibility
											</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<NewsPost
									user={{
										name: "Global Affairs",
										handle: "@globalaffairs",
										avatar: "/placeholder.svg?height=40&width=40",
										isVerified: true,
										credibilityScore: 94,
									}}
									content="BREAKING: International summit on climate change reaches historic agreement. All major economies commit to 50% emissions reduction by 2035."
									timestamp="Saved 2 hours ago"
									credibilityTag="true"
									reviewCount={342}
									commentCount={128}
									sources={["https://example.com/climate-summit"]}
									hasMedia={true}
								/>

								<NewsPost
									user={{
										name: "Science Today",
										handle: "@sciencetoday",
										avatar: "/placeholder.svg?height=40&width=40",
										isVerified: true,
										credibilityScore: 91,
									}}
									content="Scientists discover potential breakthrough in renewable energy storage. New material could store solar energy for months without degradation."
									timestamp="Saved yesterday"
									credibilityTag="unverified"
									reviewCount={187}
									commentCount={76}
									sources={["https://example.com/energy-breakthrough"]}
								/>

								<NewsPost
									user={{
										name: "Health Insights",
										handle: "@healthinsights",
										avatar: "/placeholder.svg?height=40&width=40",
										isVerified: false,
										credibilityScore: 72,
									}}
									content="New diet claims to reverse aging process and extend lifespan by up to 20 years. Experts remain skeptical about extraordinary claims."
									timestamp="Saved 3 days ago"
									credibilityTag="misleading"
									reviewCount={231}
									commentCount={98}
									sources={["https://example.com/diet-claims"]}
								/>

								<NewsPost
									user={{
										name: "Tech Insider",
										handle: "@techinsider",
										avatar: "/placeholder.svg?height=40&width=40",
										isVerified: true,
										credibilityScore: 89,
									}}
									content="Major tech company announces revolutionary AI assistant that can understand and respond to complex human emotions."
									timestamp="Saved 5 days ago"
									credibilityTag="unverified"
									reviewCount={78}
									commentCount={34}
									sources={["https://example.com/ai-assistant"]}
								/>
							</TabsContent>

							<TabsContent value="read-later" className="space-y-4">
								<div className="mb-2 flex items-center justify-between">
									<div className="text-muted-foreground text-sm">
										5 bookmarks
									</div>
									<Select defaultValue="recent">
										<SelectTrigger className="w-[150px]">
											<SelectValue placeholder="Sort By" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="recent">Most Recent</SelectItem>
											<SelectItem value="oldest">Oldest First</SelectItem>
											<SelectItem value="credibility">
												Highest Credibility
											</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<NewsPost
									user={{
										name: "Science Today",
										handle: "@sciencetoday",
										avatar: "/placeholder.svg?height=40&width=40",
										isVerified: true,
										credibilityScore: 91,
									}}
									content="Scientists discover potential breakthrough in renewable energy storage. New material could store solar energy for months without degradation."
									timestamp="Saved yesterday"
									credibilityTag="unverified"
									reviewCount={187}
									commentCount={76}
									sources={["https://example.com/energy-breakthrough"]}
								/>

								<NewsPost
									user={{
										name: "Tech Insider",
										handle: "@techinsider",
										avatar: "/placeholder.svg?height=40&width=40",
										isVerified: true,
										credibilityScore: 89,
									}}
									content="Major tech company announces revolutionary AI assistant that can understand and respond to complex human emotions."
									timestamp="Saved 5 days ago"
									credibilityTag="unverified"
									reviewCount={78}
									commentCount={34}
									sources={["https://example.com/ai-assistant"]}
								/>
							</TabsContent>

							<TabsContent value="fact-checked" className="space-y-4">
								<div className="mb-2 flex items-center justify-between">
									<div className="text-muted-foreground text-sm">
										3 bookmarks
									</div>
									<Select defaultValue="recent">
										<SelectTrigger className="w-[150px]">
											<SelectValue placeholder="Sort By" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="recent">Most Recent</SelectItem>
											<SelectItem value="oldest">Oldest First</SelectItem>
											<SelectItem value="credibility">
												Highest Credibility
											</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<NewsPost
									user={{
										name: "Global Affairs",
										handle: "@globalaffairs",
										avatar: "/placeholder.svg?height=40&width=40",
										isVerified: true,
										credibilityScore: 94,
									}}
									content="BREAKING: International summit on climate change reaches historic agreement. All major economies commit to 50% emissions reduction by 2035."
									timestamp="Saved 2 hours ago"
									credibilityTag="true"
									reviewCount={342}
									commentCount={128}
									sources={["https://example.com/climate-summit"]}
									hasMedia={true}
								/>
							</TabsContent>

							<TabsContent value="research" className="space-y-4">
								<div className="mb-2 flex items-center justify-between">
									<div className="text-muted-foreground text-sm">
										4 bookmarks
									</div>
									<Select defaultValue="recent">
										<SelectTrigger className="w-[150px]">
											<SelectValue placeholder="Sort By" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="recent">Most Recent</SelectItem>
											<SelectItem value="oldest">Oldest First</SelectItem>
											<SelectItem value="credibility">
												Highest Credibility
											</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<NewsPost
									user={{
										name: "Health Insights",
										handle: "@healthinsights",
										avatar: "/placeholder.svg?height=40&width=40",
										isVerified: false,
										credibilityScore: 72,
									}}
									content="New diet claims to reverse aging process and extend lifespan by up to 20 years. Experts remain skeptical about extraordinary claims."
									timestamp="Saved 3 days ago"
									credibilityTag="misleading"
									reviewCount={231}
									commentCount={98}
									sources={["https://example.com/diet-claims"]}
								/>
							</TabsContent>

							<TabsContent value="new">
								<Card>
									<CardContent className="pt-6">
										<div className="flex flex-col items-center justify-center space-y-4 p-6 text-center">
											<FolderPlus className="h-12 w-12 text-muted-foreground" />
											<h3 className="font-medium text-lg">
												Create a New Collection
											</h3>
											<p className="max-w-md text-muted-foreground">
												Organize your bookmarks into collections for easier
												access and better organization.
											</p>
											<div className="w-full max-w-sm space-y-4">
												<Input placeholder="Collection Name" />
												<Select defaultValue="public">
													<SelectTrigger>
														<SelectValue placeholder="Visibility" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="public">Public</SelectItem>
														<SelectItem value="private">Private</SelectItem>
													</SelectContent>
												</Select>
												<Button className="w-full">Create Collection</Button>
											</div>
										</div>
									</CardContent>
								</Card>
							</TabsContent>
						</>
					) : (
						<EmptyState
							icon={<Bookmark className="h-12 w-12 text-muted-foreground" />}
							title="No bookmarks yet"
							description="Save news and stories to read later by clicking the bookmark icon on any post."
							action={<Button>Browse News</Button>}
						/>
					)}
				</Tabs>

				{/* Bookmark management */}
				{hasBookmarks && (
					<Card className="mb-6">
						<CardHeader className="pb-2">
							<CardTitle className="font-medium text-base">
								Manage Bookmarks
							</CardTitle>
						</CardHeader>
						<CardContent className="pt-0">
							<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
								<Button
									variant="outline"
									className="flex items-center justify-center"
								>
									<Trash2 className="mr-2 h-4 w-4" />
									Clear Read Items
								</Button>
								<Button
									variant="outline"
									className="flex items-center justify-center"
								>
									<CheckCircle className="mr-2 h-4 w-4" />
									Mark All as Read
								</Button>
								<Button
									variant="outline"
									className="flex items-center justify-center"
								>
									<FolderPlus className="mr-2 h-4 w-4" />
									Export Bookmarks
								</Button>
							</div>
						</CardContent>
					</Card>
				)}

				{/* Recently viewed */}
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="flex items-center font-medium text-base">
							<Clock className="mr-2 h-4 w-4" />
							Recently Viewed
						</CardTitle>
					</CardHeader>
					<CardContent className="pt-0">
						<div className="space-y-3">
							{[1, 2, 3].map((i) => (
								<div
									key={i}
									className="flex items-start gap-3 border-b pb-3 last:border-0"
								>
									<div className="h-16 w-16 flex-shrink-0 rounded-md bg-muted">
										<img
											src={`/placeholder.svg?height=64&width=64&text=${i}`}
											alt="News thumbnail"
											className="h-full w-full rounded-md object-cover"
										/>
									</div>
									<div>
										<h4 className="line-clamp-2 font-medium text-sm">
											{i === 1
												? "Climate policy implementation begins with industry leaders"
												: i === 2
													? "Tech innovation award winners announced at annual conference"
													: "Healthcare reform bill passes with bipartisan support"}
										</h4>
										<div className="mt-1 flex items-center gap-2">
											<Badge variant="outline" className="text-xs">
												{i === 1
													? "Environment"
													: i === 2
														? "Technology"
														: "Health"}
											</Badge>
											<span className="text-muted-foreground text-xs">
												Viewed {i === 1 ? "2h" : i === 2 ? "5h" : "1d"} ago
											</span>
										</div>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</main>
		</div>
	);
}
