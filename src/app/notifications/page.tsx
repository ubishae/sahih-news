import Header from "@/components/header";
import NotificationsHeader from "@/components/notifications/notifications-header";
import NotificationsList from "@/components/notifications/notifications-list";
import { Suspense } from "react";
import NotificationsLoading from "./loading";

export default function NotificationsPage() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="container mx-auto max-w-4xl flex-1 px-4 py-6">
				<NotificationsHeader />
				<Suspense fallback={<NotificationsLoading />}>
					<NotificationsList />
				</Suspense>
			</main>
		</div>
	);
}
