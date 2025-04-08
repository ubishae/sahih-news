import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function HelpHero() {
	return (
		<section className="space-y-6 py-10 text-center">
			<h1 className="font-bold text-4xl tracking-tight">
				How can we help you?
			</h1>
			<p className="mx-auto max-w-2xl text-muted-foreground text-xl">
				Find answers to common questions, learn how to use SahihNews, and get in
				touch with our support team.
			</p>
			<div className="relative mx-auto max-w-md">
				<Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
				<Input
					placeholder="Search for help topics..."
					className="py-6 pr-4 pl-9 text-base"
				/>
				<Button className="absolute top-1 right-1">Search</Button>
			</div>
		</section>
	);
}
