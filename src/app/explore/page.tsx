import Header from "@/components/header";
import NewsPost from "@/components/news-post";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
	CheckCircle,
	Clock,
	Filter,
	Hash,
	MapPin,
	Newspaper,
	Search,
	TrendingUp,
	Users,
} from "lucide-react";

export default function ExplorePage() {
	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main className="container mx-auto max-w-6xl px-4 py-6">
				{/* Search and filter section */}
				<div className="mb-8">
					<h1 className="mb-4 font-bold text-2xl">Explore</h1>
					<div className="flex flex-col gap-4 md:flex-row">
						<div className="relative flex-1">
							<Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Search news, topics, or users"
								className="pl-10"
							/>
						</div>
						<div className="flex gap-2">
							<Select defaultValue="all">
								<SelectTrigger className="w-[160px]">
									<SelectValue placeholder="Credibility" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Content</SelectItem>
									<SelectItem value="verified">Verified Only</SelectItem>
									<SelectItem value="unverified">Unverified</SelectItem>
									<SelectItem value="disputed">Disputed</SelectItem>
								</SelectContent>
							</Select>
							<Select defaultValue="recent">
								<SelectTrigger className="w-[160px]">
									<SelectValue placeholder="Sort By" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="recent">Most Recent</SelectItem>
									<SelectItem value="trending">Trending</SelectItem>
									<SelectItem value="relevant">Most Relevant</SelectItem>
								</SelectContent>
							</Select>
							<Button variant="outline" size="icon">
								<Filter className="h-4 w-4" />
							</Button>
						</div>
					</div>
				</div>

				{/* Main content */}
				<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
					{/* Left column - Categories and filters */}
					<div className="space-y-6">
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="font-medium text-base">
									Explore By
								</CardTitle>
							</CardHeader>
							<CardContent className="pt-0">
								<div className="space-y-1">
									<Button
										variant="ghost"
										className="w-full justify-start"
										size="sm"
									>
										<TrendingUp className="mr-2 h-4 w-4" />
										Trending Now
									</Button>
									<Button
										variant="ghost"
										className="w-full justify-start"
										size="sm"
									>
										<Hash className="mr-2 h-4 w-4" />
										Topics
									</Button>
									<Button
										variant="ghost"
										className="w-full justify-start"
										size="sm"
									>
										<Users className="mr-2 h-4 w-4" />
										People to Follow
									</Button>
									<Button
										variant="ghost"
										className="w-full justify-start"
										size="sm"
									>
										<Newspaper className="mr-2 h-4 w-4" />
										News Sources
									</Button>
									<Button
										variant="ghost"
										className="w-full justify-start"
										size="sm"
									>
										<MapPin className="mr-2 h-4 w-4" />
										Local News
									</Button>
									<Button
										variant="ghost"
										className="w-full justify-start"
										size="sm"
									>
										<Clock className="mr-2 h-4 w-4" />
										Recently Viewed
									</Button>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="font-medium text-base">
									Filter By Tags
								</CardTitle>
							</CardHeader>
							<CardContent className="pt-0">
								<div className="flex flex-wrap gap-2">
									<Badge
										variant="outline"
										className="cursor-pointer hover:bg-accent"
									>
										Politics
									</Badge>
									<Badge
										variant="outline"
										className="cursor-pointer hover:bg-accent"
									>
										Technology
									</Badge>
									<Badge
										variant="outline"
										className="cursor-pointer hover:bg-accent"
									>
										Health
									</Badge>
									<Badge
										variant="outline"
										className="cursor-pointer hover:bg-accent"
									>
										Science
									</Badge>
									<Badge
										variant="outline"
										className="cursor-pointer hover:bg-accent"
									>
										Business
									</Badge>
									<Badge
										variant="outline"
										className="cursor-pointer hover:bg-accent"
									>
										Entertainment
									</Badge>
									<Badge
										variant="outline"
										className="cursor-pointer hover:bg-accent"
									>
										Sports
									</Badge>
									<Badge
										variant="outline"
										className="cursor-pointer hover:bg-accent"
									>
										Environment
									</Badge>
									<Badge
										variant="outline"
										className="cursor-pointer hover:bg-accent"
									>
										Education
									</Badge>
									<Badge
										variant="outline"
										className="cursor-pointer hover:bg-accent"
									>
										Culture
									</Badge>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="font-medium text-base">
									Filter By Location
								</CardTitle>
							</CardHeader>
							<CardContent className="pt-0">
								<div className="space-y-2">
									<div className="relative">
										<MapPin className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
										<Input placeholder="Enter location" className="pl-10" />
									</div>
									<div className="mt-2 flex flex-wrap gap-2">
										<Badge
											variant="outline"
											className="cursor-pointer hover:bg-accent"
										>
											Global
										</Badge>
										<Badge
											variant="outline"
											className="cursor-pointer hover:bg-accent"
										>
											North America
										</Badge>
										<Badge
											variant="outline"
											className="cursor-pointer hover:bg-accent"
										>
											Europe
										</Badge>
										<Badge
											variant="outline"
											className="cursor-pointer hover:bg-accent"
										>
											Asia
										</Badge>
										<Badge
											variant="outline"
											className="cursor-pointer hover:bg-accent"
										>
											Africa
										</Badge>
										<Badge
											variant="outline"
											className="cursor-pointer hover:bg-accent"
										>
											South America
										</Badge>
										<Badge
											variant="outline"
											className="cursor-pointer hover:bg-accent"
										>
											Australia
										</Badge>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Middle column - Content tabs */}
					<div className="space-y-6 lg:col-span-2">
						<Tabs defaultValue="trending" className="w-full">
							<TabsList className="grid w-full grid-cols-3">
								<TabsTrigger value="trending">Trending</TabsTrigger>
								<TabsTrigger value="latest">Latest</TabsTrigger>
								<TabsTrigger value="verified">Verified</TabsTrigger>
							</TabsList>

							<TabsContent value="trending" className="mt-4 space-y-4">
								<NewsPost
									user={{
										name: "Global Affairs",
										handle: "@globalaffairs",
										avatar: "/placeholder.svg?height=40&width=40",
										isVerified: true,
										credibilityScore: 94,
									}}
									content="BREAKING: International summit on climate change reaches historic agreement. All major economies commit to 50% emissions reduction by 2035."
									timestamp="1 hour ago"
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
									timestamp="3 hours ago"
									credibilityTag="unverified"
									reviewCount={187}
									commentCount={76}
									sources={["https://example.com/energy-breakthrough"]}
								/>

								<NewsPost
									user={{
										name: "Market Watch",
										handle: "@marketwatch",
										avatar: "/placeholder.svg?height=40&width=40",
										isVerified: true,
										credibilityScore: 88,
									}}
									content="Global markets respond positively to new trade agreement between major economies. Tech and manufacturing sectors see biggest gains."
									timestamp="5 hours ago"
									credibilityTag="true"
									reviewCount={156}
									commentCount={42}
									sources={["https://example.com/market-response"]}
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
									timestamp="6 hours ago"
									credibilityTag="misleading"
									reviewCount={231}
									commentCount={98}
									sources={["https://example.com/diet-claims"]}
								/>
							</TabsContent>

							<TabsContent value="latest" className="mt-4 space-y-4">
								<NewsPost
									user={{
										name: "Tech Insider",
										handle: "@techinsider",
										avatar: "/placeholder.svg?height=40&width=40",
										isVerified: true,
										credibilityScore: 89,
									}}
									content="Major tech company announces revolutionary AI assistant that can understand and respond to complex human emotions."
									timestamp="30 minutes ago"
									credibilityTag="unverified"
									reviewCount={78}
									commentCount={34}
									sources={["https://example.com/ai-assistant"]}
								/>

								<NewsPost
									user={{
										name: "Education News",
										handle: "@educationnews",
										avatar: "/placeholder.svg?height=40&width=40",
										isVerified: true,
										credibilityScore: 90,
									}}
									content="National education reform bill passes with bipartisan support. Changes include increased funding for STEM programs and teacher salaries."
									timestamp="1 hour ago"
									credibilityTag="true"
									reviewCount={112}
									commentCount={45}
									sources={["https://example.com/education-reform"]}
								/>

								<NewsPost
									user={{
										name: "Sports Central",
										handle: "@sportscentral",
										avatar: "/placeholder.svg?height=40&width=40",
										isVerified: true,
										credibilityScore: 87,
									}}
									content="Championship finals set after dramatic semifinal matches. Underdog team advances after upset victory against tournament favorites."
									timestamp="2 hours ago"
									credibilityTag="true"
									reviewCount={203}
									commentCount={89}
									sources={["https://example.com/championship-finals"]}
									hasMedia={true}
								/>
							</TabsContent>

							<TabsContent value="verified" className="mt-4 space-y-4">
								<div className="mb-4 flex items-center justify-between">
									<div className="flex items-center gap-2">
										<CheckCircle className="h-5 w-5 text-green-600" />
										<h3 className="font-medium">Verified by fact-checkers</h3>
									</div>
									<Select defaultValue="all">
										<SelectTrigger className="w-[160px]">
											<SelectValue placeholder="All Sources" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="all">All Sources</SelectItem>
											<SelectItem value="official">Official Sources</SelectItem>
											<SelectItem value="community">
												Community Verified
											</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<NewsPost
									user={{
										name: "Science Journal",
										handle: "@sciencejournal",
										avatar: "/placeholder.svg?height=40&width=40",
										isVerified: true,
										credibilityScore: 95,
									}}
									content="New research confirms effectiveness of latest vaccine against multiple variants. Clinical trials show 94% efficacy rate with minimal side effects."
									timestamp="4 hours ago"
									credibilityTag="true"
									reviewCount={267}
									commentCount={83}
									sources={["https://example.com/vaccine-research"]}
								/>

								<NewsPost
									user={{
										name: "Policy Watch",
										handle: "@policywatch",
										avatar: "/placeholder.svg?height=40&width=40",
										isVerified: true,
										credibilityScore: 93,
									}}
									content="Government announces new infrastructure plan with $1.2 trillion investment over 10 years. Focus on renewable energy, transportation, and digital infrastructure."
									timestamp="7 hours ago"
									credibilityTag="true"
									reviewCount={189}
									commentCount={67}
									sources={["https://example.com/infrastructure-plan"]}
								/>

								<NewsPost
									user={{
										name: "Environmental Report",
										handle: "@envreport",
										avatar: "/placeholder.svg?height=40&width=40",
										isVerified: true,
										credibilityScore: 92,
									}}
									content="Ocean cleanup initiative removes 50,000 tons of plastic from Pacific garbage patch. Technology could be scaled to address global ocean pollution."
									timestamp="9 hours ago"
									credibilityTag="true"
									reviewCount={231}
									commentCount={94}
									sources={["https://example.com/ocean-cleanup"]}
									hasMedia={true}
								/>
							</TabsContent>
						</Tabs>

						{/* Suggested users to follow */}
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="flex items-center font-medium text-base">
									<Users className="mr-2 h-4 w-4" />
									Suggested Users to Follow
								</CardTitle>
							</CardHeader>
							<CardContent className="pt-0">
								<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
									{[1, 2, 3, 4].map((i) => (
										<div key={i} className="flex items-center justify-between">
											<div className="flex items-center gap-2">
												<Avatar>
													<AvatarImage
														src={`/placeholder.svg?height=40&width=40&text=U${i}`}
														alt="User"
													/>
													<AvatarFallback>U{i}</AvatarFallback>
												</Avatar>
												<div>
													<div className="flex items-center gap-1">
														<span className="font-medium">User Name {i}</span>
														{i % 2 === 0 && (
															<CheckCircle className="h-3.5 w-3.5 fill-blue-500 text-blue-500" />
														)}
													</div>
													<div className="text-muted-foreground text-xs">
														@username{i} • {85 + i} credibility
													</div>
												</div>
											</div>
											<Button size="sm" variant="outline">
												Follow
											</Button>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</main>
		</div>
	);
}
