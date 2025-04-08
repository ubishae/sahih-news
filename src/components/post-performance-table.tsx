"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	AlertCircle,
	ArrowUpDown,
	Calendar,
	CheckCircle,
	Eye,
	Filter,
	HelpCircle,
	MessageSquare,
	Search,
	ThumbsUp,
	XCircle,
} from "lucide-react";
import { useState } from "react";

// Sample post data
const POSTS_DATA = [
	{
		id: "1",
		title: "New breakthrough in renewable energy storage announced",
		timestamp: "2 days ago",
		date: "2023-09-01",
		views: 1245,
		engagement: 187,
		likes: 142,
		comments: 45,
		credibilityTag: "verified",
		category: "Technology",
	},
	{
		id: "2",
		title: "Global tech conference highlights AI innovations",
		timestamp: "5 days ago",
		date: "2023-08-28",
		views: 982,
		engagement: 143,
		likes: 98,
		comments: 45,
		credibilityTag: "verified",
		category: "Technology",
	},
	{
		id: "3",
		title: "Study suggests link between diet and cognitive health",
		timestamp: "1 week ago",
		date: "2023-08-25",
		views: 756,
		engagement: 98,
		likes: 67,
		comments: 31,
		credibilityTag: "unverified",
		category: "Health",
	},
	{
		id: "4",
		title: "Local government announces new environmental initiative",
		timestamp: "2 weeks ago",
		date: "2023-08-18",
		views: 543,
		engagement: 76,
		likes: 52,
		comments: 24,
		credibilityTag: "verified",
		category: "Environment",
	},
	{
		id: "5",
		title: "Sports team wins championship after dramatic comeback",
		timestamp: "3 weeks ago",
		date: "2023-08-10",
		views: 1876,
		engagement: 312,
		likes: 287,
		comments: 25,
		credibilityTag: "verified",
		category: "Sports",
	},
	{
		id: "6",
		title: "New smartphone features could revolutionize mobile photography",
		timestamp: "1 month ago",
		date: "2023-08-02",
		views: 2341,
		engagement: 198,
		likes: 176,
		comments: 22,
		credibilityTag: "misleading",
		category: "Technology",
	},
	{
		id: "7",
		title: "Economic report predicts growth in renewable energy sector",
		timestamp: "1 month ago",
		date: "2023-07-28",
		views: 876,
		engagement: 104,
		likes: 89,
		comments: 15,
		credibilityTag: "verified",
		category: "Business",
	},
	{
		id: "8",
		title: "Health experts debate benefits of new dietary supplement",
		timestamp: "2 months ago",
		date: "2023-07-15",
		views: 654,
		engagement: 87,
		likes: 42,
		comments: 45,
		credibilityTag: "unverified",
		category: "Health",
	},
];

