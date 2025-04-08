"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	AlertTriangle,
	Clock,
	Database,
	Download,
	FileDown,
	FileText,
	Loader2,
	Trash2,
} from "lucide-react";
import { useState } from "react";

export default function DataSettings() {
	const [isExporting, setIsExporting] = useState(false);
	const [exportSuccess, setExportSuccess] = useState(false);

	const handleExportData = async () => {
		setIsExporting(true);
		setExportSuccess(false);

		// In a real app, this would request data export from an API
		await new Promise((resolve) => setTimeout(resolve, 2000));

		setIsExporting(false);
		setExportSuccess(true);

		// Hide success message after 5 seconds
		setTimeout(() => {
			setExportSuccess(false);
		}, 5000);
	};

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Database className="h-5 w-5" />
						Data Export
					</CardTitle>
					<CardDescription>Download a copy of your data</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<p className="text-muted-foreground text-sm">
						You can request a copy of your personal data, including your profile
						information, posts, comments, and activity history. The export will
						be prepared and sent to your email address within 24 hours.
					</p>

					<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
						<Card>
							<CardContent className="pt-6">
								<div className="flex flex-col items-center text-center">
									<FileText className="mb-2 h-8 w-8 text-primary" />
									<h3 className="font-medium">Profile Data</h3>
									<p className="mt-1 text-muted-foreground text-xs">
										Your profile information, settings, and preferences
									</p>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="pt-6">
								<div className="flex flex-col items-center text-center">
									<FileDown className="mb-2 h-8 w-8 text-primary" />
									<h3 className="font-medium">Content</h3>
									<p className="mt-1 text-muted-foreground text-xs">
										Your posts, comments, reviews, and saved items
									</p>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="pt-6">
								<div className="flex flex-col items-center text-center">
									<Clock className="mb-2 h-8 w-8 text-primary" />
									<h3 className="font-medium">Activity</h3>
									<p className="mt-1 text-muted-foreground text-xs">
										Your login history, interactions, and usage data
									</p>
								</div>
							</CardContent>
						</Card>
					</div>

					{exportSuccess && (
						<Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-900/30 dark:bg-green-900/20 dark:text-green-400">
							<Download className="h-4 w-4" />
							<AlertDescription>
								Your data export request has been submitted. You will receive an
								email with download instructions within 24 hours.
							</AlertDescription>
						</Alert>
					)}
				</CardContent>
				<CardFooter>
					<Button onClick={handleExportData} disabled={isExporting}>
						{isExporting ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Preparing Export...
							</>
						) : (
							<>
								<Download className="mr-2 h-4 w-4" />
								Request Data Export
							</>
						)}
					</Button>
				</CardFooter>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-destructive">
						<Trash2 className="h-5 w-5" />
						Delete Account
					</CardTitle>
					<CardDescription>
						Permanently delete your account and all associated data
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<Alert variant="destructive">
						<AlertTriangle className="h-4 w-4" />
						<AlertTitle>Warning: This action cannot be undone</AlertTitle>
						<AlertDescription>
							Deleting your account will permanently remove all your data,
							including your profile, posts, comments, reviews, and all other
							content. This action is irreversible and cannot be undone.
						</AlertDescription>
					</Alert>

					<p className="text-muted-foreground text-sm">
						Before deleting your account, you may want to download a copy of
						your data using the export option above.
					</p>

					<div className="rounded-md bg-muted p-4">
						<h3 className="mb-2 font-medium">
							What happens when you delete your account?
						</h3>
						<ul className="space-y-2 text-sm">
							<li className="flex items-start gap-2">
								<AlertTriangle className="mt-0.5 h-4 w-4 text-destructive" />
								<span>
									All your personal information will be permanently deleted
								</span>
							</li>
							<li className="flex items-start gap-2">
								<AlertTriangle className="mt-0.5 h-4 w-4 text-destructive" />
								<span>
									All your posts, comments, and reviews will be removed
								</span>
							</li>
							<li className="flex items-start gap-2">
								<AlertTriangle className="mt-0.5 h-4 w-4 text-destructive" />
								<span>
									Your username will be released and may become available to
									others
								</span>
							</li>
							<li className="flex items-start gap-2">
								<AlertTriangle className="mt-0.5 h-4 w-4 text-destructive" />
								<span>
									You will lose access to your credibility score and reviewer
									status
								</span>
							</li>
						</ul>
					</div>
				</CardContent>
				<CardFooter>
					<Button variant="destructive">
						<Trash2 className="mr-2 h-4 w-4" />
						Delete Account
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
