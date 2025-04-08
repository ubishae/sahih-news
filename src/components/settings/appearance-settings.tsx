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
import { Info, Laptop, Loader2, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function AppearanceSettings() {
	const { theme, setTheme } = useTheme();
	const [isUpdating, setIsUpdating] = useState(false);
	const [updateSuccess, setUpdateSuccess] = useState(false);

	// Mock appearance settings
	const [appearanceSettings, setAppearanceSettings] = useState({
		fontSize: "medium",
		density: "comfortable",
	});

	const handleRadioChange = (field: string, value: string) => {
		setAppearanceSettings({
			...appearanceSettings,
			[field]: value,
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsUpdating(true);
		setUpdateSuccess(false);

		// In a real app, this would send the updated appearance settings to an API
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
					<CardTitle>Theme</CardTitle>
					<CardDescription>Choose your preferred color theme</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
						<div
							className={`cursor-pointer rounded-lg border p-4 hover:border-primary ${theme === "light" ? "border-primary bg-primary/5" : ""}`}
							onClick={() => setTheme("light")}
						>
							<div className="flex flex-col items-center gap-2">
								<div className="flex h-20 w-20 items-center justify-center rounded-full border bg-white">
									<Sun className="h-10 w-10 text-yellow-500" />
								</div>
								<h3 className="font-medium">Light</h3>
								<p className="text-center text-muted-foreground text-xs">
									Light background with dark text
								</p>
							</div>
						</div>

						<div
							className={`cursor-pointer rounded-lg border p-4 hover:border-primary ${theme === "dark" ? "border-primary bg-primary/5" : ""}`}
							onClick={() => setTheme("dark")}
						>
							<div className="flex flex-col items-center gap-2">
								<div className="flex h-20 w-20 items-center justify-center rounded-full border bg-gray-900">
									<Moon className="h-10 w-10 text-blue-400" />
								</div>
								<h3 className="font-medium">Dark</h3>
								<p className="text-center text-muted-foreground text-xs">
									Dark background with light text
								</p>
							</div>
						</div>

						<div
							className={`cursor-pointer rounded-lg border p-4 hover:border-primary ${theme === "system" ? "border-primary bg-primary/5" : ""}`}
							onClick={() => setTheme("system")}
						>
							<div className="flex flex-col items-center gap-2">
								<div className="flex h-20 w-20 items-center justify-center rounded-full border bg-gradient-to-br from-white to-gray-900">
									<Laptop className="h-10 w-10 text-primary" />
								</div>
								<h3 className="font-medium">System</h3>
								<p className="text-center text-muted-foreground text-xs">
									Follows your system's theme setting
								</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Display Settings</CardTitle>
					<CardDescription>Customize how content is displayed</CardDescription>
				</CardHeader>
				<form onSubmit={handleSubmit}>
					<CardContent className="space-y-6">
						<div className="space-y-4">
							<h3 className="font-medium text-sm">Font Size</h3>
							<RadioGroup
								value={appearanceSettings.fontSize}
								onValueChange={(value) => handleRadioChange("fontSize", value)}
								className="flex flex-col space-y-1"
							>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="small" id="font-small" />
									<Label htmlFor="font-small" className="font-normal text-sm">
										Small
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="medium" id="font-medium" />
									<Label htmlFor="font-medium" className="font-normal">
										Medium (Default)
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="large" id="font-large" />
									<Label htmlFor="font-large" className="font-normal text-lg">
										Large
									</Label>
								</div>
							</RadioGroup>
						</div>

						<div className="space-y-4">
							<h3 className="font-medium text-sm">Content Density</h3>
							<RadioGroup
								value={appearanceSettings.density}
								onValueChange={(value) => handleRadioChange("density", value)}
								className="flex flex-col space-y-1"
							>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="compact" id="density-compact" />
									<Label htmlFor="density-compact" className="font-normal">
										Compact - Show more content with less spacing
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="comfortable"
										id="density-comfortable"
									/>
									<Label htmlFor="density-comfortable" className="font-normal">
										Comfortable - Balanced spacing (Default)
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="spacious" id="density-spacious" />
									<Label htmlFor="density-spacious" className="font-normal">
										Spacious - More breathing room between elements
									</Label>
								</div>
							</RadioGroup>
						</div>

						{updateSuccess && (
							<Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-900/30 dark:bg-green-900/20 dark:text-green-400">
								<Info className="h-4 w-4" />
								<AlertDescription>
									Display settings updated successfully!
								</AlertDescription>
							</Alert>
						)}
					</CardContent>
					<CardFooter>
						<Button type="submit" disabled={isUpdating}>
							{isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
							Save Display Settings
						</Button>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}
