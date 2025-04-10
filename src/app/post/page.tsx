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
import { Fragment, useRef, useState } from "react";
import { useForm } from "@tanstack/react-form";

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
	const form = useForm({
		defaultValues: {
			content: "",
			sources: [{ url: "", title: "" }],
			tags: [{ name: "" }],
			categories: [{ name: "" }],
			location: "",
			mediaFiles: [{ type: "", file: null, preview: "" }],
			aiAssistance: true,
		},
		onSubmit: ({ value }) => {
			console.log(value);
		},
	});

	// Form state
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [media, setMedia] = useState<
		{ type: string; file: File | null; preview: string }[]
	>([]);
	const [aiAssistance, setAiAssistance] = useState(true);

	// Character limit from PRD
	const CHARACTER_LIMIT = 500;

	// Toggle a tag selection
	const toggleTag = (tag: string) => {
		if (selectedTags.includes(tag)) {
			setSelectedTags(selectedTags.filter((t) => t !== tag));
		} else {
			setSelectedTags([...selectedTags, tag]);
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
			typeof newMedia[index].preview === "string" &&
			newMedia[index].preview.startsWith("blob:")
		) {
			URL.revokeObjectURL(newMedia[index].preview);
		}

		newMedia.splice(index, 1);
		setMedia(newMedia);
	};

	// Calculate the percentage of the character limit used
	const characterPercentage =
		(form.state.values.content.length / CHARACTER_LIMIT) * 100;

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
			<form
				className="container mx-auto max-w-4xl px-4 py-6"
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
			>
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
								<form.Field
									name="content"
									children={(field) => (
										<div className="space-y-2">
											<div className="flex justify-between">
												<Label htmlFor="content">
													Content (max {CHARACTER_LIMIT} characters)
												</Label>
												<span
													className={`text-sm ${field.state.value.length >= CHARACTER_LIMIT * 0.9 ? "text-red-500" : "text-muted-foreground"}`}
												>
													{field.state.value.length}/{CHARACTER_LIMIT}
												</span>
											</div>
											<RichTextEditor
												value={field.state.value}
												onChange={(e) => field.handleChange(e)}
											/>
											<form.Subscribe
												children={(state) => (
													<div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
														<div
															className={`h-full ${state.values.content.length >= CHARACTER_LIMIT * 0.9 ? "bg-red-500" : state.values.content.length >= CHARACTER_LIMIT * 0.7 ? "bg-yellow-500" : "bg-green-500"}`}
															style={{
																width: `${(state.values.content.length / CHARACTER_LIMIT) * 100}%`,
															}}
														/>
													</div>
												)}
											/>
										</div>
									)}
								/>

								<form.Field
									name="aiAssistance"
									children={(field) => (
										<div className="flex items-center space-x-2">
											<Switch
												id="ai-assistance"
												checked={field.state.value}
												onCheckedChange={(e) => field.handleChange(e)}
											/>
											<Label
												htmlFor="ai-assistance"
												className="flex items-center gap-1"
											>
												<Info className="h-4 w-4 text-blue-500" />
												Use AI assistance to suggest fact-checks
											</Label>
										</div>
									)}
								/>

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
								<form.Field name="sources" mode="array">
									{(field) => (
										<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
											{field.state.value.map((_, i) => (
												<Fragment key={i}>
													<form.Field
														name={`sources[${i}].url`}
														children={(subField) => (
															<div>
																<Label htmlFor="source-url">Source URL</Label>
																<Input
																	id="source-url"
																	placeholder="https://example.com/article"
																	value={subField.state.value}
																	onChange={(e) =>
																		subField.handleChange(e.target.value)
																	}
																/>
															</div>
														)}
													/>
													<form.Field
														name={`sources[${i}].title`}
														children={(subField) => (
															<div>
																<Label htmlFor="source-title">
																	Source Title
																</Label>
																<div className="flex gap-2">
																	<Input
																		id="source-title"
																		placeholder="Article or source name"
																		value={subField.state.value}
																		onChange={(e) =>
																			subField.handleChange(e.target.value)
																		}
																	/>
																	<Button
																		type="button"
																		onClick={() =>
																			field.pushValue({ url: "", title: "" })
																		}
																	>
																		<Plus className="h-4 w-4" />
																	</Button>
																</div>
															</div>
														)}
													/>
												</Fragment>
											))}
										</div>
									)}
								</form.Field>

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
									<form.Field name="tags" mode="array">
										{(field) => (
											<div>
												{field.state.value.map((_, i) => (
													<Fragment key={i}>
														<form.Field
															name={`tags[${i}].name`}
															children={(subField) => (
																<Fragment>
																	<Label htmlFor="custom-tag">Custom Tag</Label>
																	<div className="flex gap-2">
																		<Input
																			id="custom-tag"
																			placeholder="Add a custom tag"
																			value={subField.state.value}
																			onChange={(e) =>
																				subField.handleChange(e.target.value)
																			}
																			maxLength={20}
																		/>
																		<Button
																			type="button"
																			onClick={() =>
																				field.pushValue({ name: "" })
																			}
																		>
																			<Plus className="h-4 w-4" />
																		</Button>
																	</div>
																</Fragment>
															)}
														/>
													</Fragment>
												))}
											</div>
										)}
									</form.Field>

									<form.Field
										name="location"
										children={(field) => (
											<div>
												<Label htmlFor="location">Location (optional)</Label>
												<Select
													value={field.state.value}
													onValueChange={(e) => field.handleChange(e)}
												>
													<SelectTrigger id="location" className="w-full">
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
										)}
									/>
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

								<Input
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

					<form.Subscribe
						children={(state) => (
							<TabsContent value="preview" className="space-y-6">
								<Card>
									<CardHeader>
										<CardTitle className="text-lg">Post Preview</CardTitle>
									</CardHeader>
									<CardContent>
										{state.values.content ? (
											<NewsPost
												id={0}
												user={currentUser}
												content={state.values.content}
												timestamp="Just now"
												credibilityTag="unverified"
												reviewCount={0}
												commentCount={0}
												sources={state.values.sources.map((s) => s.url)}
												hasMedia={media.some((m) => m.type === "image")}
											/>
										) : (
											<div className="py-12 text-center text-muted-foreground">
												<AlertCircle className="mx-auto mb-4 h-12 w-12" />
												<h3 className="font-medium text-lg">
													Nothing to preview
												</h3>
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
												<h3 className="font-medium">
													Initial Status: Unverified
												</h3>
												<p className="text-muted-foreground text-sm">
													All new posts start as unverified until reviewed by
													the community and fact-checkers.
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
														variant={
															state.values.sources.length > 0
																? "outline"
																: "destructive"
														}
														className={
															state.values.sources.length > 0
																? "bg-green-100 text-green-800"
																: ""
														}
													>
														{state.values.sources.length > 0
															? `${state.values.sources.length} sources`
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
						)}
					/>
				</Tabs>

				<form.Subscribe
					selector={(state) => [state.canSubmit, state.isSubmitting]}
					children={([canSubmit, isSubmitting]) => (
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
									type="submit"
									disabled={!canSubmit || isSubmitting}
									className="min-w-[100px]"
								>
									{isSubmitting ? "Posting..." : "Post News"}
								</Button>
							</div>
						</div>
					)}
				/>
			</form>
		</div>
	);
}
