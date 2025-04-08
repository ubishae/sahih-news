"use client";

import type React from "react";

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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle } from "lucide-react";
import { useState } from "react";

export function ContactSupport() {
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// In a real app, this would send the form data to an API
		setSubmitted(true);
	};

	if (submitted) {
		return (
			<section className="py-10">
				<h2 className="mb-6 font-bold text-2xl">Contact Support</h2>
				<Card>
					<CardContent className="pt-6">
						<div className="flex flex-col items-center justify-center space-y-4 py-10 text-center">
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
								<CheckCircle className="h-6 w-6 text-green-600" />
							</div>
							<h3 className="font-semibold text-xl">
								Support Request Submitted
							</h3>
							<p className="max-w-md text-muted-foreground">
								Thank you for contacting us. Our support team will review your
								request and get back to you within 24-48 hours.
							</p>
							<Button onClick={() => setSubmitted(false)}>
								Submit Another Request
							</Button>
						</div>
					</CardContent>
				</Card>
			</section>
		);
	}

	return (
		<section className="py-10">
			<h2 className="mb-6 font-bold text-2xl">Contact Support</h2>
			<Card>
				<CardHeader>
					<CardTitle>Get in Touch</CardTitle>
					<CardDescription>
						Can't find what you're looking for? Send us a message and our
						support team will help you.
					</CardDescription>
				</CardHeader>
				<form onSubmit={handleSubmit}>
					<CardContent className="space-y-4">
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							<div className="space-y-2">
								<Label htmlFor="name">Name</Label>
								<Input id="name" placeholder="Your name" required />
							</div>
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="Your email address"
									required
								/>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="topic">Topic</Label>
							<Select>
								<SelectTrigger id="topic">
									<SelectValue placeholder="Select a topic" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="account">Account Issues</SelectItem>
									<SelectItem value="verification">
										Verification Process
									</SelectItem>
									<SelectItem value="reporting">Reporting Content</SelectItem>
									<SelectItem value="technical">Technical Problems</SelectItem>
									<SelectItem value="feedback">
										Feedback & Suggestions
									</SelectItem>
									<SelectItem value="other">Other</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label htmlFor="message">Message</Label>
							<Textarea
								id="message"
								placeholder="Describe your issue or question in detail..."
								className="min-h-[150px]"
								required
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="attachments">Attachments (Optional)</Label>
							<Input id="attachments" type="file" />
							<p className="text-muted-foreground text-xs">
								You can upload screenshots or other files to help us understand
								your issue better. Maximum file size: 5MB.
							</p>
						</div>
					</CardContent>
					<CardFooter>
						<Button type="submit" className="w-full sm:w-auto">
							Submit Support Request
						</Button>
					</CardFooter>
				</form>
			</Card>
		</section>
	);
}
