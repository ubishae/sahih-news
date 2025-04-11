"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	BarChart3,
	BookmarkIcon,
	HelpCircle,
	LogOut,
	Shield,
	User,
} from "lucide-react";
import Link from "next/link";
import { useUser, SignOutButton, useAuth } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/react";

export function UserDropdown() {
	const { user: clerkUser, isLoaded: isClerkLoaded } = useUser();
	const { data: currentUser } = api.user.me.useQuery();

	// If clerk is not loaded or user data is loading, show loading state
	if (!isClerkLoaded) {
		return (
			<Button variant="ghost" className="relative h-8 w-8 rounded-full">
				<Skeleton className="h-8 w-8 rounded-full" />
			</Button>
		);
	}

	// If no user is logged in, return null or a sign-in button
	if (!clerkUser || !currentUser) {
		return <Skeleton className="h-8 w-8 rounded-full" />;
	}

	// Get user initials from display name
	const initials = clerkUser.fullName
		?.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.substring(0, 2);

	// Check if user has fact_checker role from Clerk
	const isFactChecker = clerkUser.publicMetadata?.role === "fact_checker";

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative h-8 w-8 rounded-full">
					<Avatar className="h-8 w-8">
						<AvatarImage
							src={clerkUser.imageUrl}
							alt={clerkUser.fullName || ""}
						/>
						<AvatarFallback>{initials}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="font-medium text-sm leading-none">
							{clerkUser.fullName ?? ""}
						</p>
						<p className="text-muted-foreground text-xs leading-none">
							@{currentUser.username}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />

				{/* Credibility score */}
				{/* <div className="px-2 py-1.5">
					<div className="mb-1 flex items-center justify-between">
						<span className="text-muted-foreground text-xs">
							Credibility Score
						</span>
						<Badge
							variant="outline"
							className="bg-green-100 text-green-800 text-xs dark:bg-green-900/20 dark:text-green-400"
						>
							{userData.credibilityScore >= 80
								? "Trustworthy Contributor"
								: userData.credibilityScore >= 60
									? "Reliable Member"
									: "Community Member"}
						</Badge>
					</div>
					<div className="flex items-center gap-2">
						<div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
							<div
								className="h-full bg-green-500"
								style={{ width: `${userData.credibilityScore}%` }}
							/>
						</div>
						<span className="font-medium text-sm">
							{userData.credibilityScore}
						</span>
					</div>
				</div> */}

				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem asChild>
						<Link href="/profile" className="flex cursor-pointer items-center">
							<User className="mr-2 h-4 w-4" />
							<span>Profile</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<Link
							href="/bookmarks"
							className="flex cursor-pointer items-center"
						>
							<BookmarkIcon className="mr-2 h-4 w-4" />
							<span>Bookmarks</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<Link
							href="/analytics"
							className="flex cursor-pointer items-center"
						>
							<BarChart3 className="mr-2 h-4 w-4" />
							<span>Analytics</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<Link href="/help" className="flex w-full items-center">
							<HelpCircle className="mr-2 h-4 w-4" />
							Help & Support
						</Link>
					</DropdownMenuItem>
					{/* <DropdownMenuItem asChild>
						<Link href="/settings" className="flex cursor-pointer items-center">
							<Settings className="mr-2 h-4 w-4" />
							<span>Settings</span>
						</Link>
					</DropdownMenuItem> */}
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					{!isFactChecker && (
						<DropdownMenuItem asChild>
							<Link
								href="/become-reviewer"
								className="flex cursor-pointer items-center"
							>
								<Shield className="mr-2 h-4 w-4" />
								<span>Become a Reviewer</span>
							</Link>
						</DropdownMenuItem>
					)}
					<DropdownMenuItem asChild>
						<Link href="/help" className="flex cursor-pointer items-center">
							<HelpCircle className="mr-2 h-4 w-4" />
							<span>Help & Support</span>
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="cursor-pointer">
					<SignOutButton>
						<div className="flex items-center">
							<LogOut className="mr-2 h-4 w-4" />
							<span>Log out</span>
						</div>
					</SignOutButton>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
