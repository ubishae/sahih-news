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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Info, Loader2, X } from "lucide-react";
import { useState } from "react";

export default function ContentSettings() {
	const [isUpdating, setIsUpdating] = useState(false);
	const [updateSuccess, setUpdateSuccess] = useState(false);

	// Mock content settings
	const [contentSettings, setContentSettings] = useState({
		defaultFeed: "latest",
		contentLanguage: "en",
		contentFiltering: "moderate",
		autoplayMedia: true,
		showSensitiveContent: false,
		reducedMotion: false,
		preferredCategories: ["Technology", "Science", "Health"],
		mutedKeywords: ["spam", "clickbait"],
	});

	const [newKeyword, setNewKeyword] = useState("");

	const handleRadioChange = (field: string, value: string) => {
		setContentSettings({
			...contentSettings,
			[field]: value,
		});
	};

	const handleSelectChange = (field: string, value: string) => {
		setContentSettings({
			...contentSettings,
			[field]: value,
		});
	};

	const handleSwitchToggle = (field: string) => {
		setContentSettings({
			...contentSettings,
			[field]: !contentSettings[field as keyof typeof contentSettings],
		});
	};

	const toggleCategory = (category: string) => {
		if (contentSettings.preferredCategories.includes(category)) {
			setContentSettings({
				...contentSettings,
				preferredCategories: contentSettings.preferredCategories.filter(
					(c) => c !== category,
				),
			});
		} else {
			setContentSettings({
				...contentSettings,
				preferredCategories: [...contentSettings.preferredCategories, category],
			});
		}
	};

	const addKeyword = () => {
		if (
			newKeyword.trim() &&
			!contentSettings.mutedKeywords.includes(newKeyword.trim())
		) {
			setContentSettings({
				...contentSettings,
				mutedKeywords: [...contentSettings.mutedKeywords, newKeyword.trim()],
			});
			setNewKeyword("");
		}
	};

	const removeKeyword = (keyword: string) => {
		setContentSettings({
			...contentSettings,
			mutedKeywords: contentSettings.mutedKeywords.filter((k) => k !== keyword),
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsUpdating(true);
		setUpdateSuccess(false);

		// In a real app, this would send the updated content settings to an API
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

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Content Preferences</CardTitle>
					<CardDescription>
						Customize your feed and content experience
					</CardDescription>
				</CardHeader>
				<form onSubmit={handleSubmit}>
					<CardContent className="space-y-6">
						<div className="space-y-4">
							<h3 className="font-medium text-sm">Feed Preferences</h3>

							<div className="space-y-2">
								<Label>Default Feed</Label>
								<RadioGroup
									value={contentSettings.defaultFeed}
									onValueChange={(value) =>
										handleRadioChange("defaultFeed", value)
									}
									className="flex flex-col space-y-1"
								>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="latest" id="feed-latest" />
										<Label htmlFor="feed-latest" className="font-normal">
											Latest - Show most recent posts first
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="algorithmic" id="feed-algorithmic" />
										<Label htmlFor="feed-algorithmic" className="font-normal">
											For You - Personalized feed based on your interests
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="verified" id="feed-verified" />
										<Label htmlFor="feed-verified" className="font-normal">
											Verified Only - Show only verified content
										</Label>
									</div>
								</RadioGroup>
							</div>

							<div className="space-y-2">
								<Label htmlFor="content-language">Content Language</Label>
								<Select
									value={contentSettings.contentLanguage}
									onValueChange={(value) =>
										handleSelectChange("contentLanguage", value)
									}
								>
									<SelectTrigger id="content-language">
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
							</div>

							<div className="space-y-2">
								<Label>Content Filtering</Label>
								<RadioGroup
									value={contentSettings.contentFiltering}
									onValueChange={(value) =>
										handleRadioChange("contentFiltering", value)
									}
									className="flex flex-col space-y-1"
								>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="strict" id="filter-strict" />
										<Label htmlFor="filter-strict" className="font-normal">
											Strict - Filter out potentially sensitive content
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="moderate" id="filter-moderate" />
										<Label htmlFor="filter-moderate" className="font-normal">
											Moderate - Filter out highly sensitive content
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="none" id="filter-none" />
										<Label htmlFor="filter-none" className="font-normal">
											None - Don't filter content
										</Label>
									</div>
								</RadioGroup>
							</div>
						</div>

						<div className="space-y-4">
							<h3 className="font-medium text-sm">Media & Accessibility</h3>

							<div className="flex items-center justify-between">
								<Label htmlFor="autoplay-media" className="flex-1">
									Autoplay media
									<p className="text-muted-foreground text-xs">
										Automatically play videos and animations
									</p>
								</Label>
								<Switch
									id="autoplay-media"
									checked={contentSettings.autoplayMedia}
									onCheckedChange={() => handleSwitchToggle("autoplayMedia")}
								/>
							</div>

							<div className="flex items-center justify-between">
								<Label htmlFor="sensitive-content" className="flex-1">
									Show sensitive content
									<p className="text-muted-foreground text-xs">
										Display content that may be sensitive or graphic
									</p>
								</Label>
								<Switch
									id="sensitive-content"
									checked={contentSettings.showSensitiveContent}
									onCheckedChange={() =>
										handleSwitchToggle("showSensitiveContent")
									}
								/>
							</div>

							<div className="flex items-center justify-between">
								<Label htmlFor="reduced-motion" className="flex-1">
									Reduced motion
									<p className="text-muted-foreground text-xs">
										Minimize animations and motion effects
									</p>
								</Label>
								<Switch
									id="reduced-motion"
									checked={contentSettings.reducedMotion}
									onCheckedChange={() => handleSwitchToggle("reducedMotion")}
								/>
							</div>
						</div>

						<div className="space-y-4">
							<h3 className="font-medium text-sm">Content Categories</h3>
							<p className="text-muted-foreground text-xs">
								Select categories you're interested in to personalize your feed
							</p>

							<div className="flex flex-wrap gap-2">
								{categories.map((category) => (
									<Badge
										key={category}
										variant={
											contentSettings.preferredCategories.includes(category)
												? "default"
												: "outline"
										}
										className="cursor-pointer hover:bg-accent"
										onClick={() => toggleCategory(category)}
									>
										{category}
										{contentSettings.preferredCategories.includes(category) && (
											<X className="ml-1 h-3 w-3" />
										)}
									</Badge>
								))}
							</div>
						</div>

						<div className="space-y-4">
							<h3 className="font-medium text-sm">Muted Keywords</h3>
							<p className="text-muted-foreground text-xs">
								Posts containing these keywords will be hidden from your feed
							</p>

							<div className="flex gap-2">
								<input
									type="text"
									value={newKeyword}
									onChange={(e) => setNewKeyword(e.target.value)}
									placeholder="Add a keyword to mute"
									className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											e.preventDefault();
											addKeyword();
										}
									}}
								/>
								<Button type="button" onClick={addKeyword}>
									Add
								</Button>
							</div>

							<div className="flex flex-wrap gap-2">
								{contentSettings.mutedKeywords.map((keyword) => (
									<Badge
										key={keyword}
										variant="secondary"
										className="flex items-center gap-1"
									>
										{keyword}
										<Button
											variant="ghost"
											size="icon"
											className="ml-1 h-4 w-4 p-0"
											onClick={() => removeKeyword(keyword)}
										>
											<X className="h-3 w-3" />
										</Button>
									</Badge>
								))}
								{contentSettings.mutedKeywords.length === 0 && (
									<p className="text-muted-foreground text-xs">
										No muted keywords
									</p>
								)}
							</div>
						</div>

						{updateSuccess && (
							<Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-900/30 dark:bg-green-900/20 dark:text-green-400">
								<Info className="h-4 w-4" />
								<AlertDescription>
									Content preferences updated successfully!
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
