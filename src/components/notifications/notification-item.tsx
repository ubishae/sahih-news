"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AtSign, Bell, Info, MessageSquare, Shield } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export interface Notification {
	id: string;
	type: "verification" | "comment" | "mention" | "system";
	read: boolean;
	title: string;
	description: string;
	time: string;
	link: string;
}

interface NotificationItemProps {
	notification: Notification;
	onMarkAsRead: (id: string) => void;
}

export default function NotificationItem({
	notification,
	onMarkAsRead,
}: NotificationItemProps) {
	const [isHovered, setIsHovered] = useState(false);

	const getIcon = () => {
		switch (notification.type) {
			case "verification":
				return <Shield className="h-5 w-5" />;
			case "comment":
				return <MessageSquare className="h-5 w-5" />;
			case "mention":
				return <AtSign className="h-5 w-5" />;
			case "system":
				return <Info className="h-5 w-5" />;
			default:
				return <Bell className="h-5 w-5" />;
		}
	};

	const getTypeColor = () => {
		switch (notification.type) {
			case "verification":
				return "text-green-500";
			case "comment":
				return "text-blue-500";
			case "mention":
				return "text-purple-500";
			case "system":
				return "text-orange-500";
			default:
				return "text-gray-500";
		}
	};

	return (
		<div
			className={cn(
				"rounded-lg border p-4 transition-colors",
				notification.read ? "bg-background" : "bg-muted/20",
				isHovered && "border-muted-foreground/20",
			)}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="flex items-start gap-4">
				<div className={cn("rounded-full bg-muted p-2", getTypeColor())}>
					{getIcon()}
				</div>

				<div className="min-w-0 flex-1">
					<Link href={notification.link} className="block">
						<h3 className="line-clamp-1 font-medium text-foreground">
							{notification.title}
						</h3>
						<p className="mt-1 line-clamp-2 text-muted-foreground text-sm">
							{notification.description}
						</p>
						<div className="mt-2 flex items-center gap-2 text-muted-foreground text-xs">
							<span>{notification.time}</span>
							{!notification.read && (
								<span className="inline-block h-2 w-2 rounded-full bg-blue-500"></span>
							)}
						</div>
					</Link>
				</div>

				{!notification.read && (
					<Button
						variant="ghost"
						size="sm"
						className="text-xs"
						onClick={() => onMarkAsRead(notification.id)}
					>
						Mark as read
					</Button>
				)}
			</div>
		</div>
	);
}
