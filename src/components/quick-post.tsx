"use client";

import type React from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
	AlertCircle,
	Eye,
	ImageIcon,
	Info,
	LinkIcon,
	Plus,
	TagIcon,
	X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Progress } from "./ui/progress";

interface QuickPostProps {
	buttonVariant?:
		| "default"
		| "outline"
		| "secondary"
		| "ghost"
		| "link"
		| "destructive";
	buttonSize?: "default" | "sm" | "lg" | "icon";
	fullWidth?: boolean;
	className?: string;
}

export default function QuickPost({
	buttonVariant = "default",
	buttonSize = "default",
	fullWidth = false,
	className = "",
}: QuickPostProps) {
	const router = useRouter();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [open, setOpen] = useState(false);

	// Form state
	const [content, setContent] = useState("");
	const [sourceUrl, setSourceUrl] = useState("");
	const [sourceTitle, setSourceTitle] = useState("");
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [media, setMedia] = useState<{
		type: string;
		file: File | null;
		preview: string;
	} | null>(null);
	const [aiAssistance, setAiAssistance] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showPreview, setShowPreview] = useState(false);

	// Character limit from PRD
	const CHARACTER_LIMIT = 500;

	// Available categories
	const CATEGORIES = [
		"Politics",
		"Technology",
		"Health",
		"Science",
		"Business",
		"Entertainment",
		"Sports",
		"Environment",
		"Education",
		"Culture",
		"Local",
		"International",
	];

	// Handle content change with character limit
	const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newContent = e.target.value;
		if (newContent.length <= CHARACTER_LIMIT) {
			setContent(newContent);
		}
	};

	// Toggle a tag selection
	const toggleTag = (tag: string) => {
		if (selectedTags.includes(tag)) {
			setSelectedTags(selectedTags.filter((t) => t !== tag));
		} else if (selectedTags.length < 3) {
			setSelectedTags([...selectedTags, tag]);
		}
	};

	// Handle media file selection
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files || files.length === 0) return;

		const file = files[0];
		const fileType = file?.type.startsWith("image/") ? "image" : "document";

		if (!file) return;

		// Create a preview URL for images
		const preview =
			fileType === "image"
				? URL.createObjectURL(file)
				: "/placeholder.svg?height=100&width=100&text=Document";

		setMedia({ type: fileType, file: file, preview });

		// Reset the file input
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	// Remove media
	const removeMedia = () => {
		if (media?.preview?.startsWith("blob:")) {
			URL.revokeObjectURL(media.preview);
		}
		setMedia(null);
	};

	// Submit the news post
	const submitPost = async () => {
		if (!content.trim()) return;

		setIsSubmitting(true);

		try {
			// In a real app, this would be an API call to submit the post
			// For now, we'll simulate a delay and then redirect
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Close the dialog and reset form
			setOpen(false);
			resetForm();

			// Optionally redirect to the full post page for additional details
			// router.push("/post")
		} catch (error) {
			console.error("Error submitting post:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	// Reset the form
	const resetForm = () => {
		setContent("");
		setSourceUrl("");
		setSourceTitle("");
		setSelectedTags([]);
		if (media?.preview?.startsWith("blob:")) {
			URL.revokeObjectURL(media.preview);
		}
		setMedia(null);
		setAiAssistance(true);
		setShowPreview(false);
	};

	// Check if the form is valid for submission
	const isFormValid =
		content.trim().length > 0 && content.length <= CHARACTER_LIMIT;

	// Calculate the percentage of the character limit used
	const characterPercentage = (content.length / CHARACTER_LIMIT) * 100;

	// Sample user data for preview
	const currentUser = {
		name: "Alex Johnson",
		handle: "@alexj",
		avatar: "/placeholder.svg?height=40&width=40",
		isVerified: false,
		credibilityScore: 85,
	};

	return (
		<Dialog
			open={open}
			onOpenChange={(newOpen) => {
				setOpen(newOpen);
				if (!newOpen) resetForm();
			}}
		>
			<DialogTrigger asChild>
				<Button
					variant={buttonVariant}
					size={buttonSize}
					className={`${fullWidth ? "w-full" : ""} ${className}`}
				>
					{buttonSize === "icon" ? <Plus className="h-4 w-4" /> : "Post News"}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>Post News</DialogTitle>
					<DialogDescription>
						Share news, facts, or updates with the community.
					</DialogDescription>
				</DialogHeader>

				<div className="grid gap-4 py-4">
					{showPreview ? (
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<h3 className="font-medium text-sm">Preview</h3>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => setShowPreview(false)}
									className="h-8"
								>
									Edit
								</Button>
							</div>

							<div className="rounded-lg border p-4">
								<div className="mb-3 flex items-center gap-3">
									<Avatar>
										<AvatarImage
											src={currentUser.avatar}
											alt={currentUser.name}
										/>
										<AvatarFallback>
											{currentUser.name.charAt(0)}
										</AvatarFallback>
									</Avatar>
									<div>
										<div className="font-medium">{currentUser.name}</div>
										<div className="text-muted-foreground text-sm">
											{currentUser.handle}
										</div>
									</div>
								</div>

								<p className="mb-3">{content}</p>

								{media && media.type === "image" && (
									<div className="mb-3 overflow-hidden rounded-lg">
										<img
											src={media.preview || "/placeholder.svg"}
											alt="Preview"
											className="max-h-[200px] w-full object-cover"
										/>
									</div>
								)}

								{sourceUrl && (
									<div className="mb-3">
										<a
											href={sourceUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center gap-1 text-blue-600 text-sm hover:underline dark:text-blue-400"
										>
											<LinkIcon className="h-3 w-3" />
											{sourceTitle || sourceUrl}
										</a>
									</div>
								)}

								{selectedTags.length > 0 && (
									<div className="mb-3 flex flex-wrap gap-2">
										{selectedTags.map((tag) => (
											<Badge key={tag} variant="secondary">
												{tag}
											</Badge>
										))}
									</div>
								)}

								<div className="text-muted-foreground text-xs">
									This post will be marked as "Unverified" until reviewed by the
									community.
								</div>
							</div>
						</div>
					) : (
						<>
							<div className="space-y-2">
								<div className="flex justify-between">
									<Label htmlFor="content">
										Content (max {CHARACTER_LIMIT} characters)
									</Label>
									<span
										className={`text-sm ${content.length >= CHARACTER_LIMIT * 0.9 ? "text-red-500" : "text-muted-foreground"}`}
									>
										{content.length}/{CHARACTER_LIMIT}
									</span>
								</div>
								<Textarea
									id="content"
									placeholder="Share news, facts, or updates..."
									value={content}
									onChange={handleContentChange}
									className="min-h-[120px] resize-none"
								/>
								<div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
									<Progress value={characterPercentage} />
								</div>
							</div>

							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<div>
									<Label htmlFor="source-url" className="mb-2 block">
										Source URL
									</Label>
									<Input
										id="source-url"
										placeholder="https://example.com/article"
										value={sourceUrl}
										onChange={(e) => setSourceUrl(e.target.value)}
									/>
								</div>
								<div>
									<Label htmlFor="source-title" className="mb-2 block">
										Source Title (Optional)
									</Label>
									<Input
										id="source-title"
										placeholder="Article or source name"
										value={sourceTitle}
										onChange={(e) => setSourceTitle(e.target.value)}
									/>
								</div>
							</div>

							<div className="space-y-2">
								<Label className="block">Categories (max 3)</Label>
								<div className="flex flex-wrap gap-2">
									{CATEGORIES.map((category) => (
										<Badge
											key={category}
											variant={
												selectedTags.includes(category) ? "default" : "outline"
											}
											className="cursor-pointer hover:bg-accent"
											onClick={() => toggleTag(category)}
										>
											{category}
											{selectedTags.includes(category) && (
												<X className="ml-1 h-3 w-3" />
											)}
										</Badge>
									))}
								</div>
							</div>

							<div className="space-y-2">
								<Label className="block">Add Media (Optional)</Label>
								<div className="flex gap-2">
									{media ? (
										<div className="group relative">
											<div className="aspect-square h-20 w-20 overflow-hidden rounded-md border bg-muted">
												{media.type === "image" ? (
													<img
														src={media.preview || "/placeholder.svg"}
														alt="Preview"
														className="h-full w-full object-cover"
													/>
												) : (
													<div className="flex h-full w-full items-center justify-center">
														<ImageIcon className="h-8 w-8 text-muted-foreground" />
													</div>
												)}
											</div>
											<Button
												variant="destructive"
												size="icon"
												className="absolute top-1 right-1 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
												onClick={removeMedia}
											>
												<X className="h-3 w-3" />
											</Button>
										</div>
									) : (
										<Button
											variant="outline"
											className="flex h-20 w-20 flex-col items-center justify-center gap-2"
											onClick={() => fileInputRef.current?.click()}
										>
											<ImageIcon className="h-6 w-6" />
											<span className="text-xs">Add Image</span>
										</Button>
									)}
									<Input
										type="file"
										ref={fileInputRef}
										className="hidden"
										accept="image/*"
										onChange={handleFileChange}
									/>
								</div>
							</div>

							<div className="flex items-center space-x-2">
								<Switch
									id="ai-assistance"
									checked={aiAssistance}
									onCheckedChange={setAiAssistance}
								/>
								<Label
									htmlFor="ai-assistance"
									className="flex items-center gap-1"
								>
									<Info className="h-4 w-4 text-blue-500" />
									Use AI assistance to suggest fact-checks
								</Label>
							</div>

							<Alert variant="default" className="bg-muted/50">
								<AlertCircle className="h-4 w-4" />
								<AlertDescription className="text-sm">
									Your post will be marked as "Unverified" until reviewed by the
									community. Adding credible sources increases the
									trustworthiness of your post.
								</AlertDescription>
							</Alert>
						</>
					)}
				</div>

				<DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-between">
					<div className="flex gap-2">
						<Popover>
							<PopoverTrigger asChild>
								<Button variant="outline" size="sm" className="h-9">
									<TagIcon className="mr-2 h-4 w-4" />
									Advanced Options
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-80" align="start">
								<div className="mb-2 font-medium text-sm">Advanced Options</div>
								<p className="mb-4 text-muted-foreground text-xs">
									For more detailed posting options, use the full post editor.
								</p>
								<Button
									variant="outline"
									size="sm"
									className="w-full"
									onClick={() => {
										setOpen(false);
										router.push("/post");
									}}
								>
									Open Full Post Editor
								</Button>
							</PopoverContent>
						</Popover>

						{!showPreview && (
							<Button
								variant="outline"
								size="sm"
								className="h-9"
								onClick={() => setShowPreview(true)}
								disabled={!isFormValid}
							>
								<Eye className="mr-2 h-4 w-4" />
								Preview
							</Button>
						)}
					</div>

					<div className="flex w-full gap-2 sm:w-auto">
						<Button
							variant="ghost"
							onClick={() => setOpen(false)}
							className="flex-1 sm:flex-auto"
						>
							Cancel
						</Button>
						<Button
							onClick={submitPost}
							disabled={!isFormValid || isSubmitting}
							className="flex-1 sm:flex-auto"
						>
							{isSubmitting ? "Posting..." : "Post"}
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
