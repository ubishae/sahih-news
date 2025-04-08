"use client";

import type React from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, Loader2 } from "lucide-react";
import { useState } from "react";

export default function NotificationSettings() {
	const [isUpdating, setIsUpdating] = useState(false);
	const [updateSuccess, setUpdateSuccess] = useState(false);

	// Mock notification settings
	const [emailSettings, setEmailSettings] = useState({
		newFollower: true,
		postMention: true,
		commentMention: true,
		postReaction: false,
		commentReaction: false,
		credibilityUpdate: true,
		reviewRequest: true,
		newsletter: false,
		productUpdates: true,
	});

	const [pushSettings, setPushSettings] = useState({
		newFollower: true,
		postMention: true,
		commentMention: true,
		postReaction: true,
		commentReaction: false,
		credibilityUpdate: true,
		reviewRequest: true,
	});

	const handleEmailToggle = (setting: string) => {
		setEmailSettings({
			...emailSettings,
			[setting]: !emailSettings[setting as keyof typeof emailSettings],
		});
	};

	const handlePushToggle = (setting: string) => {
		setPushSettings({
			...pushSettings,
			[setting]: !pushSettings[setting as keyof typeof pushSettings],
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsUpdating(true);
		setUpdateSuccess(false);

		// In a real app, this would send the updated notification settings to an API
		await new Promise((resolve) => setTimeout(resolve, 1000));

		setIsUpdating(false);
		setUpdateSuccess(true);

		// Hide success message after 3 seconds
		setTimeout(() => {
			setUpdateSuccess(false);
		}, 3000);
	};

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Notification Preferences</CardTitle>
					<CardDescription>
						Choose how and when you want to be notified
					</CardDescription>
				</CardHeader>
				<form onSubmit={handleSubmit}>
					<CardContent className="space-y-4">
						<Tabs defaultValue="email" className="w-full">
							<TabsList className="grid w-full grid-cols-2">
								<TabsTrigger value="email">Email Notifications</TabsTrigger>
								<TabsTrigger value="push">Push Notifications</TabsTrigger>
							</TabsList>

							<TabsContent value="email" className="space-y-4 pt-4">
								<div className="space-y-4">
									<h3 className="font-medium text-sm">Account Notifications</h3>

									<div className="flex items-center justify-between">
										<Label htmlFor="email-new-follower" className="flex-1">
											New follower
											<p className="text-muted-foreground text-xs">
												Receive an email when someone follows you
											</p>
										</Label>
										<Switch
											id="email-new-follower"
											checked={emailSettings.newFollower}
											onCheckedChange={() => handleEmailToggle("newFollower")}
										/>
									</div>

									<div className="flex items-center justify-between">
										<Label htmlFor="email-post-mention" className="flex-1">
											Post mentions
											<p className="text-muted-foreground text-xs">
												Receive an email when someone mentions you in a post
											</p>
										</Label>
										<Switch
											id="email-post-mention"
											checked={emailSettings.postMention}
											onCheckedChange={() => handleEmailToggle("postMention")}
										/>
									</div>

									<div className="flex items-center justify-between">
										<Label htmlFor="email-comment-mention" className="flex-1">
											Comment mentions
											<p className="text-muted-foreground text-xs">
												Receive an email when someone mentions you in a comment
											</p>
										</Label>
										<Switch
											id="email-comment-mention"
											checked={emailSettings.commentMention}
											onCheckedChange={() =>
												handleEmailToggle("commentMention")
											}
										/>
									</div>
								</div>

								<div className="space-y-4">
									<h3 className="font-medium text-sm">
										Engagement Notifications
									</h3>

									<div className="flex items-center justify-between">
										<Label htmlFor="email-post-reaction" className="flex-1">
											Post reactions
											<p className="text-muted-foreground text-xs">
												Receive an email when someone reacts to your post
											</p>
										</Label>
										<Switch
											id="email-post-reaction"
											checked={emailSettings.postReaction}
											onCheckedChange={() => handleEmailToggle("postReaction")}
										/>
									</div>

									<div className="flex items-center justify-between">
										<Label htmlFor="email-comment-reaction" className="flex-1">
											Comment reactions
											<p className="text-muted-foreground text-xs">
												Receive an email when someone reacts to your comment
											</p>
										</Label>
										<Switch
											id="email-comment-reaction"
											checked={emailSettings.commentReaction}
											onCheckedChange={() =>
												handleEmailToggle("commentReaction")
											}
										/>
									</div>
								</div>

								<div className="space-y-4">
									<h3 className="font-medium text-sm">
										Credibility & Verification
									</h3>

									<div className="flex items-center justify-between">
										<Label
											htmlFor="email-credibility-update"
											className="flex-1"
										>
											Credibility updates
											<p className="text-muted-foreground text-xs">
												Receive an email when your credibility score changes
											</p>
										</Label>
										<Switch
											id="email-credibility-update"
											checked={emailSettings.credibilityUpdate}
											onCheckedChange={() =>
												handleEmailToggle("credibilityUpdate")
											}
										/>
									</div>

									<div className="flex items-center justify-between">
										<Label htmlFor="email-review-request" className="flex-1">
											Review requests
											<p className="text-muted-foreground text-xs">
												Receive an email when there are new posts to review
											</p>
										</Label>
										<Switch
											id="email-review-request"
											checked={emailSettings.reviewRequest}
											onCheckedChange={() => handleEmailToggle("reviewRequest")}
										/>
									</div>
								</div>

								<div className="space-y-4">
									<h3 className="font-medium text-sm">Marketing & Updates</h3>

									<div className="flex items-center justify-between">
										<Label htmlFor="email-newsletter" className="flex-1">
											Newsletter
											<p className="text-muted-foreground text-xs">
												Receive our weekly newsletter with top news and updates
											</p>
										</Label>
										<Switch
											id="email-newsletter"
											checked={emailSettings.newsletter}
											onCheckedChange={() => handleEmailToggle("newsletter")}
										/>
									</div>

									<div className="flex items-center justify-between">
										<Label htmlFor="email-product-updates" className="flex-1">
											Product updates
											<p className="text-muted-foreground text-xs">
												Receive emails about new features and improvements
											</p>
										</Label>
										<Switch
											id="email-product-updates"
											checked={emailSettings.productUpdates}
											onCheckedChange={() =>
												handleEmailToggle("productUpdates")
											}
										/>
									</div>
								</div>
							</TabsContent>

							<TabsContent value="push" className="space-y-4 pt-4">
								<div className="space-y-4">
									<h3 className="font-medium text-sm">Account Notifications</h3>

									<div className="flex items-center justify-between">
										<Label htmlFor="push-new-follower" className="flex-1">
											New follower
											<p className="text-muted-foreground text-xs">
												Receive a push notification when someone follows you
											</p>
										</Label>
										<Switch
											id="push-new-follower"
											checked={pushSettings.newFollower}
											onCheckedChange={() => handlePushToggle("newFollower")}
										/>
									</div>

									<div className="flex items-center justify-between">
										<Label htmlFor="push-post-mention" className="flex-1">
											Post mentions
											<p className="text-muted-foreground text-xs">
												Receive a push notification when someone mentions you in
												a post
											</p>
										</Label>
										<Switch
											id="push-post-mention"
											checked={pushSettings.postMention}
											onCheckedChange={() => handlePushToggle("postMention")}
										/>
									</div>

									<div className="flex items-center justify-between">
										<Label htmlFor="push-comment-mention" className="flex-1">
											Comment mentions
											<p className="text-muted-foreground text-xs">
												Receive a push notification when someone mentions you in
												a comment
											</p>
										</Label>
										<Switch
											id="push-comment-mention"
											checked={pushSettings.commentMention}
											onCheckedChange={() => handlePushToggle("commentMention")}
										/>
									</div>
								</div>

								<div className="space-y-4">
									<h3 className="font-medium text-sm">
										Engagement Notifications
									</h3>

									<div className="flex items-center justify-between">
										<Label htmlFor="push-post-reaction" className="flex-1">
											Post reactions
											<p className="text-muted-foreground text-xs">
												Receive a push notification when someone reacts to your
												post
											</p>
										</Label>
										<Switch
											id="push-post-reaction"
											checked={pushSettings.postReaction}
											onCheckedChange={() => handlePushToggle("postReaction")}
										/>
									</div>

									<div className="flex items-center justify-between">
										<Label htmlFor="push-comment-reaction" className="flex-1">
											Comment reactions
											<p className="text-muted-foreground text-xs">
												Receive a push notification when someone reacts to your
												comment
											</p>
										</Label>
										<Switch
											id="push-comment-reaction"
											checked={pushSettings.commentReaction}
											onCheckedChange={() =>
												handlePushToggle("commentReaction")
											}
										/>
									</div>
								</div>

								<div className="space-y-4">
									<h3 className="font-medium text-sm">
										Credibility & Verification
									</h3>

									<div className="flex items-center justify-between">
										<Label htmlFor="push-credibility-update" className="flex-1">
											Credibility updates
											<p className="text-muted-foreground text-xs">
												Receive a push notification when your credibility score
												changes
											</p>
										</Label>
										<Switch
											id="push-credibility-update"
											checked={pushSettings.credibilityUpdate}
											onCheckedChange={() =>
												handlePushToggle("credibilityUpdate")
											}
										/>
									</div>

									<div className="flex items-center justify-between">
										<Label htmlFor="push-review-request" className="flex-1">
											Review requests
											<p className="text-muted-foreground text-xs">
												Receive a push notification when there are new posts to
												review
											</p>
										</Label>
										<Switch
											id="push-review-request"
											checked={pushSettings.reviewRequest}
											onCheckedChange={() => handlePushToggle("reviewRequest")}
										/>
									</div>
								</div>
							</TabsContent>
						</Tabs>

						{updateSuccess && (
							<Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-900/30 dark:bg-green-900/20 dark:text-green-400">
								<Info className="h-4 w-4" />
								<AlertDescription>
									Notification preferences updated successfully!
								</AlertDescription>
							</Alert>
						)}
					</CardContent>
					<CardFooter>
						<Button type="submit" disabled={isUpdating}>
							{isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
							Save Preferences
						</Button>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}
