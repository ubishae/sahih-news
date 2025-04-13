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
import { ModalProvider, ModalManager } from "@/components/modal-manager";
import { SheetManager, SheetProvider } from "@/components/sheet-manager";

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
				<body className="flex min-h-screen flex-col">
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<SheetProvider>
							<ModalProvider>
								<TRPCReactProvider>
									<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
										<div className="flex h-16 items-center justify-around">
											<div className="flex items-center gap-2">
												<Link href="/" className="flex items-center gap-2">
													<img
														src="/logo.png"
														alt="SahihNews Logo"
														className="h-8 w-8"
													/>
													<span className="hidden font-semibold text-lg sm:inline-block">
														SahihNews
													</span>
												</Link>
											</div>

											<nav className="mx-6 flex items-center gap-6">
												<SignedIn>
													<Link
														href="/posts"
														className="font-medium text-sm transition-colors hover:text-primary"
													>
														Posts
													</Link>
													<Link
														href="/bookmarks"
														className="font-medium text-sm transition-colors hover:text-primary"
													>
														Bookmarks
													</Link>
												</SignedIn>
											</nav>

											<div className="flex items-center gap-4">
												<SignedOut>
													<div className="flex gap-2">
														<SignInButton mode="modal" />
														<SignUpButton mode="modal" />
													</div>
												</SignedOut>
												<SignedIn>
													<UserDropdown />
												</SignedIn>
												<ThemeToggle />
											</div>
										</div>
									</header>

									<main className="flex-1 py-6">{children}</main>

									<footer className="border-t bg-background/95 py-4">
										<div className="flex flex-col items-center justify-around sm:flex-row">
											<div className="text-muted-foreground text-sm">
												{new Date().getFullYear()} SahihNews. All rights
												reserved.
											</div>
											<div className="mt-2 flex items-center gap-4 sm:mt-0">
												<Link
													href="/about"
													className="text-muted-foreground text-xs transition-colors hover:text-primary"
												>
													About
												</Link>
												<Link
													href="/privacy"
													className="text-muted-foreground text-xs transition-colors hover:text-primary"
												>
													Privacy
												</Link>
												<Link
													href="/terms"
													className="text-muted-foreground text-xs transition-colors hover:text-primary"
												>
													Terms
												</Link>
											</div>
										</div>
									</footer>

									<Toaster />
									<SheetManager />
									<ModalManager />
								</TRPCReactProvider>
							</ModalProvider>
						</SheetProvider>
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
