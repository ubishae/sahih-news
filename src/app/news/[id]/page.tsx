import CommentSection from "@/components/comment-section";
import CredibilityChart from "@/components/credibility-chart";
import FactCheckSummary from "@/components/fact-check-summary";
import Header from "@/components/header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	AlertCircle,
	ArrowLeft,
	BarChart3,
	Bookmark,
	CheckCircle,
	ExternalLink,
	Eye,
	Flag,
	HelpCircle,
	LinkIcon,
	MessageSquare,
	Share2,
	ThumbsDown,
	ThumbsUp,
	XCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

interface NewsPageProps {
	params: Promise<{
		id: string;
	}>;
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function NewsPage({ params }: NewsPageProps) {
	// In a real app, we would fetch the news data based on the ID
	const resolvedParams = await params;
	const newsId = resolvedParams.id;

	// Sample news data
	const newsItem = {
		id: newsId,
		title: "International summit on climate change reaches historic agreement",
		content: `
      <p>In a landmark decision that could reshape global climate policy for decades to come, world leaders at the International Climate Summit have reached a historic agreement to reduce carbon emissions by 50% by 2035.</p>
      
      <p>The agreement, which was signed by representatives from 195 countries, includes binding commitments for both developed and developing nations, with financial mechanisms to support countries that may struggle with the transition to cleaner energy sources.</p>
      
      <p>"This is a turning point in our fight against climate change," said UN Secretary-General in his closing remarks. "For the first time, we have universal agreement on both the urgency of the problem and the scale of action required."</p>
      
      <p>Key provisions of the agreement include:</p>
      <ul>
        <li>50% reduction in carbon emissions by 2035 compared to 2020 levels</li>
        <li>Creation of a $100 billion annual fund to help developing nations</li>
        <li>Phasing out of coal power in developed nations by 2030</li>
        <li>Mandatory carbon pricing mechanisms to be implemented by 2025</li>
      </ul>
      
      <p>Environmental groups have largely praised the agreement, though some activists argue that the targets should be more ambitious given the accelerating pace of climate change.</p>
      
      <p>Implementation will begin immediately, with countries required to submit detailed action plans within six months.</p>
    `,
		timestamp: "2 hours ago",
		credibilityTag: "true",
		reviewCount: 342,
		commentCount: 128,
		viewCount: 2547,
		sources: [
			{
				url: "https://example.com/un-climate-summit",
				title: "UN Climate Summit Official Statement",
			},
			{
				url: "https://example.com/climate-agreement-analysis",
				title: "Climate Policy Institute Analysis",
			},
			{
				url: "https://example.com/emissions-data",
				title: "Global Emissions Database",
			},
		],
		media: [
			{
				type: "image",
				url: "/placeholder.svg?height=400&width=800",
				caption:
					"World leaders at the signing ceremony of the climate agreement",
			},
		],
		user: {
			name: "Global Affairs",
			handle: "@globalaffairs",
			avatar: "/placeholder.svg?height=40&width=40",
			isVerified: true,
			credibilityScore: 94,
			bio: "Covering international politics, diplomacy, and global issues. Verified journalist with 15+ years experience.",
		},
		credibilityBreakdown: {
			accurate: 312,
			inaccurate: 30,
			factCheckerVerified: true,
			aiAssistance: "Content verified against multiple trusted sources",
			communityConsensus: 91, // percentage
		},
		tags: ["Climate", "Environment", "Politics", "International", "UN"],
		relatedNews: [
			{
				id: "2",
				title: "Environmental groups respond to climate agreement",
				credibilityTag: "true",
				user: {
					name: "Environment Today",
					handle: "@envtoday",
					avatar: "/placeholder.svg?height=40&width=40",
					isVerified: true,
					credibilityScore: 89,
				},
			},
			{
				id: "3",
				title: "Analysis: Economic impact of the new climate agreement",
				credibilityTag: "unverified",
				user: {
					name: "Economic Insights",
					handle: "@econinsights",
					avatar: "/placeholder.svg?height=40&width=40",
					isVerified: false,
					credibilityScore: 82,
				},
			},
			{
				id: "4",
				title: "Opinion: Climate agreement doesn't go far enough",
				credibilityTag: "misleading",
				user: {
					name: "Climate Activist",
					handle: "@climateact",
					avatar: "/placeholder.svg?height=40&width=40",
					isVerified: false,
					credibilityScore: 75,
				},
			},
		],
	};

	const getCredibilityBadge = (tag: string) => {
		switch (tag) {
			case "true":
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
			<main className="container mx-auto max-w-4xl px-4 py-6">
				{/* Back button */}
				<div className="mb-4">
					<Button variant="ghost" size="sm" asChild>
						<Link href="/" className="flex items-center gap-1">
							<ArrowLeft className="h-4 w-4" />
							Back to feed
						</Link>
					</Button>
				</div>

				{/* News header */}
				<div className="mb-6">
					<div className="mb-2 flex items-center gap-2">
						{newsItem.tags.map((tag, index) => (
							<Badge key={index} variant="secondary" className="rounded-full">
								{tag}
							</Badge>
						))}
					</div>
					<h1 className="mb-4 font-bold text-2xl md:text-3xl lg:text-4xl">
						{newsItem.title}
					</h1>
					<div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
						<div className="flex items-center gap-3">
							<Avatar>
								<AvatarImage
									src={newsItem.user.avatar}
									alt={newsItem.user.name}
								/>
								<AvatarFallback>{newsItem.user.name.charAt(0)}</AvatarFallback>
							</Avatar>
							<div>
								<div className="flex items-center gap-1">
									<span className="font-medium">{newsItem.user.name}</span>
									{newsItem.user.isVerified && (
										<CheckCircle className="h-3.5 w-3.5 fill-blue-500 text-blue-500" />
									)}
								</div>
								<div className="flex items-center gap-1 text-muted-foreground text-sm">
									<span>{newsItem.user.handle}</span>
									<span>•</span>
									<span>{newsItem.timestamp}</span>
									<span>•</span>
									<span className="rounded-full bg-muted px-1.5 py-0.5 text-xs">
										{newsItem.user.credibilityScore}
									</span>
								</div>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<div className="flex items-center gap-1 text-muted-foreground text-sm">
								<Eye className="h-4 w-4" />
								<span>{newsItem.viewCount} views</span>
							</div>
							<div className="flex items-center gap-2">
								{getCredibilityBadge(newsItem.credibilityTag as string)}
								<span className="text-muted-foreground text-xs">
									{newsItem.reviewCount} reviews
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* News content */}
				<Card className="mb-8">
					<CardContent className="p-6">
						{newsItem.media && newsItem.media.length > 0 && (
							<div className="mb-6 overflow-hidden rounded-lg">
								<Image
									src={newsItem.media[0]?.url || "/placeholder.svg"}
									alt={newsItem.media[0]?.caption || "News media"}
									width={800}
									height={400}
									className="w-full object-cover"
								/>
								{newsItem.media[0]?.caption && (
									<p className="mt-2 text-muted-foreground text-sm italic">
										{newsItem.media[0].caption}
									</p>
								)}
							</div>
						)}

						<div className="prose dark:prose-invert max-w-none">
							<ReactMarkdown>{newsItem.content}</ReactMarkdown>
						</div>

						<div className="mt-6 border-t pt-6">
							<h3 className="mb-2 font-medium text-lg">Sources</h3>
							<ul className="space-y-2">
								{newsItem.sources.map((source, index) => (
									<li key={index}>
										<Link
											href={source.url}
											className="flex items-center gap-1 text-blue-600 text-sm hover:underline dark:text-blue-400"
											target="_blank"
											rel="noopener noreferrer"
										>
											<LinkIcon className="h-3 w-3" />
											<span>{source.title}</span>
											<ExternalLink className="ml-1 h-3 w-3" />
										</Link>
									</li>
								))}
							</ul>
						</div>
					</CardContent>
				</Card>

				{/* Action buttons */}
				<div className="mb-8 flex flex-wrap items-center justify-between gap-4">
					<div className="flex items-center gap-2">
						<Button variant="outline" className="flex items-center gap-1">
							<ThumbsUp className="h-4 w-4" />
							<span>Accurate ({newsItem.credibilityBreakdown.accurate})</span>
						</Button>
						<Button variant="outline" className="flex items-center gap-1">
							<ThumbsDown className="h-4 w-4" />
							<span>
								Inaccurate ({newsItem.credibilityBreakdown.inaccurate})
							</span>
						</Button>
					</div>
					<div className="flex items-center gap-2">
						<Button variant="outline" className="flex items-center gap-1">
							<MessageSquare className="h-4 w-4" />
							<span>Comment</span>
						</Button>
						<Button variant="outline" className="flex items-center gap-1">
							<Share2 className="h-4 w-4" />
							<span>Share</span>
						</Button>
						<Button variant="outline" className="flex items-center gap-1">
							<Bookmark className="h-4 w-4" />
							<span>Save</span>
						</Button>
						<Button variant="outline" className="flex items-center gap-1">
							<Flag className="h-4 w-4" />
							<span>Report</span>
						</Button>
					</div>
				</div>

				{/* Credibility and comments tabs */}
				<Tabs defaultValue="credibility" className="mb-8">
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="credibility">
							Credibility & Fact Check
						</TabsTrigger>
						<TabsTrigger value="comments">
							Comments ({newsItem.commentCount})
						</TabsTrigger>
					</TabsList>

					<TabsContent value="credibility" className="mt-4 space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-lg">
									<BarChart3 className="h-5 w-5" />
									Credibility Analysis
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid gap-6 md:grid-cols-2">
									<div>
										<h4 className="mb-2 font-medium">Community Consensus</h4>
										<CredibilityChart
											accurate={newsItem.credibilityBreakdown.accurate}
											inaccurate={newsItem.credibilityBreakdown.inaccurate}
											consensusPercentage={
												newsItem.credibilityBreakdown.communityConsensus
											}
										/>
									</div>
									<div className="space-y-4">
										<div>
											<h4 className="mb-2 font-medium">Verification Status</h4>
											<div className="space-y-2">
												<div className="flex items-center gap-2">
													{newsItem.credibilityBreakdown.factCheckerVerified ? (
														<Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
															Fact-Checker Verified
														</Badge>
													) : (
														<Badge variant="outline">Awaiting Fact-Check</Badge>
													)}
												</div>
												<p className="text-muted-foreground text-sm">
													This content has been reviewed by professional
													fact-checkers and found to be accurate based on
													available evidence.
												</p>
											</div>
										</div>

										<div>
											<h4 className="mb-2 font-medium">
												AI-Assisted Verification
											</h4>
											<p className="text-muted-foreground text-sm">
												{newsItem.credibilityBreakdown.aiAssistance}
											</p>
										</div>

										<div>
											<h4 className="mb-2 font-medium">Source Credibility</h4>
											<div className="space-y-1">
												{newsItem.sources.map((source, index) => (
													<div key={index} className="flex items-center gap-2">
														<CheckCircle className="h-4 w-4 text-green-600" />
														<span className="text-sm">{source.title}</span>
													</div>
												))}
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						<FactCheckSummary
							verdict="true"
							summary="This news item accurately reports the details of the international climate agreement as confirmed by official sources."
							factChecker={{
								name: "Climate Facts Institute",
								credibilityScore: 96,
								verifiedDate: "2 hours ago",
							}}
							keyPoints={[
								"The agreement was signed by 195 countries as reported",
								"The 50% emissions reduction target by 2035 is accurately stated",
								"The $100 billion fund is confirmed by official UN documents",
								"The coal phase-out timeline matches the official agreement",
							]}
						/>
					</TabsContent>

					<TabsContent value="comments" className="mt-4">
						<CommentSection newsId={newsId} />
					</TabsContent>
				</Tabs>

				{/* Author info */}
				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-lg">About the Author</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex flex-col gap-4 sm:flex-row">
							<Avatar className="h-16 w-16">
								<AvatarImage
									src={newsItem.user.avatar}
									alt={newsItem.user.name}
								/>
								<AvatarFallback>{newsItem.user.name.charAt(0)}</AvatarFallback>
							</Avatar>
							<div className="space-y-2">
								<div className="flex items-center gap-2">
									<h3 className="font-bold text-lg">{newsItem.user.name}</h3>
									{newsItem.user.isVerified && (
										<CheckCircle className="h-4 w-4 fill-blue-500 text-blue-500" />
									)}
								</div>
								<p className="text-muted-foreground text-sm">
									{newsItem.user.handle}
								</p>
								<p>{newsItem.user.bio}</p>
								<div className="mt-2 flex items-center gap-2">
									<Badge variant="outline" className="bg-muted">
										Credibility: {newsItem.user.credibilityScore}
									</Badge>
									<Button size="sm" variant="outline">
										Follow
									</Button>
									<Button size="sm" variant="outline">
										View Profile
									</Button>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Related news */}
				<div className="mb-8">
					<h2 className="mb-4 font-bold text-xl">Related News</h2>
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{newsItem.relatedNews.map((item) => (
							<Card key={item.id} className="overflow-hidden">
								<div className="h-40 bg-muted">
									<Image
										src="/placeholder.svg?height=160&width=320"
										alt={item.title}
										width={320}
										height={160}
										className="h-full w-full object-cover"
									/>
								</div>
								<CardContent className="p-4">
									<div className="mb-2 flex items-center justify-between">
										<div className="flex items-center gap-2">
											<Avatar className="h-6 w-6">
												<AvatarImage
													src={item.user.avatar}
													alt={item.user.name}
												/>
												<AvatarFallback>
													{item.user.name.charAt(0)}
												</AvatarFallback>
											</Avatar>
											<span className="text-muted-foreground text-xs">
												{item.user.name}
											</span>
										</div>
										{getCredibilityBadge(item.credibilityTag as string)}
									</div>
									<h3 className="mb-2 line-clamp-2 font-medium">
										<Link href={`/news/${item.id}`} className="hover:underline">
											{item.title}
										</Link>
									</h3>
									<div className="flex items-center justify-between">
										<Button size="sm" variant="ghost" asChild>
											<Link href={`/news/${item.id}`}>Read More</Link>
										</Button>
										<Button size="icon" variant="ghost" className="h-8 w-8">
											<Bookmark className="h-4 w-4" />
										</Button>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</main>
		</div>
	);
}
