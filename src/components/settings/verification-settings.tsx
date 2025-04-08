"use client";

import type React from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
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
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
	AlertCircle,
	AlertTriangle,
	CheckCircle,
	HelpCircle,
	Info,
	Loader2,
	Shield,
	XCircle,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function VerificationSettings() {
	const [isUpdating, setIsUpdating] = useState(false);
	const [updateSuccess, setUpdateSuccess] = useState(false);

	// Mock verification settings
	const [verificationSettings, setVerificationSettings] = useState({
		reviewNotifications: true,
		autoReviewSuggestions: true,
		preferredReviewCategories: ["Technology", "Science", "Health"],
		reviewLanguage: "en",
		showReviewerBadge: true,
		anonymousReviews: false,
	});

	// Mock user verification data
	const userData = {
		credibilityScore: 85,
		reviewerLevel: 2,
		reviewCount: 156,
		reviewAccuracy: 84.6,
		isReviewer: true,
		nextLevelProgress: 68,
		nextLevelRequirements: {
			credibilityScore: 95,
			reviewCount: 500,
			reviewAccuracy: 95,
		},
	};

	const handleSwitchToggle = (field: string) => {
		setVerificationSettings({
			...verificationSettings,
			[field]:
				!verificationSettings[field as keyof typeof verificationSettings],
		});
	};

	const handleSelectChange = (field: string, value: string) => {
		setVerificationSettings({
			...verificationSettings,
			[field]: value,
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsUpdating(true);
		setUpdateSuccess(false);

		// In a real app, this would send the updated verification settings to an API
		await new Promise((resolve) => setTimeout(resolve, 1000));

		setIsUpdating(false);
		setUpdateSuccess(true);

		// Hide success message after 3 seconds
		setTimeout(() => {
			setUpdateSuccess(false);
		}, 3000);
	};

	// Available categories
	const categories = [
		"Politics",
		"Technology",
		"Science",
		"Health",
		"Business",
		"Environment",
		"Education",
		"Sports",
		"Entertainment",
		"Culture",
		"International",
		"Local",
		"Economy",
		"Opinion",
		"Lifestyle",
	];

	const toggleCategory = (category: string) => {
		if (verificationSettings.preferredReviewCategories.includes(category)) {
			setVerificationSettings({
				...verificationSettings,
				preferredReviewCategories:
					verificationSettings.preferredReviewCategories.filter(
						(c) => c !== category,
					),
			});
		} else {
			setVerificationSettings({
				...verificationSettings,
				preferredReviewCategories: [
					...verificationSettings.preferredReviewCategories,
					category,
				],
			});
		}
	};

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Shield className="h-5 w-5 text-primary" />
						Reviewer Status
					</CardTitle>
					<CardDescription>
						Your current reviewer level and progress
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					{userData.isReviewer ? (
						<>
							<div className="flex flex-col gap-6 md:flex-row">
								<div className="flex flex-1 flex-col items-center justify-center rounded-md bg-muted p-6">
									<div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
										<Shield className="h-10 w-10 text-primary" />
									</div>
									<h3 className="mb-1 font-bold text-xl">
										Level {userData.reviewerLevel} Reviewer
									</h3>
									<p className="text-center text-muted-foreground text-sm">
										{userData.reviewerLevel === 1
											? "Entry-level reviewer"
											: userData.reviewerLevel === 2
												? "Experienced reviewer"
												: "Expert reviewer"}
									</p>
								</div>

								<div className="flex-1 space-y-4">
									<div className="space-y-1">
										<div className="flex justify-between text-sm">
											<span>
												Progress to Level {userData.reviewerLevel + 1}
											</span>
											<span>{userData.nextLevelProgress}%</span>
										</div>
										<Progress
											value={userData.nextLevelProgress}
											className="h-2"
										/>
									</div>

									<div className="space-y-2">
										<h4 className="font-medium">
											Requirements for Level {userData.reviewerLevel + 1}:
										</h4>
										<ul className="space-y-2 text-sm">
											<li className="flex items-center gap-2">
												{userData.credibilityScore >=
												userData.nextLevelRequirements.credibilityScore ? (
													<CheckCircle className="h-4 w-4 text-green-600" />
												) : (
													<AlertCircle className="h-4 w-4 text-yellow-600" />
												)}
												<span>
													Credibility score: {userData.credibilityScore}/
													{userData.nextLevelRequirements.credibilityScore}
												</span>
											</li>
											<li className="flex items-center gap-2">
												{userData.reviewCount >=
												userData.nextLevelRequirements.reviewCount ? (
													<CheckCircle className="h-4 w-4 text-green-600" />
												) : (
													<AlertCircle className="h-4 w-4 text-yellow-600" />
												)}
												<span>
													Review count: {userData.reviewCount}/
													{userData.nextLevelRequirements.reviewCount}
												</span>
											</li>
											<li className="flex items-center gap-2">
												{userData.reviewAccuracy >=
												userData.nextLevelRequirements.reviewAccuracy ? (
													<CheckCircle className="h-4 w-4 text-green-600" />
												) : (
													<AlertCircle className="h-4 w-4 text-yellow-600" />
												)}
												<span>
													Review accuracy: {userData.reviewAccuracy}%/
													{userData.nextLevelRequirements.reviewAccuracy}%
												</span>
											</li>
										</ul>
									</div>
								</div>
							</div>

							<div className="grid grid-cols-1 gap-4 text-center md:grid-cols-3">
								<div className="rounded-md bg-muted p-4">
									<div className="font-bold text-2xl">
										{userData.reviewCount}
									</div>
									<p className="text-muted-foreground text-sm">Total Reviews</p>
								</div>
								<div className="rounded-md bg-muted p-4">
									<div className="font-bold text-2xl">
										{userData.reviewAccuracy}%
									</div>
									<p className="text-muted-foreground text-sm">Accuracy Rate</p>
								</div>
								<div className="rounded-md bg-muted p-4">
									<div className="font-bold text-2xl">
										{userData.credibilityScore}
									</div>
									<p className="text-muted-foreground text-sm">
										Credibility Score
									</p>
								</div>
							</div>
						</>
					) : (
						<div className="py-6 text-center">
							<div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
								<Shield className="h-10 w-10 text-muted-foreground" />
							</div>
							<h3 className="mb-2 font-medium text-lg">
								You're not a reviewer yet
							</h3>
							<p className="mx-auto mb-4 max-w-md text-muted-foreground text-sm">
								Become a reviewer to help verify news and build a more credible
								information ecosystem on SahihNews.
							</p>
							<Button asChild>
								<Link href="/become-reviewer">
									<Shield className="mr-2 h-4 w-4" />
									Apply to Become a Reviewer
								</Link>
							</Button>
						</div>
					)}
				</CardContent>
			</Card>

			{userData.isReviewer && (
				<Card>
					<CardHeader>
						<CardTitle>Reviewer Preferences</CardTitle>
						<CardDescription>
							Customize your reviewing experience
						</CardDescription>
					</CardHeader>
					<form onSubmit={handleSubmit}>
						<CardContent className="space-y-6">
							<div className="space-y-4">
								<h3 className="font-medium text-sm">Review Notifications</h3>

								<div className="flex items-center justify-between">
									<Label htmlFor="review-notifications" className="flex-1">
										Review notifications
										<p className="text-muted-foreground text-xs">
											Receive notifications about new content to review
										</p>
									</Label>
									<Switch
										id="review-notifications"
										checked={verificationSettings.reviewNotifications}
										onCheckedChange={() =>
											handleSwitchToggle("reviewNotifications")
										}
									/>
								</div>

								<div className="flex items-center justify-between">
									<Label htmlFor="auto-review" className="flex-1">
										Auto-review suggestions
										<p className="text-muted-foreground text-xs">
											Receive suggestions for content to review based on your
											expertise
										</p>
									</Label>
									<Switch
										id="auto-review"
										checked={verificationSettings.autoReviewSuggestions}
										onCheckedChange={() =>
											handleSwitchToggle("autoReviewSuggestions")
										}
									/>
								</div>
							</div>

							<div className="space-y-4">
								<h3 className="font-medium text-sm">Review Preferences</h3>

								<div className="space-y-2">
									<Label>Preferred Review Categories</Label>
									<p className="mb-2 text-muted-foreground text-xs">
										Select categories you have expertise in and prefer to review
									</p>

									<div className="flex flex-wrap gap-2">
										{categories.map((category) => (
											<Badge
												key={category}
												variant={
													verificationSettings.preferredReviewCategories.includes(
														category,
													)
														? "default"
														: "outline"
												}
												className="cursor-pointer hover:bg-accent"
												onClick={() => toggleCategory(category)}
											>
												{category}
											</Badge>
										))}
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="review-language">Review Language</Label>
									<Select
										value={verificationSettings.reviewLanguage}
										onValueChange={(value) =>
											handleSelectChange("reviewLanguage", value)
										}
									>
										<SelectTrigger id="review-language">
											<SelectValue placeholder="Select language" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="en">English</SelectItem>
											<SelectItem value="es">Spanish</SelectItem>
											<SelectItem value="fr">French</SelectItem>
											<SelectItem value="de">German</SelectItem>
											<SelectItem value="ar">Arabic</SelectItem>
											<SelectItem value="zh">Chinese</SelectItem>
										</SelectContent>
									</Select>
									<p className="text-muted-foreground text-xs">
										You'll primarily be shown content in this language to review
									</p>
								</div>
							</div>

							<div className="space-y-4">
								<h3 className="font-medium text-sm">Display Options</h3>

								<div className="flex items-center justify-between">
									<Label htmlFor="show-badge" className="flex-1">
										Show reviewer badge
										<p className="text-muted-foreground text-xs">
											Display your reviewer badge on your profile and posts
										</p>
									</Label>
									<Switch
										id="show-badge"
										checked={verificationSettings.showReviewerBadge}
										onCheckedChange={() =>
											handleSwitchToggle("showReviewerBadge")
										}
									/>
								</div>

								<div className="flex items-center justify-between">
									<Label htmlFor="anonymous-reviews" className="flex-1">
										Anonymous reviews
										<p className="text-muted-foreground text-xs">
											Keep your identity hidden when reviewing content
										</p>
									</Label>
									<Switch
										id="anonymous-reviews"
										checked={verificationSettings.anonymousReviews}
										onCheckedChange={() =>
											handleSwitchToggle("anonymousReviews")
										}
									/>
								</div>
							</div>

							{updateSuccess && (
								<Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-900/30 dark:bg-green-900/20 dark:text-green-400">
									<Info className="h-4 w-4" />
									<AlertDescription>
										Reviewer preferences updated successfully!
									</AlertDescription>
								</Alert>
							)}
						</CardContent>
						<CardFooter>
							<Button type="submit" disabled={isUpdating}>
								{isUpdating && (
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								)}
								Save Preferences
							</Button>
						</CardFooter>
					</form>
				</Card>
			)}

			<Card>
				<CardHeader>
					<CardTitle>Verification Guidelines</CardTitle>
					<CardDescription>
						Best practices for reviewing content
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<h3 className="font-medium text-sm">Review Verdicts</h3>
						<div className="space-y-3">
							<div className="flex items-start gap-3 rounded-md bg-green-50 p-3 dark:bg-green-950/10">
								<CheckCircle className="mt-0.5 h-5 w-5 text-green-600" />
								<div>
									<h4 className="font-medium">Accurate</h4>
									<p className="mt-1 text-muted-foreground text-xs">
										The post contains factually correct information that is
										properly sourced and presented in appropriate context.
									</p>
								</div>
							</div>

							<div className="flex items-start gap-3 rounded-md bg-orange-50 p-3 dark:bg-orange-950/10">
								<AlertTriangle className="mt-0.5 h-5 w-5 text-orange-600" />
								<div>
									<h4 className="font-medium">Misleading</h4>
									<p className="mt-1 text-muted-foreground text-xs">
										The post contains some factual elements but presents them in
										a way that could mislead readers or lacks important context.
									</p>
								</div>
							</div>

							<div className="flex items-start gap-3 rounded-md bg-red-50 p-3 dark:bg-red-950/10">
								<XCircle className="mt-0.5 h-5 w-5 text-red-600" />
								<div>
									<h4 className="font-medium">Inaccurate</h4>
									<p className="mt-1 text-muted-foreground text-xs">
										The post contains factually incorrect information or makes
										claims that are not supported by credible sources.
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

					<Button variant="outline" asChild>
						<Link href="/reviewer-guidelines">
							View Complete Reviewer Guidelines
						</Link>
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
