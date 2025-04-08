"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
	Settings,
	Shield,
	User,
} from "lucide-react";
import Link from "next/link";

export function UserDropdown() {
	// Sample user data - in a real app, this would come from authentication context
	const user = {
		name: "Alex Johnson",
		handle: "@alexj",
		avatar: "/placeholder.svg?height=32&width=32",
		initials: "AJ",
		credibilityScore: 85,
		badge: "Trustworthy Contributor",
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative h-8 w-8 rounded-full">
					<Avatar className="h-8 w-8">
						<AvatarImage src={user.avatar} alt={user.name} />
						<AvatarFallback>{user.initials}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="font-medium text-sm leading-none">{user.name}</p>
						<p className="text-muted-foreground text-xs leading-none">
							{user.handle}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />

				{/* Credibility score */}
				<div className="px-2 py-1.5">
					<div className="mb-1 flex items-center justify-between">
						<span className="text-muted-foreground text-xs">
							Credibility Score
						</span>
						<Badge
							variant="outline"
							className="bg-green-100 text-green-800 text-xs dark:bg-green-900/20 dark:text-green-400"
						>
							{user.badge}
						</Badge>
					</div>
					<div className="flex items-center gap-2">
						<div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
							<div
								className="h-full bg-green-500"
								style={{ width: `${user.credibilityScore}%` }}
							/>
						</div>
						<span className="font-medium text-sm">{user.credibilityScore}</span>
					</div>
				</div>

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
					<DropdownMenuItem asChild>
						<Link href="/settings" className="flex cursor-pointer items-center">
							<Settings className="mr-2 h-4 w-4" />
							<span>Settings</span>
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem asChild>
						<Link
							href="/become-reviewer"
							className="flex cursor-pointer items-center"
						>
							<Shield className="mr-2 h-4 w-4" />
							<span>Become a Reviewer</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<Link href="/help" className="flex cursor-pointer items-center">
							<HelpCircle className="mr-2 h-4 w-4" />
							<span>Help & Support</span>
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="cursor-pointer">
					<LogOut className="mr-2 h-4 w-4" />
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
