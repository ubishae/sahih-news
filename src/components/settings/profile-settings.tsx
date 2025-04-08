"use client";

import type React from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Info, Loader2 } from "lucide-react";
import { useState } from "react";

export default function ProfileSettings() {
	// Mock user data - in a real app, this would come from an API or auth context
	const [userData, setUserData] = useState({
		name: "Alex Johnson",
		username: "alexj",
		bio: "Journalist and tech enthusiast. Covering emerging technologies and their impact on society.",
		location: "San Francisco, CA",
		website: "https://alexjohnson.example.com",
		avatar: "/placeholder.svg?height=128&width=128",
	});

	const [isUpdating, setIsUpdating] = useState(false);
	const [updateSuccess, setUpdateSuccess] = useState(false);

	const handleInputChange = (field: string, value: string) => {
		setUserData({
			...userData,
			[field]: value,
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsUpdating(true);
		setUpdateSuccess(false);

		// In a real app, this would send the updated profile data to an API
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
					<CardTitle>Profile Information</CardTitle>
					<CardDescription>
						Update your profile information visible to other users
					</CardDescription>
				</CardHeader>
				<form onSubmit={handleSubmit}>
					<CardContent className="space-y-6">
						<div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
							<div className="relative">
								<Avatar className="h-24 w-24">
									<AvatarImage src={userData.avatar} alt={userData.name} />
									<AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
								</Avatar>
								<Button
									size="icon"
									variant="secondary"
									className="-bottom-2 -right-2 absolute h-8 w-8 rounded-full"
								>
									<Camera className="h-4 w-4" />
									<span className="sr-only">Change avatar</span>
								</Button>
							</div>

							<div className="space-y-1 text-center sm:text-left">
								<h3 className="font-medium">{userData.name}</h3>
								<p className="text-muted-foreground text-sm">
									@{userData.username}
								</p>
								<p className="text-muted-foreground text-xs">
									Upload a square image, at least 400x400px.
								</p>
								<div className="mt-2">
									<Button variant="outline" size="sm">
										Upload New Image
									</Button>
								</div>
							</div>
						</div>

						<div className="grid gap-4 sm:grid-cols-2">
							<div className="space-y-2">
								<Label htmlFor="name">Full Name</Label>
								<Input
									id="name"
									value={userData.name}
									onChange={(e) => handleInputChange("name", e.target.value)}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="username">Username</Label>
								<div className="flex">
									<span className="flex items-center rounded-l-md border border-r-0 bg-muted px-3 text-muted-foreground">
										@
									</span>
									<Input
										id="username"
										value={userData.username}
										onChange={(e) =>
											handleInputChange("username", e.target.value)
										}
										className="rounded-l-none"
									/>
								</div>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="bio">Bio</Label>
							<Textarea
								id="bio"
								value={userData.bio}
								onChange={(e) => handleInputChange("bio", e.target.value)}
								placeholder="Tell others about yourself"
								className="min-h-[100px]"
							/>
							<p className="text-muted-foreground text-xs">
								{userData.bio.length}/160 characters
							</p>
						</div>

						<div className="grid gap-4 sm:grid-cols-2">
							<div className="space-y-2">
								<Label htmlFor="location">Location</Label>
								<Input
									id="location"
									value={userData.location}
									onChange={(e) =>
										handleInputChange("location", e.target.value)
									}
									placeholder="City, Country"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="website">Website</Label>
								<Input
									id="website"
									value={userData.website}
									onChange={(e) => handleInputChange("website", e.target.value)}
									placeholder="https://example.com"
								/>
							</div>
						</div>

						{updateSuccess && (
							<Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-900/30 dark:bg-green-900/20 dark:text-green-400">
								<Info className="h-4 w-4" />
								<AlertDescription>
									Profile updated successfully!
								</AlertDescription>
							</Alert>
						)}
					</CardContent>
					<CardFooter>
						<Button type="submit" disabled={isUpdating}>
							{isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
							Save Changes
						</Button>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}
