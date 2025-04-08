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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	AtSign,
	Bell,
	MessageSquare,
	Shield,
	Star,
	TrendingUp,
	UserPlus,
	X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Notification {
	id: string;
	type:
		| "mention"
		| "credibility"
		| "follow"
		| "trending"
		| "comment"
		| "verification";
	content: string;
	time: string;
	read: boolean;
	user?: {
		name: string;
		avatar: string;
		initials: string;
	};
}

export function NotificationDropdown() {
	// Sample notifications data - in a real app, this would come from an API
	const [notifications, setNotifications] = useState<Notification[]>([
		{
			id: "1",
			type: "mention",
			content: "Sarah Johnson mentioned you in a comment",
			time: "2m ago",
			read: false,
			user: {
				name: "Sarah Johnson",
				avatar: "/placeholder.svg?height=32&width=32",
				initials: "SJ",
			},
		},
		{
			id: "2",
			type: "credibility",
			content: "Your credibility score increased by 5 points",
			time: "1h ago",
			read: false,
		},
		{
			id: "3",
			type: "follow",
			content: "Tech Observer started following you",
			time: "3h ago",
			read: false,
			user: {
				name: "Tech Observer",
				avatar: "/placeholder.svg?height=32&width=32",
				initials: "TO",
			},
		},
		{
			id: "4",
			type: "verification",
			content: "Your fact-check on climate policy was approved",
			time: "4h ago",
			read: true,
		},
		{
			id: "5",
			type: "comment",
			content: "New comment on your post about healthcare reform",
			time: "1d ago",
			read: true,
			user: {
				name: "Health Insights",
				avatar: "/placeholder.svg?height=32&width=32",
				initials: "HI",
			},
		},
	]);

	const unreadCount = notifications.filter((n) => !n.read).length;

	const markAllAsRead = () => {
		setNotifications(notifications.map((n) => ({ ...n, read: true })));
	};

	const markAsRead = (id: string) => {
		setNotifications(
			notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
		);
	};

	const getNotificationIcon = (type: string) => {
		switch (type) {
			case "mention":
				return <AtSign className="h-4 w-4 text-purple-500" />;
			case "credibility":
				return <Star className="h-4 w-4 text-yellow-500" />;
			case "follow":
				return <UserPlus className="h-4 w-4 text-green-500" />;
			case "trending":
				return <TrendingUp className="h-4 w-4 text-purple-500" />;
			case "comment":
				return <MessageSquare className="h-4 w-4 text-blue-500" />;
			case "verification":
				return <Shield className="h-4 w-4 text-green-500" />;
			default:
				return <Bell className="h-4 w-4" />;
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" className="relative">
					<Bell className="h-5 w-5" />
					{unreadCount > 0 && (
						<span className="absolute top-1 right-1 flex h-2 w-2 items-center justify-center rounded-full bg-primary">
							{unreadCount > 9 && (
								<span className="absolute flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
									{unreadCount}
								</span>
							)}
						</span>
					)}
					<span className="sr-only">Notifications</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-80" align="end">
				<div className="flex items-center justify-between p-2">
					<DropdownMenuLabel className="font-normal">
						Notifications
					</DropdownMenuLabel>
					{unreadCount > 0 && (
						<Button
							variant="ghost"
							size="sm"
							onClick={markAllAsRead}
							className="h-8 text-xs"
						>
							Mark all as read
						</Button>
					)}
				</div>
				<DropdownMenuSeparator />

				<Tabs defaultValue="all" className="w-full">
					<TabsList className="grid w-full grid-cols-3">
						<TabsTrigger value="all">All</TabsTrigger>
						<TabsTrigger value="mentions">Mentions</TabsTrigger>
						<TabsTrigger value="verification">Verification</TabsTrigger>
					</TabsList>

					<TabsContent value="all" className="max-h-[300px] overflow-y-auto">
						<DropdownMenuGroup>
							{notifications.length > 0 ? (
								notifications.map((notification) => (
									<DropdownMenuItem
										key={notification.id}
										className="flex cursor-default items-start gap-2 p-3"
									>
										{notification.user ? (
											<Avatar className="h-8 w-8">
												<AvatarImage
													src={notification.user.avatar}
													alt={notification.user.name}
												/>
												<AvatarFallback>
													{notification.user.initials}
												</AvatarFallback>
											</Avatar>
										) : (
											<div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
												{getNotificationIcon(notification.type)}
											</div>
										)}
										<div className="flex-1 space-y-1">
											<p
												className={`text-sm ${!notification.read ? "font-medium" : ""}`}
											>
												{notification.content}
											</p>
											<p className="text-muted-foreground text-xs">
												{notification.time}
											</p>
										</div>
										{!notification.read && (
											<Button
												variant="ghost"
												size="icon"
												className="h-6 w-6"
												onClick={() => markAsRead(notification.id)}
											>
												<X className="h-3 w-3" />
												<span className="sr-only">Mark as read</span>
											</Button>
										)}
									</DropdownMenuItem>
								))
							) : (
								<div className="flex flex-col items-center justify-center p-4 text-center">
									<Bell className="mb-2 h-8 w-8 text-muted-foreground" />
									<p className="font-medium text-sm">No notifications</p>
									<p className="text-muted-foreground text-xs">
										When you get notifications, they'll show up here
									</p>
								</div>
							)}
						</DropdownMenuGroup>
					</TabsContent>

					<TabsContent
						value="mentions"
						className="max-h-[300px] overflow-y-auto"
					>
						<DropdownMenuGroup>
							{notifications.filter((n) => n.type === "mention").length > 0 ? (
								notifications
									.filter((n) => n.type === "mention")
									.map((notification) => (
										<DropdownMenuItem
											key={notification.id}
											className="flex cursor-default items-start gap-2 p-3"
										>
											<Avatar className="h-8 w-8">
												<AvatarImage
													src={notification.user?.avatar}
													alt={notification.user?.name}
												/>
												<AvatarFallback>
													{notification.user?.initials}
												</AvatarFallback>
											</Avatar>
											<div className="flex-1 space-y-1">
												<p
													className={`text-sm ${!notification.read ? "font-medium" : ""}`}
												>
													{notification.content}
												</p>
												<p className="text-muted-foreground text-xs">
													{notification.time}
												</p>
											</div>
											{!notification.read && (
												<Button
													variant="ghost"
													size="icon"
													className="h-6 w-6"
													onClick={() => markAsRead(notification.id)}
												>
													<X className="h-3 w-3" />
													<span className="sr-only">Mark as read</span>
												</Button>
											)}
										</DropdownMenuItem>
									))
							) : (
								<div className="flex flex-col items-center justify-center p-4 text-center">
									<AtSign className="mb-2 h-8 w-8 text-muted-foreground" />
									<p className="font-medium text-sm">No mentions</p>
									<p className="text-muted-foreground text-xs">
										When someone mentions you, it'll show up here
									</p>
								</div>
							)}
						</DropdownMenuGroup>
					</TabsContent>

					<TabsContent
						value="verification"
						className="max-h-[300px] overflow-y-auto"
					>
						<DropdownMenuGroup>
							{notifications.filter(
								(n) => n.type === "verification" || n.type === "credibility",
							).length > 0 ? (
								notifications
									.filter(
										(n) =>
											n.type === "verification" || n.type === "credibility",
									)
									.map((notification) => (
										<DropdownMenuItem
											key={notification.id}
											className="flex cursor-default items-start gap-2 p-3"
										>
											<div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
												{notification.type === "verification" ? (
													<Shield className="h-4 w-4 text-green-500" />
												) : (
													<Star className="h-4 w-4 text-yellow-500" />
												)}
											</div>
											<div className="flex-1 space-y-1">
												<p
													className={`text-sm ${!notification.read ? "font-medium" : ""}`}
												>
													{notification.content}
												</p>
												<p className="text-muted-foreground text-xs">
													{notification.time}
												</p>
											</div>
											{!notification.read && (
												<Button
													variant="ghost"
													size="icon"
													className="h-6 w-6"
													onClick={() => markAsRead(notification.id)}
												>
													<X className="h-3 w-3" />
													<span className="sr-only">Mark as read</span>
												</Button>
											)}
										</DropdownMenuItem>
									))
							) : (
								<div className="flex flex-col items-center justify-center p-4 text-center">
									<Shield className="mb-2 h-8 w-8 text-muted-foreground" />
									<p className="font-medium text-sm">No verification updates</p>
									<p className="text-muted-foreground text-xs">
										Verification and credibility updates will appear here
									</p>
								</div>
							)}
						</DropdownMenuGroup>
					</TabsContent>
				</Tabs>

				<DropdownMenuSeparator />
				<DropdownMenuItem asChild className="cursor-pointer">
					<Link
						href="/notifications"
						className="flex w-full justify-center text-sm"
					>
						View all notifications
					</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
