"use client";

import EmptyState from "@/components/empty-state";
import NotificationItem, { type Notification } from "@/components/notifications/notification-item";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useState } from "react";

// Mock data for notifications
const mockNotifications: Notification[] = [
	{
		id: "1",
		type: "verification",
		read: false,
		title: "Your news post was verified",
		description:
			"Your post 'Breaking: New climate policy announced' has been verified by 3 reviewers.",
		time: "2 hours ago",
		link: "/news/123",
	},
	{
		id: "2",
		type: "comment",
		read: false,
		title: "New comment on your post",
		description:
			"Ahmed commented: 'Great reporting on this issue, thanks for sharing!'",
		time: "3 hours ago",
		link: "/news/123#comments",
	},
	{
		id: "3",
		type: "mention",
		read: true,
		title: "You were mentioned in a comment",
		description:
			"Sarah mentioned you: '@username what do you think about this development?'",
		time: "5 hours ago",
		link: "/news/456#comments",
	},
	{
		id: "4",
		type: "system",
		read: true,
		title: "Your reviewer application was approved",
		description:
			"Congratulations! You are now a verified reviewer on SahihNews.",
		time: "1 day ago",
		link: "/settings/verification",
	},
	{
		id: "5",
		type: "verification",
		read: true,
		title: "Your verification was helpful",
		description:
			"Your fact-check on 'Economic report 2023' was marked as helpful by 12 users.",
		time: "2 days ago",
		link: "/news/789",
	},
];

export default function NotificationsList() {
	const [notifications, setNotifications] = useState(mockNotifications);
	const [loading, setLoading] = useState(false);

	const markAsRead = (id: string) => {
		setNotifications(
			notifications.map((notification) =>
				notification.id === id ? { ...notification, read: true } : notification,
			),
		);
	};

	const loadMore = () => {
		setLoading(true);
		// Simulate loading more notifications
		setTimeout(() => {
			setLoading(false);
			// In a real app, you would fetch more notifications here
		}, 1000);
	};

	if (notifications.length === 0) {
		return (
			<EmptyState
				icon={<Bell className="h-12 w-12" />}
				title="No notifications yet"
				description="When you receive notifications, they'll appear here."
			/>
		);
	}

	return (
		<div className="space-y-4">
			{notifications.map((notification) => (
				<NotificationItem
					key={notification.id}
					notification={notification}
					onMarkAsRead={markAsRead}
				/>
			))}

			<div className="mt-6 flex justify-center">
				<Button variant="outline" onClick={loadMore} disabled={loading}>
					{loading ? "Loading..." : "Load more"}
				</Button>
			</div>
		</div>
	);
}
