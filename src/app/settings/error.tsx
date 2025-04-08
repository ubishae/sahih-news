"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
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
		<div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
			<AlertTriangle className="mb-4 h-16 w-16 text-red-500" />
			<h1 className="mb-2 font-bold text-3xl">Something went wrong</h1>
			<p className="mb-6 max-w-md text-muted-foreground">
				We encountered an error while loading your settings. Please try again or
				contact support if the problem persists.
			</p>
			<div className="flex gap-4">
				<Button onClick={reset}>Try Again</Button>
				<Button variant="outline" asChild>
					<Link href="/">Back to Home</Link>
				</Button>
			</div>
		</div>
	);
}
