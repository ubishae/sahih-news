import Header from "@/components/header";
import { CommunityGuidelines } from "@/components/help/community-guidelines";
import { ContactSupport } from "@/components/help/contact-support";
import { FrequentlyAskedQuestions } from "@/components/help/frequently-asked-questions";
import { HelpCategories } from "@/components/help/help-categories";
import { HelpHero } from "@/components/help/help-hero";

export const metadata = {
	title: "Help & Support - SahihNews",
	description:
		"Get help with SahihNews, find answers to common questions, and contact our support team.",
};

export default function HelpPage() {
	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main className="container mx-auto max-w-4xl px-4 py-6">
				<HelpHero />
				<HelpCategories />
				<FrequentlyAskedQuestions />
				<CommunityGuidelines />
				<ContactSupport />
			</main>
		</div>
	);
}
