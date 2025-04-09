import "@/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import { TRPCReactProvider } from "@/trpc/react";
import { ClerkLoaded, ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
	title: "SahihNews - Verified News Platform",
	description:
		"A social news-sharing platform that enables users to post real-time news and collaboratively verify credibility",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
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
							{children}

							<Toaster />
						</TRPCReactProvider>
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
