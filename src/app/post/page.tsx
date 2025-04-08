"use client";

import type React from "react";

import Header from "@/components/header";
import NewsPost from "@/components/news-post";
import RichTextEditor from "@/components/text-editor";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	AlertCircle,
	CheckCircle,
	Eye,
	FileText,
	ImageIcon,
	Info,
	LinkIcon,
	Plus,
	Send,
	TagIcon,
	Upload,
	X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

// Available categories for news posts
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

export default function PostNewsPage() {
	const router = useRouter();
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Form state
	const [content, setContent] = useState("");
	const [sources, setSources] = useState<{ url: string; title: string }[]>([]);
	const [newSourceUrl, setNewSourceUrl] = useState("");
	const [newSourceTitle, setNewSourceTitle] = useState("");
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [customTag, setCustomTag] = useState("");
	const [media, setMedia] = useState<
		{ type: string; file: File | null; preview: string }[]
	>([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [aiAssistance, setAiAssistance] = useState(true);
	const [locationTag, setLocationTag] = useState("");

	// Character limit from PRD
	const CHARACTER_LIMIT = 500;

	// Handle content change with character limit
	const handleContentChange = (newContent: string) => {
		if (newContent.length <= CHARACTER_LIMIT) {
			setContent(newContent);
		}
	};

	// Add a new source
	const addSource = () => {
		if (newSourceUrl.trim() && newSourceTitle.trim()) {
			setSources([...sources, { url: newSourceUrl, title: newSourceTitle }]);
			setNewSourceUrl("");
			setNewSourceTitle("");
		}
	};

	// Remove a source
	const removeSource = (index: number) => {
		const newSources = [...sources];
		newSources.splice(index, 1);
		setSources(newSources);
	};

	// Toggle a tag selection
	const toggleTag = (tag: string) => {
		if (selectedTags.includes(tag)) {
			setSelectedTags(selectedTags.filter((t) => t !== tag));
		} else {
			setSelectedTags([...selectedTags, tag]);
		}
	};

	// Add a custom tag
	const addCustomTag = () => {
		if (customTag.trim() && !selectedTags.includes(customTag)) {
			setSelectedTags([...selectedTags, customTag]);
			setCustomTag("");
		}
	};

	// Handle media file selection
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files || files.length === 0) return;

		const file = files[0];
		const fileType = file!.type.startsWith("image/") ? "image" : "document";

		// Create a preview URL for images
		const preview =
			fileType === "image"
				? URL.createObjectURL(file!)
				: "/placeholder.svg?height=100&width=100&text=Document";

		setMedia([...media, { type: fileType, file: file!, preview }]);

		// Reset the file input
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	// Remove a media item
	const removeMedia = (index: number) => {
		const newMedia = [...media];

		// Revoke the object URL to avoid memory leaks
		if (
			newMedia[index]?.preview &&
			typeof newMedia[index].preview === 'string' &&
			newMedia[index].preview.startsWith("blob:")
		) {
			URL.revokeObjectURL(newMedia[index].preview);
		}

		newMedia.splice(index, 1);
		setMedia(newMedia);
	};

	// Submit the news post
	const submitPost = async () => {
		if (!content.trim()) return;

		setIsSubmitting(true);

		try {
			// In a real app, this would be an API call to submit the post
			// For now, we'll simulate a delay and then redirect
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// Redirect to the home page after successful submission
			router.push("/");
		} catch (error) {
			console.error("Error submitting post:", error);
			setIsSubmitting(false);
		}
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
		<div className="min-h-screen bg-background">
			<Header />
			<main className="container mx-auto max-w-4xl px-4 py-6">
				<h1 className="mb-6 font-bold text-2xl">Post News</h1>

				<Tabs defaultValue="compose" className="w-full">
					<TabsList className="mb-6 grid w-full grid-cols-2">
						<TabsTrigger value="compose" className="flex items-center gap-2">
							<Send className="h-4 w-4" />
							Compose
						</TabsTrigger>
						<TabsTrigger value="preview" className="flex items-center gap-2">
							<Eye className="h-4 w-4" />
							Preview
						</TabsTrigger>
					</TabsList>

					<TabsContent value="compose" className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="text-lg">News Content</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
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
									{/* <Textarea
                    id="content"
                    placeholder="Share news, facts, or updates..."
                    value={content}
                    onChange={handleContentChange}
                    className="min-h-[150px] resize-none"
                  /> */}
									<RichTextEditor
										value={content}
										onChange={handleContentChange}
									/>
									<div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
										<div
											className={`h-full ${characterPercentage >= 90 ? "bg-red-500" : characterPercentage >= 70 ? "bg-yellow-500" : "bg-green-500"}`}
											style={{ width: `${characterPercentage}%` }}
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

								<Alert className="bg-muted/50">
									<AlertCircle className="h-4 w-4" />
									<AlertTitle>Posting Guidelines</AlertTitle>
									<AlertDescription>
										Share accurate information and cite your sources. Your
										credibility score is affected by the accuracy of your posts.
									</AlertDescription>
								</Alert>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-lg">
									<LinkIcon className="h-4 w-4" />
									Sources
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
									<div>
										<Label htmlFor="source-url">Source URL</Label>
										<Input
											id="source-url"
											placeholder="https://example.com/article"
											value={newSourceUrl}
											onChange={(e) => setNewSourceUrl(e.target.value)}
										/>
									</div>
									<div>
										<Label htmlFor="source-title">Source Title</Label>
										<div className="flex gap-2">
											<Input
												id="source-title"
												placeholder="Article or source name"
												value={newSourceTitle}
												onChange={(e) => setNewSourceTitle(e.target.value)}
											/>
											<Button
												type="button"
												onClick={addSource}
												disabled={
													!newSourceUrl.trim() || !newSourceTitle.trim()
												}
											>
												<Plus className="h-4 w-4" />
											</Button>
										</div>
									</div>
								</div>

								{sources.length > 0 && (
									<div className="mt-4 space-y-2">
										<Label>Added Sources</Label>
										<ScrollArea className="h-[100px] rounded-md border p-2">
											<div className="space-y-2">
												{sources.map((source, index) => (
													<div
														key={index}
														className="flex items-center justify-between rounded-md bg-muted p-2"
													>
														<div className="flex-1 truncate">
															<div className="truncate font-medium text-sm">
																{source.title}
															</div>
															<div className="truncate text-muted-foreground text-xs">
																{source.url}
															</div>
														</div>
														<Button
															variant="ghost"
															size="icon"
															className="h-6 w-6"
															onClick={() => removeSource(index)}
														>
															<X className="h-3 w-3" />
														</Button>
													</div>
												))}
											</div>
										</ScrollArea>
									</div>
								)}

								<Alert className="bg-muted/50">
									<Info className="h-4 w-4" />
									<AlertDescription className="text-sm">
										Adding credible sources increases the trustworthiness of
										your post and helps others verify the information.
									</AlertDescription>
								</Alert>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-lg">
									<TagIcon className="h-4 w-4" />
									Tags & Categories
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label>Select Categories (up to 5)</Label>
									<div className="flex flex-wrap gap-2">
										{CATEGORIES.map((category) => (
											<Badge
												key={category}
												variant={
													selectedTags.includes(category)
														? "default"
														: "outline"
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

								<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
									<div>
										<Label htmlFor="custom-tag">Custom Tag</Label>
										<div className="flex gap-2">
											<Input
												id="custom-tag"
												placeholder="Add a custom tag"
												value={customTag}
												onChange={(e) => setCustomTag(e.target.value)}
												maxLength={20}
											/>
											<Button
												type="button"
												onClick={addCustomTag}
												disabled={!customTag.trim() || selectedTags.length >= 5}
											>
												<Plus className="h-4 w-4" />
											</Button>
										</div>
									</div>

									<div>
										<Label htmlFor="location">Location (optional)</Label>
										<Select value={locationTag} onValueChange={setLocationTag}>
											<SelectTrigger id="location">
												<SelectValue placeholder="Select location" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="global">Global</SelectItem>
												<SelectItem value="north-america">
													North America
												</SelectItem>
												<SelectItem value="europe">Europe</SelectItem>
												<SelectItem value="asia">Asia</SelectItem>
												<SelectItem value="africa">Africa</SelectItem>
												<SelectItem value="south-america">
													South America
												</SelectItem>
												<SelectItem value="australia">Australia</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>

								{selectedTags.length > 0 && (
									<div className="space-y-2">
										<Label>Selected Tags ({selectedTags.length}/5)</Label>
										<div className="flex flex-wrap gap-2">
											{selectedTags.map((tag) => (
												<Badge key={tag} className="flex items-center gap-1">
													{tag}
													<Button
														variant="ghost"
														size="icon"
														className="ml-1 h-4 w-4 p-0"
														onClick={() => toggleTag(tag)}
													>
														<X className="h-3 w-3" />
													</Button>
												</Badge>
											))}
										</div>
									</div>
								)}
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-lg">
									<Upload className="h-4 w-4" />
									Media
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="grid grid-cols-2 gap-4">
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger asChild>
												<div>
													<Button
														variant="outline"
														className="flex h-20 w-full flex-col items-center justify-center gap-2"
														onClick={() => fileInputRef.current?.click()}
													>
														<ImageIcon className="h-6 w-6" />
														<span>Add Image</span>
													</Button>
												</div>
											</TooltipTrigger>
											<TooltipContent>
												<p>Supported formats: JPG, PNG, GIF (max 5MB)</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>

									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger asChild>
												<div>
													<Button
														variant="outline"
														className="flex h-20 w-full flex-col items-center justify-center gap-2"
														onClick={() => fileInputRef.current?.click()}
													>
														<FileText className="h-6 w-6" />
														<span>Add Document</span>
													</Button>
												</div>
											</TooltipTrigger>
											<TooltipContent>
												<p>Supported formats: PDF, DOC (max 10MB)</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</div>

								<input
									type="file"
									ref={fileInputRef}
									className="hidden"
									accept="image/*,.pdf,.doc,.docx"
									onChange={handleFileChange}
								/>

								{media.length > 0 && (
									<div className="mt-4 space-y-2">
										<Label>Added Media</Label>
										<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
											{media.map((item, index) => (
												<div key={index} className="group relative">
													<div className="aspect-square overflow-hidden rounded-md border bg-muted">
														{item.type === "image" ? (
															<img
																src={item.preview || "/placeholder.svg"}
																alt="Preview"
																className="h-full w-full object-cover"
															/>
														) : (
															<div className="flex h-full w-full items-center justify-center">
																<FileText className="h-10 w-10 text-muted-foreground" />
															</div>
														)}
													</div>
													<Button
														variant="destructive"
														size="icon"
														className="absolute top-1 right-1 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
														onClick={() => removeMedia(index)}
													>
														<X className="h-3 w-3" />
													</Button>
												</div>
											))}
										</div>
									</div>
								)}
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="preview" className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="text-lg">Post Preview</CardTitle>
							</CardHeader>
							<CardContent>
								{content ? (
									<NewsPost
										user={currentUser}
										content={content}
										timestamp="Just now"
										credibilityTag="unverified"
										reviewCount={0}
										commentCount={0}
										sources={sources.map((s) => s.url)}
										hasMedia={media.some((m) => m.type === "image")}
									/>
								) : (
									<div className="py-12 text-center text-muted-foreground">
										<AlertCircle className="mx-auto mb-4 h-12 w-12" />
										<h3 className="font-medium text-lg">Nothing to preview</h3>
										<p>Add some content to see how your post will look.</p>
									</div>
								)}
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-lg">Credibility Check</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center gap-3 rounded-md bg-muted p-4">
									<div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
										<AlertCircle className="h-5 w-5 text-yellow-600" />
									</div>
									<div>
										<h3 className="font-medium">Initial Status: Unverified</h3>
										<p className="text-muted-foreground text-sm">
											All new posts start as unverified until reviewed by the
											community and fact-checkers.
										</p>
									</div>
								</div>

								<div className="space-y-2">
									<h3 className="font-medium">Credibility Factors</h3>
									<div className="space-y-2">
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-2">
												<LinkIcon className="h-4 w-4 text-blue-500" />
												<span>Sources provided</span>
											</div>
											<Badge
												variant={sources.length > 0 ? "outline" : "destructive"}
												className={
													sources.length > 0
														? "bg-green-100 text-green-800"
														: ""
												}
											>
												{sources.length > 0
													? `${sources.length} sources`
													: "No sources"}
											</Badge>
										</div>

										<div className="flex items-center justify-between">
											<div className="flex items-center gap-2">
												<TagIcon className="h-4 w-4 text-purple-500" />
												<span>Categories tagged</span>
											</div>
											<Badge
												variant={
													selectedTags.length > 0 ? "outline" : "secondary"
												}
												className={
													selectedTags.length > 0
														? "bg-green-100 text-green-800"
														: ""
												}
											>
												{selectedTags.length > 0
													? `${selectedTags.length} tags`
													: "No tags"}
											</Badge>
										</div>

										<div className="flex items-center justify-between">
											<div className="flex items-center gap-2">
												<Avatar className="h-5 w-5">
													<AvatarImage
														src={currentUser.avatar}
														alt={currentUser.name}
													/>
													<AvatarFallback>
														{currentUser.name.charAt(0)}
													</AvatarFallback>
												</Avatar>
												<span>Your credibility score</span>
											</div>
											<Badge
												variant="outline"
												className="bg-blue-100 text-blue-800"
											>
												{currentUser.credibilityScore}
											</Badge>
										</div>
									</div>
								</div>

								<Alert className="bg-muted/50">
									<Info className="h-4 w-4" />
									<AlertDescription className="text-sm">
										Adding credible sources increases the trustworthiness of
										your post and helps others verify the information.
									</AlertDescription>
								</Alert>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>

				<div className="mt-8 flex items-center justify-between">
					<Button variant="outline" onClick={() => router.push("/")}>
						Cancel
					</Button>
					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							onClick={() => {
								// Save as draft functionality would go here
								router.push("/");
							}}
						>
							Save as Draft
						</Button>
						<Button
							onClick={submitPost}
							disabled={!isFormValid || isSubmitting}
							className="min-w-[100px]"
						>
							{isSubmitting ? "Posting..." : "Post News"}
						</Button>
					</div>
				</div>
			</main>
		</div>
	);
}
