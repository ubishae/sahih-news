"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
	Bell,
	ChevronRight,
	Database,
	KeyRound,
	Layers,
	Lock,
	Palette,
	Shield,
	User,
} from "lucide-react";
import Link from "next/link";

interface SettingsSidebarProps {
	activeTab: string;
}

export default function SettingsSidebar({ activeTab }: SettingsSidebarProps) {
	const tabs = [
		{
			id: "profile",
			label: "Profile",
			icon: <User className="mr-2 h-4 w-4" />,
		},
		{
			id: "account",
			label: "Account",
			icon: <KeyRound className="mr-2 h-4 w-4" />,
		},
		{
			id: "notifications",
			label: "Notifications",
			icon: <Bell className="mr-2 h-4 w-4" />,
		},
		{
			id: "privacy",
			label: "Privacy",
			icon: <Lock className="mr-2 h-4 w-4" />,
		},
		{
			id: "content",
			label: "Content",
			icon: <Layers className="mr-2 h-4 w-4" />,
		},
		{
			id: "verification",
			label: "Verification",
			icon: <Shield className="mr-2 h-4 w-4" />,
		},
		{
			id: "appearance",
			label: "Appearance",
			icon: <Palette className="mr-2 h-4 w-4" />,
		},
		{ id: "data", label: "Data", icon: <Database className="mr-2 h-4 w-4" /> },
	];

	return (
		<div className="rounded-lg border bg-card shadow-sm">
			<div className="space-y-1 p-2">
				{tabs.map((tab) => (
					<Button
						key={tab.id}
						variant={activeTab === tab.id ? "secondary" : "ghost"}
						asChild
						className={cn(
							"w-full justify-start",
							activeTab === tab.id && "bg-muted",
						)}
					>
						<Link href={`/settings?tab=${tab.id}`}>
							<div className="flex w-full items-center justify-between">
								<div className="flex items-center">
									{tab.icon}
									{tab.label}
								</div>
								<ChevronRight
									className={cn(
										"h-4 w-4 text-muted-foreground transition-opacity",
										activeTab === tab.id ? "opacity-100" : "opacity-0",
									)}
								/>
							</div>
						</Link>
					</Button>
				))}
			</div>
		</div>
	);
}
