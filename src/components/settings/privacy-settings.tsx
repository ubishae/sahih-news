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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Info, Loader2, Lock } from "lucide-react";
import { useState } from "react";

export default function PrivacySettings() {
	const [isUpdating, setIsUpdating] = useState(false);
	const [updateSuccess, setUpdateSuccess] = useState(false);

	// Mock privacy settings
	const [privacySettings, setPrivacySettings] = useState({
		profileVisibility: "public",
		activityVisibility: "followers",
		locationVisibility: "private",
		showCredibilityScore: true,
		allowMentions: "anyone",
		allowMessages: "followers",
		searchEngineIndexing: true,
		dataCollection: true,
		personalization: true,
	});

	const handleRadioChange = (field: string, value: string) => {
		setPrivacySettings({
			...privacySettings,
			[field]: value,
		});
	};

	const handleSwitchToggle = (field: string) => {
		setPrivacySettings({
			...privacySettings,
			[field]: !privacySettings[field as keyof typeof privacySettings],
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsUpdating(true);
		setUpdateSuccess(false);

		// In a real app, this would send the updated privacy settings to an API
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
					<CardTitle>Privacy Settings</CardTitle>
					<CardDescription>
						Control who can see your information and how it's used
					</CardDescription>
				</CardHeader>
				<form onSubmit={handleSubmit}>
					<CardContent className="space-y-6">
						<div className="space-y-4">
							<h3 className="font-medium text-sm">Profile Privacy</h3>

							<div className="space-y-2">
								<Label>Profile Visibility</Label>
								<RadioGroup
									value={privacySettings.profileVisibility}
									onValueChange={(value) =>
										handleRadioChange("profileVisibility", value)
									}
									className="flex flex-col space-y-1"
								>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="public" id="profile-public" />
										<Label htmlFor="profile-public" className="font-normal">
											Public - Anyone can view your profile
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="followers" id="profile-followers" />
										<Label htmlFor="profile-followers" className="font-normal">
											Followers Only - Only people who follow you can view your
											profile
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="private" id="profile-private" />
										<Label htmlFor="profile-private" className="font-normal">
											Private - Only you can view your profile
										</Label>
									</div>
								</RadioGroup>
							</div>

							<div className="space-y-2">
								<Label>Activity Visibility</Label>
								<RadioGroup
									value={privacySettings.activityVisibility}
									onValueChange={(value) =>
										handleRadioChange("activityVisibility", value)
									}
									className="flex flex-col space-y-1"
								>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="public" id="activity-public" />
										<Label htmlFor="activity-public" className="font-normal">
											Public - Anyone can see your posts, comments, and reviews
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="followers" id="activity-followers" />
										<Label htmlFor="activity-followers" className="font-normal">
											Followers Only - Only people who follow you can see your
											activity
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="private" id="activity-private" />
										<Label htmlFor="activity-private" className="font-normal">
											Private - Only you can see your activity
										</Label>
									</div>
								</RadioGroup>
							</div>

							<div className="space-y-2">
								<Label>Location Visibility</Label>
								<RadioGroup
									value={privacySettings.locationVisibility}
									onValueChange={(value) =>
										handleRadioChange("locationVisibility", value)
									}
									className="flex flex-col space-y-1"
								>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="public" id="location-public" />
										<Label htmlFor="location-public" className="font-normal">
											Public - Show your location to everyone
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="followers" id="location-followers" />
										<Label htmlFor="location-followers" className="font-normal">
											Followers Only - Show your location only to followers
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="private" id="location-private" />
										<Label htmlFor="location-private" className="font-normal">
											Private - Don't show your location to anyone
										</Label>
									</div>
								</RadioGroup>
							</div>

							<div className="flex items-center justify-between">
								<Label htmlFor="show-credibility" className="flex-1">
									Show credibility score
									<p className="text-muted-foreground text-xs">
										Display your credibility score on your profile
									</p>
								</Label>
								<Switch
									id="show-credibility"
									checked={privacySettings.showCredibilityScore}
									onCheckedChange={() =>
										handleSwitchToggle("showCredibilityScore")
									}
								/>
							</div>
						</div>

						<div className="space-y-4">
							<h3 className="font-medium text-sm">Interactions</h3>

							<div className="space-y-2">
								<Label>Who can mention you</Label>
								<RadioGroup
									value={privacySettings.allowMentions}
									onValueChange={(value) =>
										handleRadioChange("allowMentions", value)
									}
									className="flex flex-col space-y-1"
								>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="anyone" id="mentions-anyone" />
										<Label htmlFor="mentions-anyone" className="font-normal">
											Anyone - Anyone can mention you in posts and comments
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="followers" id="mentions-followers" />
										<Label htmlFor="mentions-followers" className="font-normal">
											Followers Only - Only people who follow you can mention
											you
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="nobody" id="mentions-nobody" />
										<Label htmlFor="mentions-nobody" className="font-normal">
											Nobody - No one can mention you
										</Label>
									</div>
								</RadioGroup>
							</div>

							<div className="space-y-2">
								<Label>Who can message you</Label>
								<RadioGroup
									value={privacySettings.allowMessages}
									onValueChange={(value) =>
										handleRadioChange("allowMessages", value)
									}
									className="flex flex-col space-y-1"
								>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="anyone" id="messages-anyone" />
										<Label htmlFor="messages-anyone" className="font-normal">
											Anyone - Anyone can send you direct messages
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="followers" id="messages-followers" />
										<Label htmlFor="messages-followers" className="font-normal">
											Followers Only - Only people who follow you can message
											you
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="nobody" id="messages-nobody" />
										<Label htmlFor="messages-nobody" className="font-normal">
											Nobody - No one can message you
										</Label>
									</div>
								</RadioGroup>
							</div>
						</div>

						<div className="space-y-4">
							<h3 className="font-medium text-sm">Data & Personalization</h3>

							<div className="flex items-center justify-between">
								<Label htmlFor="search-engine" className="flex-1">
									Search engine indexing
									<p className="text-muted-foreground text-xs">
										Allow search engines to index your profile
									</p>
								</Label>
								<Switch
									id="search-engine"
									checked={privacySettings.searchEngineIndexing}
									onCheckedChange={() =>
										handleSwitchToggle("searchEngineIndexing")
									}
								/>
							</div>

							<div className="flex items-center justify-between">
								<Label htmlFor="data-collection" className="flex-1">
									Data collection
									<p className="text-muted-foreground text-xs">
										Allow us to collect usage data to improve our services
									</p>
								</Label>
								<Switch
									id="data-collection"
									checked={privacySettings.dataCollection}
									onCheckedChange={() => handleSwitchToggle("dataCollection")}
								/>
							</div>

							<div className="flex items-center justify-between">
								<Label htmlFor="personalization" className="flex-1">
									Personalization
									<p className="text-muted-foreground text-xs">
										Allow us to personalize your experience based on your
										activity
									</p>
								</Label>
								<Switch
									id="personalization"
									checked={privacySettings.personalization}
									onCheckedChange={() => handleSwitchToggle("personalization")}
								/>
							</div>
						</div>

						{updateSuccess && (
							<Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-900/30 dark:bg-green-900/20 dark:text-green-400">
								<Info className="h-4 w-4" />
								<AlertDescription>
									Privacy settings updated successfully!
								</AlertDescription>
							</Alert>
						)}
					</CardContent>
					<CardFooter>
						<Button type="submit" disabled={isUpdating}>
							{isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
							Save Privacy Settings
						</Button>
					</CardFooter>
				</form>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Lock className="h-5 w-5" />
						Privacy Policy
					</CardTitle>
					<CardDescription>
						Our commitment to protecting your data
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p className="mb-4 text-muted-foreground text-sm">
						We take your privacy seriously. Our privacy policy explains how we
						collect, use, and protect your personal information.
					</p>
					<Button variant="outline">View Privacy Policy</Button>
				</CardContent>
			</Card>
		</div>
	);
}
