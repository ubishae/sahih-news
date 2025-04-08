"use client";

import EmptyState from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function NotificationsError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div className="flex min-h-screen flex-col items-center justify-center p-4">
			<EmptyState
				icon={<AlertTriangle className="h-12 w-12" />}
				title="Something went wrong"
				description="There was an error loading your notifications. Please try again."
				action={
					<div className="flex gap-4">
						<Button onClick={reset} variant="default">
							Try again
						</Button>
						<Button asChild variant="outline">
							<Link href="/">Go home</Link>
						</Button>
					</div>
				}
			/>
		</div>
	);
}
