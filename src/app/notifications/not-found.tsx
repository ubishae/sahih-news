import EmptyState from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import Link from "next/link";

export default function NotificationsNotFound() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center p-4">
			<EmptyState
				icon={<Bell className="h-12 w-12" />}
				title="Page not found"
				description="The notifications page you're looking for doesn't exist."
				action={
					<Button asChild>
						<Link href="/notifications">Go to notifications</Link>
					</Button>
				}
			/>
		</div>
	);
}
