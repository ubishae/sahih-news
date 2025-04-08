import Header from "@/components/header";
import ReviewerApplication from "@/components/reviewer-application";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	AlertTriangle,
	ArrowRight,
	Award,
	CheckCircle,
	Clock,
	FileCheck,
	HelpCircle,
	Info,
	Shield,
	Star,
	ThumbsUp,
	TrendingUp,
	Users,
	XCircle,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Become a Reviewer | SahihNews",
	description:
		"Join SahihNews' reviewer program to help verify news and build a more credible information ecosystem",
};

export default function BecomeReviewerPage() {
	// Mock user data - in a real app, this would come from an API or auth context
	const userData = {
		name: "Alex Johnson",
		username: "alexj",
		avatar: "/placeholder.svg?height=40&width=40",
		credibilityScore: 85,
		reviewCount: 32,
		isEligible: true,
		progress: {
			credibilityScore: 85, // out of 100
			reviewAccuracy: 92, // percentage
			postCount: 42, // raw number
			accountAge: 8, // months
		},
		requirements: {
			credibilityScore: 75,
			reviewAccuracy: 80,
			postCount: 25,
			accountAge: 3,
		},
	};

	// Calculate if user meets each requirement
	const meetsCredibilityRequirement =
		userData.progress.credibilityScore >=
		userData.requirements.credibilityScore;
	const meetsAccuracyRequirement =
		userData.progress.reviewAccuracy >= userData.requirements.reviewAccuracy;
	const meetsPostCountRequirement =
		userData.progress.postCount >= userData.requirements.postCount;
	const meetsAccountAgeRequirement =
		userData.progress.accountAge >= userData.requirements.accountAge;

	// Calculate overall eligibility
	const isEligible =
		meetsCredibilityRequirement &&
		meetsAccuracyRequirement &&
		meetsPostCountRequirement &&
		meetsAccountAgeRequirement;

	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main className="container mx-auto max-w-4xl px-4 py-6">
				{/* Hero section */}
				<div className="mb-8 text-center">
					<div className="mb-4 inline-flex rounded-full bg-primary/10 p-3">
						<Shield className="h-8 w-8 text-primary" />
					</div>
					<h1 className="mb-2 font-bold text-3xl">
						Become a SahihNews Reviewer
					</h1>
					<p className="mx-auto max-w-2xl text-muted-foreground">
						Join our community of fact-checkers and help build a more credible
						information ecosystem. Reviewers play a crucial role in verifying
						news and maintaining the integrity of SahihNews.
					</p>
				</div>

				{/* Eligibility card */}
				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<FileCheck className="h-5 w-5" />
							Your Reviewer Eligibility
						</CardTitle>
						<CardDescription>
							Based on your current activity and credibility on SahihNews
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<Avatar className="h-10 w-10">
											<AvatarImage src={userData.avatar} alt={userData.name} />
											<AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
										</Avatar>
										<div>
											<div className="font-medium">{userData.name}</div>
											<div className="text-muted-foreground text-sm">
												@{userData.username}
											</div>
										</div>
									</div>
									{isEligible ? (
										<Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
											Eligible
										</Badge>
									) : (
										<Badge
											variant="outline"
											className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
										>
											Almost There
										</Badge>
									)}
								</div>

								<div className="space-y-3">
									<div className="space-y-1">
										<div className="flex justify-between text-sm">
											<div className="flex items-center gap-1">
												<Shield className="h-4 w-4 text-primary" />
												<span>Credibility Score</span>
											</div>
											<div className="flex items-center gap-1">
												<span
													className={
														meetsCredibilityRequirement
															? "text-green-600"
															: "text-yellow-600"
													}
												>
													{userData.progress.credibilityScore}/100
												</span>
												<span className="text-muted-foreground">
													(min {userData.requirements.credibilityScore})
												</span>
											</div>
										</div>
										<Progress
											value={userData.progress.credibilityScore}
											max={100}
											className={`h-2 ${meetsCredibilityRequirement ? "bg-green-100" : "bg-yellow-100"} [&>div]:${meetsCredibilityRequirement ? "bg-green-500" : "bg-yellow-500"}`}
										/>
									</div>

									<div className="space-y-1">
										<div className="flex justify-between text-sm">
											<div className="flex items-center gap-1">
												<CheckCircle className="h-4 w-4 text-green-600" />
												<span>Review Accuracy</span>
											</div>
											<div className="flex items-center gap-1">
												<span
													className={
														meetsAccuracyRequirement
															? "text-green-600"
															: "text-yellow-600"
													}
												>
													{userData.progress.reviewAccuracy}%
												</span>
												<span className="text-muted-foreground">
													(min {userData.requirements.reviewAccuracy}%)
												</span>
											</div>
										</div>
										<Progress
											value={userData.progress.reviewAccuracy}
											max={100}
											className={`h-2 ${meetsAccuracyRequirement ? "bg-green-100" : "bg-yellow-100"} [&>div]:${meetsAccuracyRequirement ? "bg-green-500" : "bg-yellow-500"}`}
										/>
									</div>

									<div className="space-y-1">
										<div className="flex justify-between text-sm">
											<div className="flex items-center gap-1">
												<FileCheck className="h-4 w-4 text-blue-600" />
												<span>Posts Published</span>
											</div>
											<div className="flex items-center gap-1">
												<span
													className={
														meetsPostCountRequirement
															? "text-green-600"
															: "text-yellow-600"
													}
												>
													{userData.progress.postCount}
												</span>
												<span className="text-muted-foreground">
													(min {userData.requirements.postCount})
												</span>
											</div>
										</div>
										<Progress
											value={Math.min(
												(userData.progress.postCount /
													userData.requirements.postCount) *
													100,
												100,
											)}
											max={100}
											className={`h-2 ${meetsPostCountRequirement ? "bg-green-100" : "bg-yellow-100"} [&>div]:${meetsPostCountRequirement ? "bg-green-500" : "bg-yellow-500"}`}
										/>
									</div>

									<div className="space-y-1">
										<div className="flex justify-between text-sm">
											<div className="flex items-center gap-1">
												<Clock className="h-4 w-4 text-purple-600" />
												<span>Account Age (months)</span>
											</div>
											<div className="flex items-center gap-1">
												<span
													className={
														meetsAccountAgeRequirement
															? "text-green-600"
															: "text-yellow-600"
													}
												>
													{userData.progress.accountAge}
												</span>
												<span className="text-muted-foreground">
													(min {userData.requirements.accountAge})
												</span>
											</div>
										</div>
										<Progress
											value={Math.min(
												(userData.progress.accountAge /
													userData.requirements.accountAge) *
													100,
												100,
											)}
											max={100}
											className={`h-2 ${meetsAccountAgeRequirement ? "bg-green-100" : "bg-yellow-100"} [&>div]:${meetsAccountAgeRequirement ? "bg-green-500" : "bg-yellow-500"}`}
										/>
									</div>
								</div>
							</div>

							<div className="flex flex-col justify-center">
								{isEligible ? (
									<div className="space-y-4">
										<Alert className="border-green-500 bg-green-50 dark:bg-green-950/10">
											<CheckCircle className="h-4 w-4 text-green-600" />
											<AlertTitle>
												You're eligible to become a reviewer!
											</AlertTitle>
											<AlertDescription>
												You meet all the requirements to join our reviewer
												program. Apply now to start contributing to a more
												credible news ecosystem.
											</AlertDescription>
										</Alert>
										<ReviewerApplication />
									</div>
								) : (
									<div className="space-y-4">
										<Alert className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950/10">
											<AlertTriangle className="h-4 w-4 text-yellow-600" />
											<AlertTitle>Almost there!</AlertTitle>
											<AlertDescription>
												You're close to meeting the requirements to become a
												reviewer. Continue building your credibility and
												activity on SahihNews.
											</AlertDescription>
										</Alert>
										<div className="space-y-2">
											<h3 className="font-medium text-sm">
												How to improve your eligibility:
											</h3>
											<ul className="space-y-2 text-sm">
												{!meetsCredibilityRequirement && (
													<li className="flex items-start gap-2">
														<ArrowRight className="mt-0.5 h-4 w-4 text-primary" />
														<span>
															Increase your credibility score by posting
															accurate news with reliable sources
														</span>
													</li>
												)}
												{!meetsAccuracyRequirement && (
													<li className="flex items-start gap-2">
														<ArrowRight className="mt-0.5 h-4 w-4 text-primary" />
														<span>
															Improve your review accuracy by carefully
															evaluating posts before marking them
														</span>
													</li>
												)}
												{!meetsPostCountRequirement && (
													<li className="flex items-start gap-2">
														<ArrowRight className="mt-0.5 h-4 w-4 text-primary" />
														<span>
															Publish more posts to reach the minimum
															requirement of {userData.requirements.postCount}{" "}
															posts
														</span>
													</li>
												)}
												{!meetsAccountAgeRequirement && (
													<li className="flex items-start gap-2">
														<ArrowRight className="mt-0.5 h-4 w-4 text-primary" />
														<span>
															Your account needs to be at least{" "}
															{userData.requirements.accountAge} months old
														</span>
													</li>
												)}
											</ul>
										</div>
									</div>
								)}
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Reviewer program details */}
				<Tabs defaultValue="about" className="mb-8 w-full">
					<TabsList className="grid w-full grid-cols-3">
						<TabsTrigger value="about">About the Program</TabsTrigger>
						<TabsTrigger value="benefits">Benefits</TabsTrigger>
						<TabsTrigger value="levels">Reviewer Levels</TabsTrigger>
					</TabsList>

					<TabsContent value="about" className="mt-6 space-y-6">
						<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
							<Card>
								<CardHeader className="pb-2">
									<CardTitle className="flex items-center gap-2 text-lg">
										<Shield className="h-5 w-5 text-primary" />
										The Role of Reviewers
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-sm">
										Reviewers are trusted members of the SahihNews community who
										help verify the accuracy of news posts. They evaluate
										content, check sources, and provide verdicts that help users
										identify reliable information.
									</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader className="pb-2">
									<CardTitle className="flex items-center gap-2 text-lg">
										<FileCheck className="h-5 w-5 text-green-600" />
										Review Process
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-sm">
										Reviewers assess posts based on source credibility, factual
										accuracy, and context. They provide verdicts (Accurate,
										Misleading, or Inaccurate) along with explanations for their
										decisions.
									</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader className="pb-2">
									<CardTitle className="flex items-center gap-2 text-lg">
										<Users className="h-5 w-5 text-blue-600" />
										Community Impact
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-sm">
										By becoming a reviewer, you directly contribute to building
										a more trustworthy information ecosystem. Your reviews help
										users identify reliable news and improve the overall quality
										of content on SahihNews.
									</p>
								</CardContent>
							</Card>
						</div>

						<Card>
							<CardHeader>
								<CardTitle>How the Review System Works</CardTitle>
								<CardDescription>
									Understanding the SahihNews verification process
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
									<div className="space-y-4">
										<h3 className="font-medium text-sm">Review Verdicts</h3>
										<div className="space-y-3">
											<div className="flex items-start gap-3 rounded-md bg-green-50 p-3 dark:bg-green-950/10">
												<CheckCircle className="mt-0.5 h-5 w-5 text-green-600" />
												<div>
													<h4 className="font-medium">Accurate</h4>
													<p className="mt-1 text-muted-foreground text-xs">
														The post contains factually correct information that
														is properly sourced and presented in appropriate
														context.
													</p>
												</div>
											</div>

											<div className="flex items-start gap-3 rounded-md bg-orange-50 p-3 dark:bg-orange-950/10">
												<AlertTriangle className="mt-0.5 h-5 w-5 text-orange-600" />
												<div>
													<h4 className="font-medium">Misleading</h4>
													<p className="mt-1 text-muted-foreground text-xs">
														The post contains some factual elements but presents
														them in a way that could mislead readers or lacks
														important context.
													</p>
												</div>
											</div>

											<div className="flex items-start gap-3 rounded-md bg-red-50 p-3 dark:bg-red-950/10">
												<XCircle className="mt-0.5 h-5 w-5 text-red-600" />
												<div>
													<h4 className="font-medium">Inaccurate</h4>
													<p className="mt-1 text-muted-foreground text-xs">
														The post contains factually incorrect information or
														makes claims that are not supported by credible
														sources.
													</p>
												</div>
											</div>

											<div className="flex items-start gap-3 rounded-md bg-yellow-50 p-3 dark:bg-yellow-950/10">
												<HelpCircle className="mt-0.5 h-5 w-5 text-yellow-600" />
												<div>
													<h4 className="font-medium">Unverified</h4>
													<p className="mt-1 text-muted-foreground text-xs">
														The default status for new posts. Indicates that the
														information has not yet been verified by reviewers.
													</p>
												</div>
											</div>
										</div>
									</div>

									<div className="space-y-4">
										<h3 className="font-medium text-sm">Review Process</h3>
										<ol className="space-y-3">
											<li className="flex items-start gap-3">
												<div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
													1
												</div>
												<div className="flex-1">
													<h4 className="font-medium text-sm">
														Evaluate the Claim
													</h4>
													<p className="mt-1 text-muted-foreground text-xs">
														Identify the main claims being made in the post and
														determine what needs to be verified.
													</p>
												</div>
											</li>

											<li className="flex items-start gap-3">
												<div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
													2
												</div>
												<div className="flex-1">
													<h4 className="font-medium text-sm">
														Check the Sources
													</h4>
													<p className="mt-1 text-muted-foreground text-xs">
														Examine the sources provided and assess their
														credibility. Look for additional sources if
														necessary.
													</p>
												</div>
											</li>

											<li className="flex items-start gap-3">
												<div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
													3
												</div>
												<div className="flex-1">
													<h4 className="font-medium text-sm">
														Consider Context
													</h4>
													<p className="mt-1 text-muted-foreground text-xs">
														Determine if the post presents information in its
														proper context or if important details are missing.
													</p>
												</div>
											</li>

											<li className="flex items-start gap-3">
												<div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
													4
												</div>
												<div className="flex-1">
													<h4 className="font-medium text-sm">
														Provide Verdict & Explanation
													</h4>
													<p className="mt-1 text-muted-foreground text-xs">
														Select a verdict and write a clear explanation of
														your reasoning, citing specific evidence.
													</p>
												</div>
											</li>
										</ol>

										<div className="rounded-md bg-blue-50 p-3 dark:bg-blue-950/10">
											<div className="mb-1 flex items-center gap-2">
												<Info className="h-4 w-4 text-blue-600" />
												<h4 className="font-medium text-sm">
													Consensus System
												</h4>
											</div>
											<p className="text-muted-foreground text-xs">
												Multiple reviewers evaluate each post, and the final
												verdict is determined by consensus. Higher-level
												reviewers' verdicts carry more weight in the final
												determination.
											</p>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="benefits" className="mt-6 space-y-6">
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2 text-lg">
										<Award className="h-5 w-5 text-primary" />
										Reviewer Benefits
									</CardTitle>
									<CardDescription>
										Exclusive perks for SahihNews reviewers
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="space-y-3">
										<div className="flex items-start gap-3">
											<Shield className="mt-0.5 h-5 w-5 text-primary" />
											<div>
												<h4 className="font-medium">Reviewer Badge</h4>
												<p className="mt-1 text-muted-foreground text-sm">
													Display a verified reviewer badge on your profile,
													increasing your visibility and credibility.
												</p>
											</div>
										</div>

										<div className="flex items-start gap-3">
											<TrendingUp className="mt-0.5 h-5 w-5 text-green-600" />
											<div>
												<h4 className="font-medium">Credibility Boost</h4>
												<p className="mt-1 text-muted-foreground text-sm">
													Earn additional credibility points for accurate
													reviews, accelerating your credibility score growth.
												</p>
											</div>
										</div>

										<div className="flex items-start gap-3">
											<Star className="mt-0.5 h-5 w-5 text-yellow-600" />
											<div>
												<h4 className="font-medium">Review Impact</h4>
												<p className="mt-1 text-muted-foreground text-sm">
													Your reviews carry more weight in determining the
													final verdict on posts.
												</p>
											</div>
										</div>

										<div className="flex items-start gap-3">
											<Users className="mt-0.5 h-5 w-5 text-blue-600" />
											<div>
												<h4 className="font-medium">Reviewer Community</h4>
												<p className="mt-1 text-muted-foreground text-sm">
													Join an exclusive community of reviewers to discuss
													verification techniques and best practices.
												</p>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2 text-lg">
										<ThumbsUp className="h-5 w-5 text-green-600" />
										Testimonials
									</CardTitle>
									<CardDescription>
										Hear from our current reviewers
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="space-y-4">
										<div className="rounded-md bg-muted p-4">
											<div className="mb-2 flex items-center gap-3">
												<Avatar className="h-8 w-8">
													<AvatarImage
														src="/placeholder.svg?height=32&width=32&text=SJ"
														alt="Sarah Johnson"
													/>
													<AvatarFallback>SJ</AvatarFallback>
												</Avatar>
												<div>
													<div className="font-medium">Sarah Johnson</div>
													<div className="text-muted-foreground text-xs">
														Level 3 Reviewer • 8 months
													</div>
												</div>
											</div>
											<p className="text-sm italic">
												"Being a reviewer has transformed how I consume news.
												I've developed a much stronger critical thinking ability
												and feel like I'm making a real difference in combating
												misinformation."
											</p>
										</div>

										<div className="rounded-md bg-muted p-4">
											<div className="mb-2 flex items-center gap-3">
												<Avatar className="h-8 w-8">
													<AvatarImage
														src="/placeholder.svg?height=32&width=32&text=MR"
														alt="Michael Rodriguez"
													/>
													<AvatarFallback>MR</AvatarFallback>
												</Avatar>
												<div>
													<div className="font-medium">Michael Rodriguez</div>
													<div className="text-muted-foreground text-xs">
														Level 2 Reviewer • 5 months
													</div>
												</div>
											</div>
											<p className="text-sm italic">
												"The reviewer community is incredibly supportive. We
												learn from each other and collectively raise the bar for
												news quality. Plus, the credibility boost has helped my
												own content reach more people."
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>

						<Card>
							<CardHeader>
								<CardTitle>Impact of Reviewers</CardTitle>
								<CardDescription>
									How reviewers are making a difference on SahihNews
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 gap-6 text-center md:grid-cols-3">
									<div className="space-y-2">
										<div className="font-bold text-3xl text-primary">94%</div>
										<p className="text-muted-foreground text-sm">
											of users say reviewer verdicts help them identify reliable
											information
										</p>
									</div>

									<div className="space-y-2">
										<div className="font-bold text-3xl text-primary">78%</div>
										<p className="text-muted-foreground text-sm">
											reduction in the spread of misleading content since
											implementing the reviewer program
										</p>
									</div>

									<div className="space-y-2">
										<div className="font-bold text-3xl text-primary">3.2M</div>
										<p className="text-muted-foreground text-sm">
											posts reviewed by our community in the last year, helping
											users make informed decisions
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="levels" className="mt-6 space-y-6">
						<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
							<Card>
								<CardHeader className="pb-2 text-center">
									<div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
										<Shield className="h-6 w-6 text-blue-600" />
									</div>
									<CardTitle>Level 1 Reviewer</CardTitle>
									<CardDescription>Entry-level reviewer</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="space-y-2">
										<h4 className="font-medium text-sm">Requirements</h4>
										<ul className="space-y-1 text-sm">
											<li className="flex items-center gap-2">
												<CheckCircle className="h-4 w-4 text-green-600" />
												<span>Credibility score: 75+</span>
											</li>
											<li className="flex items-center gap-2">
												<CheckCircle className="h-4 w-4 text-green-600" />
												<span>25+ posts published</span>
											</li>
											<li className="flex items-center gap-2">
												<CheckCircle className="h-4 w-4 text-green-600" />
												<span>3+ months account age</span>
											</li>
											<li className="flex items-center gap-2">
												<CheckCircle className="h-4 w-4 text-green-600" />
												<span>80%+ review accuracy</span>
											</li>
										</ul>
									</div>

									<div className="space-y-2">
										<h4 className="font-medium text-sm">Capabilities</h4>
										<ul className="space-y-1 text-sm">
											<li className="flex items-center gap-2">
												<CheckCircle className="h-4 w-4 text-green-600" />
												<span>Review posts in your areas of expertise</span>
											</li>
											<li className="flex items-center gap-2">
												<CheckCircle className="h-4 w-4 text-green-600" />
												<span>
													Earn credibility points for accurate reviews
												</span>
											</li>
											<li className="flex items-center gap-2">
												<CheckCircle className="h-4 w-4 text-green-600" />
												<span>Level 1 Reviewer badge on profile</span>
											</li>
										</ul>
									</div>
								</CardContent>
								<CardFooter>
									<Button className="w-full" variant="outline">
										Apply Now
									</Button>
								</CardFooter>
							</Card>

							<Card className="border-primary">
								<CardHeader className="pb-2 text-center">
									<div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
										<Shield className="h-6 w-6 text-primary" />
									</div>
									<CardTitle>Level 2 Reviewer</CardTitle>
									<CardDescription>Experienced reviewer</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="space-y-2">
										<h4 className="font-medium text-sm">Requirements</h4>
										<ul className="space-y-1 text-sm">
											<li className="flex items-center gap-2">
												<CheckCircle className="h-4 w-4 text-green-600" />
												<span>Credibility score: 85+</span>
											</li>
											<li className="flex items-center gap-2">
												<CheckCircle className="h-4 w-4 text-green-600" />
												<span>100+ reviews as Level 1</span>
											</li>
											<li className="flex items-center gap-2">
												<CheckCircle className="h-4 w-4 text-green-600" />
												<span>90%+ review accuracy</span>
											</li>
											<li className="flex items-center gap-2">
												<CheckCircle className="h-4 w-4 text-green-600" />
												<span>6+ months as Level 1</span>
											</li>
										</ul>
									</div>

									<div className="space-y-2">
										<h4 className="font-medium text-sm">Capabilities</h4>
										<ul className="space-y-1 text-sm">
											<li className="flex items-center gap-2">
												<CheckCircle className="h-4 w-4 text-green-600" />
												<span>All Level 1 capabilities</span>
											</li>
											<li className="flex items-center gap-2">
												<CheckCircle className="h-4 w-4 text-green-600" />
												<span>Reviews carry more weight in consensus</span>
											</li>
											<li className="flex items-center gap-2">
												<CheckCircle className="h-4 w-4 text-green-600" />
												<span>Access to reviewer community forums</span>
											</li>
											<li className="flex items-center gap-2">
												<CheckCircle className="h-4 w-4 text-green-600" />
												<span>Level 2 Reviewer badge on profile</span>
											</li>
										</ul>
									</div>
								</CardContent>
								<CardFooter>
									<Button className="w-full">Apply Now</Button>
								</CardFooter>
							</Card>

							<Card>
								<CardHeader className="pb-2 text-center">
									<div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/20">
										<Shield className="h-6 w-6 text-purple-600" />
									</div>
									<CardTitle>Level 3 Reviewer</CardTitle>
									<CardDescription>Expert reviewer</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="space-y-2">
										<h4 className="font-medium text-sm">Requirements</h4>
										<ul className="space-y-1 text-sm">
											<li className="flex items-center gap-2">
												<CheckCircle className="h-4 w-4 text-green-600" />
												<span>Credibility score: 95+</span>
											</li>
											<li className="flex items-center gap-2">
												<CheckCircle className="h-4 w-4 text-green-600" />
												<span>500+ reviews as Level 2</span>
											</li>
											<li className="flex items-center gap-2">
												<CheckCircle className="h-4 w-4 text-green-600" />
												<span>95%+ review accuracy</span>
											</li>
											<li className="flex items-center gap-2">
												<CheckCircle className="h-4 w-4 text-green-600" />
												<span>12+ months as Level 2</span>
											</li>
										</ul>
									</div>

									<div className="space-y-2">
										<h4 className="font-medium text-sm">Capabilities</h4>
										<ul className="space-y-1 text-sm">
											<li className="flex items-center gap-2">
												<CheckCircle className="h-4 w-4 text-green-600" />
												<span>All Level 2 capabilities</span>
											</li>
											<li className="flex items-center gap-2">
												<CheckCircle className="h-4 w-4 text-green-600" />
												<span>Highest weight in consensus decisions</span>
											</li>
											<li className="flex items-center gap-2">
												<CheckCircle className="h-4 w-4 text-green-600" />
												<span>Ability to mentor new reviewers</span>
											</li>
											<li className="flex items-center gap-2">
												<CheckCircle className="h-4 w-4 text-green-600" />
												<span>Level 3 Reviewer badge on profile</span>
											</li>
										</ul>
									</div>
								</CardContent>
								<CardFooter>
									<Button className="w-full" variant="outline">
										Apply Now
									</Button>
								</CardFooter>
							</Card>
						</div>

						<Card>
							<CardHeader>
								<CardTitle>Reviewer Progression Path</CardTitle>
								<CardDescription>
									How to advance through reviewer levels
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="relative">
									<div className="absolute top-0 bottom-0 left-4 w-0.5 bg-muted-foreground/20" />
									<div className="space-y-8">
										<div className="relative pl-10">
											<div className="absolute top-1 left-0 flex h-8 w-8 items-center justify-center rounded-full border bg-background">
												<Shield className="h-4 w-4 text-muted-foreground" />
											</div>
											<h3 className="font-medium text-base">
												Start as a Regular User
											</h3>
											<p className="mt-1 text-muted-foreground text-sm">
												Build your credibility by posting accurate news with
												reliable sources. Participate in the community by
												reviewing posts and providing thoughtful comments.
											</p>
										</div>

										<div className="relative pl-10">
											<div className="absolute top-1 left-0 flex h-8 w-8 items-center justify-center rounded-full border bg-background">
												<Shield className="h-4 w-4 text-blue-600" />
											</div>
											<h3 className="font-medium text-base">
												Apply for Level 1 Reviewer
											</h3>
											<p className="mt-1 text-muted-foreground text-sm">
												Once you meet the minimum requirements, apply to become
												a Level 1 Reviewer. Your application will be reviewed by
												our moderation team.
											</p>
										</div>

										<div className="relative pl-10">
											<div className="absolute top-1 left-0 flex h-8 w-8 items-center justify-center rounded-full border bg-background">
												<Shield className="h-4 w-4 text-primary" />
											</div>
											<h3 className="font-medium text-base">
												Advance to Level 2 Reviewer
											</h3>
											<p className="mt-1 text-muted-foreground text-sm">
												After 6+ months as a Level 1 Reviewer with high
												accuracy, you can apply for Level 2. This requires
												consistent participation and a strong track record.
											</p>
										</div>

										<div className="relative pl-10">
											<div className="absolute top-1 left-0 flex h-8 w-8 items-center justify-center rounded-full border bg-background">
												<Shield className="h-4 w-4 text-purple-600" />
											</div>
											<h3 className="font-medium text-base">
												Become a Level 3 Reviewer
											</h3>
											<p className="mt-1 text-muted-foreground text-sm">
												The highest reviewer level is reserved for our most
												dedicated and accurate reviewers. Level 3 Reviewers are
												the backbone of our verification system.
											</p>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>

				{/* FAQ section */}
				<div className="space-y-4">
					<h2 className="font-bold text-2xl">Frequently Asked Questions</h2>
					<Accordion type="single" collapsible className="w-full">
						<AccordionItem value="item-1">
							<AccordionTrigger>
								How much time does being a reviewer require?
							</AccordionTrigger>
							<AccordionContent>
								<p className="text-muted-foreground">
									There's no minimum time commitment, but we recommend spending
									at least 2-3 hours per week reviewing content to maintain your
									skills and stay active in the program. You can review posts at
									your own pace and schedule.
								</p>
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="item-2">
							<AccordionTrigger>
								What happens if my reviews are inaccurate?
							</AccordionTrigger>
							<AccordionContent>
								<p className="text-muted-foreground">
									We understand that everyone makes mistakes. If your review
									accuracy falls below the required threshold for your level,
									you'll receive guidance and resources to improve. Persistent
									inaccuracy may result in a temporary suspension from the
									reviewer program until you complete additional training.
								</p>
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="item-3">
							<AccordionTrigger>
								Can I specialize in specific topics as a reviewer?
							</AccordionTrigger>
							<AccordionContent>
								<p className="text-muted-foreground">
									Yes! We encourage reviewers to focus on their areas of
									expertise. When you become a reviewer, you can select topic
									categories where you have knowledge and experience. The system
									will prioritize showing you content in those areas, though you
									can review any content you feel qualified to assess.
								</p>
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="item-4">
							<AccordionTrigger>
								How are reviewer applications evaluated?
							</AccordionTrigger>
							<AccordionContent>
								<p className="text-muted-foreground">
									Applications are reviewed by our moderation team and existing
									high-level reviewers. We evaluate your credibility history,
									the quality of your posts and comments, and your understanding
									of the review process as demonstrated in your application. We
									also consider your areas of expertise and current needs in our
									reviewer community.
								</p>
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="item-5">
							<AccordionTrigger>
								Can I lose my reviewer status?
							</AccordionTrigger>
							<AccordionContent>
								<p className="text-muted-foreground">
									Yes, reviewer status can be revoked for consistent inaccuracy,
									violations of our community guidelines, extended inactivity
									(6+ months without reviews), or significant drops in
									credibility score. In most cases, we'll provide warnings and
									opportunities to improve before removing reviewer status.
								</p>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>

				{/* CTA section */}
				<Card className="mt-8 bg-primary text-primary-foreground">
					<CardContent className="flex flex-col items-center justify-between gap-6 p-6 md:flex-row">
						<div>
							<h2 className="mb-2 font-bold text-2xl">
								Ready to make a difference?
							</h2>
							<p className="max-w-md text-primary-foreground/80">
								Join our community of fact-checkers and help build a more
								credible information ecosystem on SahihNews.
							</p>
						</div>
						<ReviewerApplication variant="secondary" />
					</CardContent>
				</Card>
			</main>
		</div>
	);
}
