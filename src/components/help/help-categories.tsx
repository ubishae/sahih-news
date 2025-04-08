import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	BookOpen,
	FileQuestion,
	LifeBuoy,
	MessageSquare,
	ShieldCheck,
	Users,
} from "lucide-react";
import Link from "next/link";

export function HelpCategories() {
	const categories = [
		{
			title: "Getting Started",
			description: "Learn the basics of using SahihNews",
			icon: <BookOpen className="h-6 w-6" />,
			href: "/help/getting-started",
		},
		{
			title: "Account & Profile",
			description: "Manage your account settings and profile",
			icon: <Users className="h-6 w-6" />,
			href: "/help/account",
		},
		{
			title: "News Verification",
			description: "Understand how news verification works",
			icon: <ShieldCheck className="h-6 w-6" />,
			href: "/help/verification",
		},
		{
			title: "Posting & Sharing",
			description: "Learn how to post and share news",
			icon: <MessageSquare className="h-6 w-6" />,
			href: "/help/posting",
		},
		{
			title: "Troubleshooting",
			description: "Solve common issues and problems",
			icon: <LifeBuoy className="h-6 w-6" />,
			href: "/help/troubleshooting",
		},
		{
			title: "FAQ",
			description: "Frequently asked questions",
			icon: <FileQuestion className="h-6 w-6" />,
			href: "/help/faq",
		},
	];

	return (
		<section className="py-10">
			<h2 className="mb-6 font-bold text-2xl">Help Categories</h2>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				{categories.map((category, index) => (
					<Link href={category.href} key={index} className="block">
						<Card className="h-full transition-all hover:shadow-md">
							<CardHeader className="pb-2">
								<div className="mb-2 text-primary">{category.icon}</div>
								<CardTitle>{category.title}</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription>{category.description}</CardDescription>
							</CardContent>
						</Card>
					</Link>
				))}
			</div>
		</section>
	);
}
