"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Check } from "lucide-react";
import { useState } from "react";

export default function NotificationsHeader() {
	const [filter, setFilter] = useState("all");

	return (
		<div className="mb-6 flex flex-col space-y-4">
			<div className="flex items-center justify-between">
				<h1 className="flex items-center gap-2 font-bold text-2xl">
					<Bell className="h-6 w-6" />
					Notifications
				</h1>
				<Button variant="outline" size="sm" className="flex items-center gap-1">
					<Check className="h-4 w-4" />
					Mark all as read
				</Button>
			</div>

			<Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
				<TabsList className="grid grid-cols-5 md:inline-flex md:w-auto">
					<TabsTrigger value="all">All</TabsTrigger>
					<TabsTrigger value="mentions">Mentions</TabsTrigger>
					<TabsTrigger value="verification">Verification</TabsTrigger>
					<TabsTrigger value="comments">Comments</TabsTrigger>
					<TabsTrigger value="system">System</TabsTrigger>
				</TabsList>
			</Tabs>
		</div>
	);
}
