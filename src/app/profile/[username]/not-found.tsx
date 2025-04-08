import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Home, Search, UserX } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main className="container mx-auto max-w-4xl px-4 py-12">
				<div className="flex flex-col items-center justify-center text-center">
					<UserX className="mb-6 h-24 w-24 text-muted-foreground" />
					<h1 className="mb-2 font-bold text-3xl">User Not Found</h1>
					<p className="mb-8 max-w-md text-muted-foreground">
						The user profile you're looking for doesn't exist or may have been
						removed.
					</p>
					<div className="flex flex-col gap-4 sm:flex-row">
						<Button asChild>
							<Link href="/">
								<Home className="mr-2 h-4 w-4" />
								Return Home
							</Link>
						</Button>
						<Button variant="outline" asChild>
							<Link href="/explore">
								<Search className="mr-2 h-4 w-4" />
								Find Users
							</Link>
						</Button>
					</div>
				</div>
			</main>
		</div>
	);
}