export default function PostPerformanceTable() {
	const [searchQuery, setSearchQuery] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [categoryFilter, setCategoryFilter] = useState("all");
	const [sortBy, setSortBy] = useState("date");
	const [sortOrder, setSortOrder] = useState("desc");

	// Filter and sort posts
	const filteredPosts = POSTS_DATA.filter((post) => {
		// Search filter
		const matchesSearch = post.title
			.toLowerCase()
			.includes(searchQuery.toLowerCase());

		// Status filter
		const matchesStatus =
			statusFilter === "all" || post.credibilityTag === statusFilter;

		// Category filter
		const matchesCategory =
			categoryFilter === "all" || post.category === categoryFilter;

		return matchesSearch && matchesStatus && matchesCategory;
	}).sort((a, b) => {
		// Sort by selected field
		let comparison = 0;

		switch (sortBy) {
			case "date":
				comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
				break;
			case "views":
				comparison = a.views - b.views;
				break;
			case "engagement":
				comparison = a.engagement - b.engagement;
				break;
			case "title":
				comparison = a.title.localeCompare(b.title);
				break;
			default:
				comparison = 0;
		}

		// Apply sort order
		return sortOrder === "asc" ? comparison : -comparison;
	});

	// Get unique categories
	const categories = Array.from(
		new Set(POSTS_DATA.map((post) => post.category)),
	);

	const getCredibilityBadge = (tag: string) => {
		switch (tag) {
			case "verified":
				return (
					<Badge
						variant="outline"
						className="flex items-center gap-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
					>
						<CheckCircle className="h-3 w-3" />
						Verified
					</Badge>
				);
			case "false":
				return (
					<Badge
						variant="outline"
						className="flex items-center gap-1 bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
					>
						<XCircle className="h-3 w-3" />
						False
					</Badge>
				);
			case "unverified":
				return (
					<Badge
						variant="outline"
						className="flex items-center gap-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
					>
						<HelpCircle className="h-3 w-3" />
						Unverified
					</Badge>
				);
			case "misleading":
				return (
					<Badge
						variant="outline"
						className="flex items-center gap-1 bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
					>
						<AlertCircle className="h-3 w-3" />
						Misleading
					</Badge>
				);
		}
	};

	// Toggle sort order
	const toggleSort = (field: string) => {
		if (sortBy === field) {
			setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		} else {
			setSortBy(field);
			setSortOrder("desc");
		}
	};

	return (
		<Card>
			<CardHeader>
				<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
					<div>
						<CardTitle className="text-lg">Post Performance</CardTitle>
						<CardDescription>
							Detailed analytics for all your posts
						</CardDescription>
					</div>
					<div className="flex flex-col gap-2 sm:flex-row">
						<Button
							variant="outline"
							size="sm"
							className="flex items-center gap-1"
						>
							<Calendar className="h-4 w-4" />
							Date Range
						</Button>
						<Button
							variant="outline"
							size="sm"
							className="flex items-center gap-1"
						>
							<Filter className="h-4 w-4" />
							More Filters
						</Button>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{/* Search and filters */}
					<div className="flex flex-col gap-4 md:flex-row">
						<div className="relative flex-1">
							<Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Search posts..."
								className="pl-10"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>
						<div className="flex gap-2">
							<Select value={statusFilter} onValueChange={setStatusFilter}>
								<SelectTrigger className="w-[160px]">
									<SelectValue placeholder="Status" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Statuses</SelectItem>
									<SelectItem value="verified">Verified</SelectItem>
									<SelectItem value="unverified">Unverified</SelectItem>
									<SelectItem value="misleading">Misleading</SelectItem>
									<SelectItem value="false">False</SelectItem>
								</SelectContent>
							</Select>

							<Select value={categoryFilter} onValueChange={setCategoryFilter}>
								<SelectTrigger className="w-[160px]">
									<SelectValue placeholder="Category" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Categories</SelectItem>
									{categories.map((category) => (
										<SelectItem key={category} value={category}>
											{category}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>

					{/* Posts table */}
					<div className="overflow-hidden rounded-md border">
						<div className="overflow-x-auto">
							<table className="w-full text-sm">
								<thead>
									<tr className="bg-muted/50">
										<th className="px-4 py-3 text-left font-medium">
											<Button
												variant="ghost"
												className="flex h-auto items-center gap-1 p-0 font-medium"
												onClick={() => toggleSort("title")}
											>
												Post
												<ArrowUpDown className="h-3 w-3" />
											</Button>
										</th>
										<th className="px-4 py-3 text-left font-medium">Status</th>
										<th className="px-4 py-3 text-left font-medium">
											Category
										</th>
										<th className="px-4 py-3 text-left font-medium">
											<Button
												variant="ghost"
												className="flex h-auto items-center gap-1 p-0 font-medium"
												onClick={() => toggleSort("date")}
											>
												Date
												<ArrowUpDown className="h-3 w-3" />
											</Button>
										</th>
										<th className="px-4 py-3 text-center font-medium">
											<Button
												variant="ghost"
												className="flex h-auto items-center gap-1 p-0 font-medium"
												onClick={() => toggleSort("views")}
											>
												<Eye className="mr-1 h-4 w-4" />
												Views
												<ArrowUpDown className="h-3 w-3" />
											</Button>
										</th>
										<th className="px-4 py-3 text-center font-medium">
											<Button
												variant="ghost"
												className="flex h-auto items-center gap-1 p-0 font-medium"
												onClick={() => toggleSort("engagement")}
											>
												<MessageSquare className="mr-1 h-4 w-4" />
												Engagement
												<ArrowUpDown className="h-3 w-3" />
											</Button>
										</th>
										<th className="px-4 py-3 text-center font-medium">
											Actions
										</th>
									</tr>
								</thead>
								<tbody>
									{filteredPosts.map((post, index) => (
										<tr
											key={post.id}
											className={`${index % 2 === 0 ? "bg-background" : "bg-muted/20"} hover:bg-muted/50`}
										>
											<td className="px-4 py-3">
												<div className="font-medium">{post.title}</div>
											</td>
											<td className="px-4 py-3">
												{getCredibilityBadge(post.credibilityTag)}
											</td>
											<td className="px-4 py-3">
												<Badge variant="secondary">{post.category}</Badge>
											</td>
											<td className="px-4 py-3 text-muted-foreground">
												{post.timestamp}
											</td>
											<td className="px-4 py-3 text-center">
												{post.views.toLocaleString()}
											</td>
											<td className="px-4 py-3">
												<div className="flex items-center justify-center gap-3">
													<div className="flex items-center gap-1">
														<ThumbsUp className="h-3 w-3 text-muted-foreground" />
														<span>{post.likes}</span>
													</div>
													<div className="flex items-center gap-1">
														<MessageSquare className="h-3 w-3 text-muted-foreground" />
														<span>{post.comments}</span>
													</div>
												</div>
											</td>
											<td className="px-4 py-3 text-center">
												<Button variant="ghost" size="sm">
													View
												</Button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						{filteredPosts.length === 0 && (
							<div className="py-8 text-center text-muted-foreground">
								<AlertCircle className="mx-auto mb-2 h-8 w-8" />
								<p>No posts match your filters</p>
							</div>
						)}
					</div>

					<div className="flex items-center justify-between">
						<div className="text-muted-foreground text-sm">
							Showing {filteredPosts.length} of {POSTS_DATA.length} posts
						</div>
						<div className="flex items-center gap-2">
							<Button variant="outline" size="sm" disabled>
								Previous
							</Button>
							<Button variant="outline" size="sm" disabled>
								Next
							</Button>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
