import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
			<AlertTriangle className="mb-4 h-16 w-16 text-yellow-500" />
			<h1 className="mb-2 font-bold text-3xl">Settings Page Not Found</h1>
			<p className="mb-6 max-w-md text-muted-foreground">
				The settings page you're looking for doesn't exist or may have been
				moved.
			</p>
			<div className="flex gap-4">
				<Button asChild>
					<Link href="/settings">Go to Settings</Link>
				</Button>
				<Button variant="outline" asChild>
					<Link href="/">Back to Home</Link>
				</Button>
			</div>
		</div>
	);
}
