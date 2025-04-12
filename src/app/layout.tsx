import "@/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import { TRPCReactProvider } from "@/trpc/react";
import {
	ClerkLoaded,
	ClerkProvider,
	SignedIn,
	SignedOut,
	SignInButton,
	SignUpButton,
	UserButton,
} from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserDropdown } from "@/components/user-dropdown";
import Link from "next/link";

export const metadata: Metadata = {
	title: "SahihNews - Verified News Platform",
	description:
		"A social news-sharing platform that enables users to post real-time news and collaboratively verify credibility",
	icons: [{ rel: "icon", url: "/logo.png" }],
};

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<ClerkProvider>
			<html lang="en" className={`${geist.variable}`} suppressHydrationWarning>
				<body>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<TRPCReactProvider>
							<header className="flex h-16 items-center justify-between gap-4 p-4">
								<div className="flex grow gap-5">
									<SignedIn>
										<Link href="/posts" className="hover:underline">
											Posts
										</Link>
										<Link href="/bookmarks" className="hover:underline">
											Bookmarks
										</Link>
									</SignedIn>
								</div>
								<SignedOut>
									<SignInButton />
									<SignUpButton />
								</SignedOut>
								<SignedIn>
									<UserDropdown />
								</SignedIn>
								<ThemeToggle />
							</header>
							{children}

							<Toaster />
						</TRPCReactProvider>
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
