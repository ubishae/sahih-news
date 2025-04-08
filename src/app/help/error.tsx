"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function HelpError({
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
		<main className="container mx-auto flex flex-col items-center justify-center px-4 py-12 text-center">
			<div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
				<AlertTriangle className="h-12 w-12 text-red-600" />
			</div>
			<h1 className="mb-4 font-bold text-4xl">Something went wrong</h1>
			<p className="mb-8 max-w-md text-muted-foreground text-xl">
				We encountered an error while loading this help page. Please try again
				or contact support if the problem persists.
			</p>
			<div className="flex flex-col gap-4 sm:flex-row">
				<Button onClick={reset}>Try Again</Button>
				<Button variant="outline" asChild>
					<Link href="/help">Return to Help Center</Link>
				</Button>
			</div>
		</main>
	);
}
