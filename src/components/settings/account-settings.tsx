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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	AlertTriangle,
	Facebook,
	Github,
	Info,
	Linkedin,
	Loader2,
	Mail,
	Twitter,
} from "lucide-react";
import { useState } from "react";

export default function AccountSettings() {
	const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
	const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
	const [emailSuccess, setEmailSuccess] = useState(false);
	const [passwordSuccess, setPasswordSuccess] = useState(false);

	// Mock form data
	const [emailForm, setEmailForm] = useState({
		email: "alex.johnson@example.com",
		password: "",
	});

	const [passwordForm, setPasswordForm] = useState({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});

	const handleEmailChange = (field: string, value: string) => {
		setEmailForm({
			...emailForm,
			[field]: value,
		});
	};

	const handlePasswordChange = (field: string, value: string) => {
		setPasswordForm({
			...passwordForm,
			[field]: value,
		});
	};

	const handleEmailSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsUpdatingEmail(true);
		setEmailSuccess(false);

		// In a real app, this would send the updated email to an API
		await new Promise((resolve) => setTimeout(resolve, 1000));

		setIsUpdatingEmail(false);
		setEmailSuccess(true);
		setEmailForm({ ...emailForm, password: "" });

		// Hide success message after 3 seconds
		setTimeout(() => {
			setEmailSuccess(false);
		}, 3000);
	};

	const handlePasswordSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsUpdatingPassword(true);
		setPasswordSuccess(false);

		// In a real app, this would send the updated password to an API
		await new Promise((resolve) => setTimeout(resolve, 1000));

		setIsUpdatingPassword(false);
		setPasswordSuccess(true);
		setPasswordForm({
			currentPassword: "",
			newPassword: "",
			confirmPassword: "",
		});

		// Hide success message after 3 seconds
		setTimeout(() => {
			setPasswordSuccess(false);
		}, 3000);
	};

	// Mock connected accounts
	const connectedAccounts = [
		{ name: "Google", connected: true, icon: <Mail className="h-4 w-4" /> },
		{
			name: "Facebook",
			connected: false,
			icon: <Facebook className="h-4 w-4" />,
		},
		{ name: "Twitter", connected: true, icon: <Twitter className="h-4 w-4" /> },
		{
			name: "LinkedIn",
			connected: false,
			icon: <Linkedin className="h-4 w-4" />,
		},
		{ name: "GitHub", connected: false, icon: <Github className="h-4 w-4" /> },
	];

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Email Address</CardTitle>
					<CardDescription>
						Update your email address associated with your account
					</CardDescription>
				</CardHeader>
				<form onSubmit={handleEmailSubmit}>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								value={emailForm.email}
								onChange={(e) => handleEmailChange("email", e.target.value)}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="current-password">Current Password</Label>
							<Input
								id="current-password"
								type="password"
								value={emailForm.password}
								onChange={(e) => handleEmailChange("password", e.target.value)}
								placeholder="Enter your current password to confirm"
							/>
						</div>

						{emailSuccess && (
							<Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-900/30 dark:bg-green-900/20 dark:text-green-400">
								<Info className="h-4 w-4" />
								<AlertDescription>Email updated successfully!</AlertDescription>
							</Alert>
						)}
					</CardContent>
					<CardFooter>
						<Button
							type="submit"
							disabled={isUpdatingEmail || !emailForm.password}
						>
							{isUpdatingEmail && (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							)}
							Update Email
						</Button>
					</CardFooter>
				</form>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Password</CardTitle>
					<CardDescription>
						Change your password to keep your account secure
					</CardDescription>
				</CardHeader>
				<form onSubmit={handlePasswordSubmit}>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="current-password-2">Current Password</Label>
							<Input
								id="current-password-2"
								type="password"
								value={passwordForm.currentPassword}
								onChange={(e) =>
									handlePasswordChange("currentPassword", e.target.value)
								}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="new-password">New Password</Label>
							<Input
								id="new-password"
								type="password"
								value={passwordForm.newPassword}
								onChange={(e) =>
									handlePasswordChange("newPassword", e.target.value)
								}
							/>
							<p className="text-muted-foreground text-xs">
								Password must be at least 8 characters and include a number and
								a special character.
							</p>
						</div>

						<div className="space-y-2">
							<Label htmlFor="confirm-password">Confirm New Password</Label>
							<Input
								id="confirm-password"
								type="password"
								value={passwordForm.confirmPassword}
								onChange={(e) =>
									handlePasswordChange("confirmPassword", e.target.value)
								}
							/>
						</div>

						{passwordSuccess && (
							<Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-900/30 dark:bg-green-900/20 dark:text-green-400">
								<Info className="h-4 w-4" />
								<AlertDescription>
									Password updated successfully!
								</AlertDescription>
							</Alert>
						)}
					</CardContent>
					<CardFooter>
						<Button
							type="submit"
							disabled={
								isUpdatingPassword ||
								!passwordForm.currentPassword ||
								!passwordForm.newPassword ||
								!passwordForm.confirmPassword ||
								passwordForm.newPassword !== passwordForm.confirmPassword
							}
						>
							{isUpdatingPassword && (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							)}
							Update Password
						</Button>
					</CardFooter>
				</form>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Connected Accounts</CardTitle>
					<CardDescription>
						Connect your social media accounts for easier login and sharing
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{connectedAccounts.map((account, index) => (
							<div key={index} className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
										{account.icon}
									</div>
									<div>
										<p className="font-medium">{account.name}</p>
										<p className="text-muted-foreground text-xs">
											{account.connected ? "Connected" : "Not connected"}
										</p>
									</div>
								</div>
								<Button
									variant={account.connected ? "outline" : "default"}
									size="sm"
								>
									{account.connected ? "Disconnect" : "Connect"}
								</Button>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Danger Zone</CardTitle>
					<CardDescription>
						Irreversible and destructive actions
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<Alert variant="destructive">
						<AlertTriangle className="h-4 w-4" />
						<AlertDescription>
							Deleting your account will permanently remove all your data,
							posts, comments, and activity. This action cannot be undone.
						</AlertDescription>
					</Alert>
					<Button variant="destructive">Delete Account</Button>
				</CardContent>
			</Card>
		</div>
	);
}
