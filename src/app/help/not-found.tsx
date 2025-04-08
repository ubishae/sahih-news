import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";
import Link from "next/link";

export default function HelpNotFound() {
	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main className="container mx-auto flex flex-col items-center justify-center px-4 py-12 text-center">
				<div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
					<FileQuestion className="h-12 w-12 text-muted-foreground" />
				</div>
				<h1 className="mb-4 font-bold text-4xl">Help Topic Not Found</h1>
				<p className="mb-8 max-w-md text-muted-foreground text-xl">
					We couldn't find the help topic you're looking for. It may have been
					moved or doesn't exist.
				</p>
				<div className="flex flex-col gap-4 sm:flex-row">
					<Button asChild>
						<Link href="/help">Return to Help Center</Link>
					</Button>
					<Button variant="outline" asChild>
						<Link href="/help#contact">Contact Support</Link>
					</Button>
				</div>
			</main>
		</div>
	);
}
