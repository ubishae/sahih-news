import { NotificationDropdown } from "@/components/notification-dropdown";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserDropdown } from "@/components/user-dropdown";
import { Menu, Search } from "lucide-react";
import Link from "next/link";

export default function Header() {
	return (
		<header className="sticky top-0 z-10 border-b bg-background">
			<div className="container mx-auto flex items-center justify-between px-4 py-3">
				<div className="flex items-center gap-4">
					<Button variant="ghost" size="icon" className="md:hidden">
						<Menu className="h-5 w-5" />
					</Button>
					<Link href="/" className="font-bold text-xl">
						SahihNews
					</Link>
					<div className="hidden items-center space-x-1 md:flex">
						<Button variant="ghost" size="sm" asChild>
							<Link href="/">Home</Link>
						</Button>
						<Button variant="ghost" size="sm" asChild>
							<Link href="/explore">Explore</Link>
						</Button>
						<Button variant="ghost" size="sm" asChild>
							<Link href="/bookmarks">Bookmarks</Link>
						</Button>
					</div>
				</div>

				<div className="relative hidden w-full max-w-xs md:flex">
					<Search className="absolute top-2.5 left-2 h-4 w-4 text-muted-foreground" />
					<Input placeholder="Search news and topics" className="pl-8" />
				</div>

				<div className="flex items-center gap-2">
					<NotificationDropdown />
					<ThemeToggle />
					<UserDropdown />
				</div>
			</div>
		</header>
	);
}
