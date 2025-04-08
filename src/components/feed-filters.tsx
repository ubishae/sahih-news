"use client";

import type React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { useIsMobile } from "@/hooks/use-mobile";
import {
	AlertCircle,
	Calendar,
	CheckCircle,
	Filter,
	HelpCircle,
	Search,
	X,
	XCircle,
} from "lucide-react";
import { useState } from "react";

interface FeedFiltersProps {
	onSearch: (query: string) => void;
	onFilter: (filters: FilterOptions) => void;
}

export interface FilterOptions {
	categories: string[];
	credibility: string[];
	timeRange: string;
	followedOnly: boolean;
}

export default function FeedFilters({ onSearch, onFilter }: FeedFiltersProps) {
	const isMobile = useIsMobile();
	const [searchQuery, setSearchQuery] = useState("");
	const [activeFilters, setActiveFilters] = useState<FilterOptions>({
		categories: [],
		credibility: [],
		timeRange: "all",
		followedOnly: false,
	});
	const [tempFilters, setTempFilters] = useState<FilterOptions>({
		categories: [],
		credibility: [],
		timeRange: "all",
		followedOnly: false,
	});

	// Available categories
	const categories = [
		"Politics",
		"Sports",
		"Technology",
		"Health",
		"Local",
		"International",
		"Business",
		"Science",
		"Environment",
		"Education",
		"Culture",
		"Entertainment",
	];

	// Available credibility statuses
	const credibilityStatuses = [
		{
			value: "verified",
			label: "Verified",
			icon: <CheckCircle className="h-3.5 w-3.5 text-green-600" />,
		},
		{
			value: "unverified",
			label: "Unverified",
			icon: <HelpCircle className="h-3.5 w-3.5 text-yellow-600" />,
		},
		{
			value: "misleading",
			label: "Misleading",
			icon: <AlertCircle className="h-3.5 w-3.5 text-orange-600" />,
		},
		{
			value: "false",
			label: "False",
			icon: <XCircle className="h-3.5 w-3.5 text-red-600" />,
		},
	];

	// Time range options
	const timeRanges = [
		{ value: "all", label: "All Time" },
		{ value: "today", label: "Today" },
		{ value: "week", label: "This Week" },
		{ value: "month", label: "This Month" },
		{ value: "year", label: "This Year" },
	];

	// Handle search
	const handleSearch = () => {
		onSearch(searchQuery);
	};

	// Handle search input keypress
	const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	// Toggle category filter
	const toggleCategory = (category: string, isTemp = false) => {
		const filters = isTemp ? tempFilters : activeFilters;
		const updatedCategories = filters.categories.includes(category)
			? filters.categories.filter((c) => c !== category)
			: [...filters.categories, category];

		if (isTemp) {
			setTempFilters({ ...tempFilters, categories: updatedCategories });
		} else {
			const newFilters = { ...activeFilters, categories: updatedCategories };
			setActiveFilters(newFilters);
			onFilter(newFilters);
		}
	};

	// Toggle credibility filter
	const toggleCredibility = (status: string, isTemp = false) => {
		const filters = isTemp ? tempFilters : activeFilters;
		const updatedCredibility = filters.credibility.includes(status)
			? filters.credibility.filter((s) => s !== status)
			: [...filters.credibility, status];

		if (isTemp) {
			setTempFilters({ ...tempFilters, credibility: updatedCredibility });
		} else {
			const newFilters = { ...activeFilters, credibility: updatedCredibility };
			setActiveFilters(newFilters);
			onFilter(newFilters);
		}
	};

	// Set time range
	const setTimeRange = (range: string, isTemp = false) => {
		if (isTemp) {
			setTempFilters({ ...tempFilters, timeRange: range });
		} else {
			const newFilters = { ...activeFilters, timeRange: range };
			setActiveFilters(newFilters);
			onFilter(newFilters);
		}
	};

	// Toggle followed only
	const toggleFollowedOnly = (value: boolean, isTemp = false) => {
		if (isTemp) {
			setTempFilters({ ...tempFilters, followedOnly: value });
		} else {
			const newFilters = { ...activeFilters, followedOnly: value };
			setActiveFilters(newFilters);
			onFilter(newFilters);
		}
	};

	// Apply filters from sheet (mobile)
	const applyFilters = () => {
		setActiveFilters(tempFilters);
		onFilter(tempFilters);
	};

	// Reset filters
	const resetFilters = (isTemp = false) => {
		const defaultFilters = {
			categories: [],
			credibility: [],
			timeRange: "all",
			followedOnly: false,
		};

		if (isTemp) {
			setTempFilters(defaultFilters);
		} else {
			setActiveFilters(defaultFilters);
			onFilter(defaultFilters);
		}
	};

	// Count active filters
	const activeFilterCount =
		activeFilters.categories.length +
		activeFilters.credibility.length +
		(activeFilters.timeRange !== "all" ? 1 : 0) +
		(activeFilters.followedOnly ? 1 : 0);

	// Mobile filter sheet
	const MobileFilters = () => (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline" size="icon" className="relative">
					<Filter className="h-4 w-4" />
					{activeFilterCount > 0 && (
						<span className="-top-1 -right-1 absolute flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
							{activeFilterCount}
						</span>
					)}
				</Button>
			</SheetTrigger>
			<SheetContent side="bottom" className="h-[80vh] sm:max-w-none">
				<SheetHeader>
					<SheetTitle>Filter News</SheetTitle>
					<SheetDescription>
						Customize your news feed with these filters
					</SheetDescription>
				</SheetHeader>
				<div className="mt-4 h-[calc(80vh-10rem)] space-y-4 overflow-y-auto">
					{/* Categories */}
					<div className="space-y-2">
						<h3 className="font-medium text-sm">Categories</h3>
						<div className="flex flex-wrap gap-2">
							{categories.map((category) => (
								<Badge
									key={category}
									variant={
										tempFilters.categories.includes(category)
											? "default"
											: "outline"
									}
									className="cursor-pointer hover:bg-accent"
									onClick={() => toggleCategory(category, true)}
								>
									{category}
									{tempFilters.categories.includes(category) && (
										<X className="ml-1 h-3 w-3" />
									)}
								</Badge>
							))}
						</div>
					</div>

					<Separator />

					{/* Credibility */}
					<div className="space-y-2">
						<h3 className="font-medium text-sm">Credibility Status</h3>
						<div className="flex flex-wrap gap-2">
							{credibilityStatuses.map((status) => (
								<Badge
									key={status.value}
									variant={
										tempFilters.credibility.includes(status.value)
											? "default"
											: "outline"
									}
									className="flex cursor-pointer items-center gap-1 hover:bg-accent"
									onClick={() => toggleCredibility(status.value, true)}
								>
									{status.icon}
									{status.label}
									{tempFilters.credibility.includes(status.value) && (
										<X className="ml-1 h-3 w-3" />
									)}
								</Badge>
							))}
						</div>
					</div>

					<Separator />

					{/* Time Range */}
					<div className="space-y-2">
						<h3 className="font-medium text-sm">Time Range</h3>
						<Select
							value={tempFilters.timeRange}
							onValueChange={(value) => setTimeRange(value, true)}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select time range" />
							</SelectTrigger>
							<SelectContent>
								{timeRanges.map((range) => (
									<SelectItem key={range.value} value={range.value}>
										{range.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<Separator />

					{/* Additional Options */}
					<div className="space-y-2">
						<h3 className="font-medium text-sm">Additional Options</h3>
						<div className="flex items-center space-x-2">
							<Switch
								id="followed-only-mobile"
								checked={tempFilters.followedOnly}
								onCheckedChange={(checked) => toggleFollowedOnly(checked, true)}
							/>
							<Label htmlFor="followed-only-mobile">
								Show posts from followed users only
							</Label>
						</div>
					</div>
				</div>
				<SheetFooter className="mt-4 flex-row justify-between sm:justify-between">
					<Button variant="outline" onClick={() => resetFilters(true)}>
						Reset All
					</Button>
					<SheetClose asChild>
						<Button onClick={applyFilters}>Apply Filters</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);

	// Desktop filter popover
	const DesktopFilters = () => (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" size="icon" className="relative">
					<Filter className="h-4 w-4" />
					{activeFilterCount > 0 && (
						<span className="-top-1 -right-1 absolute flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
							{activeFilterCount}
						</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80" align="end">
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<h3 className="font-medium">Filter News</h3>
						{activeFilterCount > 0 && (
							<Button
								variant="ghost"
								size="sm"
								onClick={() => resetFilters(false)}
								className="h-8 px-2 text-xs"
							>
								Reset All
							</Button>
						)}
					</div>

					{/* Categories */}
					<div className="space-y-2">
						<h4 className="font-medium text-sm">Categories</h4>
						<div className="flex flex-wrap gap-2">
							{categories.slice(0, 8).map((category) => (
								<Badge
									key={category}
									variant={
										activeFilters.categories.includes(category)
											? "default"
											: "outline"
									}
									className="cursor-pointer hover:bg-accent"
									onClick={() => toggleCategory(category)}
								>
									{category}
									{activeFilters.categories.includes(category) && (
										<X className="ml-1 h-3 w-3" />
									)}
								</Badge>
							))}
							{categories.length > 8 && (
								<Popover>
									<PopoverTrigger asChild>
										<Badge
											variant="outline"
											className="cursor-pointer hover:bg-accent"
										>
											+{categories.length - 8} more
										</Badge>
									</PopoverTrigger>
									<PopoverContent className="w-60" align="start">
										<div className="flex flex-wrap gap-2">
											{categories.slice(8).map((category) => (
												<Badge
													key={category}
													variant={
														activeFilters.categories.includes(category)
															? "default"
															: "outline"
													}
													className="cursor-pointer hover:bg-accent"
													onClick={() => toggleCategory(category)}
												>
													{category}
													{activeFilters.categories.includes(category) && (
														<X className="ml-1 h-3 w-3" />
													)}
												</Badge>
											))}
										</div>
									</PopoverContent>
								</Popover>
							)}
						</div>
					</div>

					{/* Credibility */}
					<div className="space-y-2">
						<h4 className="font-medium text-sm">Credibility Status</h4>
						<div className="flex flex-wrap gap-2">
							{credibilityStatuses.map((status) => (
								<Badge
									key={status.value}
									variant={
										activeFilters.credibility.includes(status.value)
											? "default"
											: "outline"
									}
									className="flex cursor-pointer items-center gap-1 hover:bg-accent"
									onClick={() => toggleCredibility(status.value)}
								>
									{status.icon}
									{status.label}
									{activeFilters.credibility.includes(status.value) && (
										<X className="ml-1 h-3 w-3" />
									)}
								</Badge>
							))}
						</div>
					</div>

					{/* Time Range */}
					<div className="space-y-2">
						<h4 className="font-medium text-sm">Time Range</h4>
						<Select
							value={activeFilters.timeRange}
							onValueChange={(value) => setTimeRange(value)}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select time range" />
							</SelectTrigger>
							<SelectContent>
								{timeRanges.map((range) => (
									<SelectItem key={range.value} value={range.value}>
										{range.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					{/* Additional Options */}
					<div className="space-y-2">
						<h4 className="font-medium text-sm">Additional Options</h4>
						<div className="flex items-center space-x-2">
							<Switch
								id="followed-only"
								checked={activeFilters.followedOnly}
								onCheckedChange={(checked) => toggleFollowedOnly(checked)}
							/>
							<Label htmlFor="followed-only">
								Show posts from followed users only
							</Label>
						</div>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);

	return (
		<div className="flex items-center gap-2">
			<div className="relative flex-1">
				<Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
				<Input
					placeholder="Search news and topics"
					className="pl-10"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					onKeyDown={handleSearchKeyPress}
				/>
			</div>

			{/* Time range quick filter */}
			<Popover>
				<PopoverTrigger asChild>
					<Button variant="outline" size="icon">
						<Calendar className="h-4 w-4" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-56" align="end">
					<div className="space-y-2">
						<h3 className="font-medium">Time Range</h3>
						<div className="space-y-1">
							{timeRanges.map((range) => (
								<Button
									key={range.value}
									variant={
										activeFilters.timeRange === range.value
											? "default"
											: "ghost"
									}
									className="w-full justify-start"
									size="sm"
									onClick={() => setTimeRange(range.value)}
								>
									{range.label}
								</Button>
							))}
						</div>
					</div>
				</PopoverContent>
			</Popover>

			{/* Filters - responsive */}
			{isMobile ? <MobileFilters /> : <DesktopFilters />}

			{/* Search button for mobile */}
			{isMobile && (
				<Button size="icon" onClick={handleSearch}>
					<Search className="h-4 w-4" />
				</Button>
			)}
		</div>
	);
}
