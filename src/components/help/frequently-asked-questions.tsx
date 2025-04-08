import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export function FrequentlyAskedQuestions() {
	const faqs = [
		{
			question: "What is SahihNews?",
			answer:
				"SahihNews is a social news-sharing platform that enables users to post real-time news, engage with others through reactions and comments, and collaboratively verify the credibility of news stories through a reputation-based review system.",
		},
		{
			question: "How does the credibility system work?",
			answer:
				"Our credibility system is based on a combination of user reviews, fact-checker verifications, and AI-assisted analysis. News posts receive credibility tags (True, False, Unverified, or Misleading) based on community consensus and expert verification. Users also earn credibility scores based on the accuracy of their shared news and participation in reviewing others' posts.",
		},
		{
			question: "How can I become a verified fact-checker?",
			answer:
				"To become a verified fact-checker, you need to apply through our 'Become a Reviewer' program. The requirements include maintaining a high credibility score, demonstrating knowledge in specific topics, and completing our fact-checking training. Visit the Become a Reviewer page to learn more and apply.",
		},
		{
			question: "What happens if I share news that is later marked as false?",
			answer:
				"If you share news that is later marked as false, you'll receive a notification about the status change. Your credibility score may be affected, but you'll have the opportunity to update your post with correct information. We encourage users to learn from these experiences rather than penalizing honest mistakes.",
		},
		{
			question: "How can I report misleading or inappropriate content?",
			answer:
				"You can report content by clicking the three dots menu on any news post and selecting 'Report'. Choose the appropriate reason for reporting and provide additional details if necessary. Our moderation team reviews all reports and takes appropriate action based on our community guidelines.",
		},
		{
			question: "Can I delete my account and all my data?",
			answer:
				"Yes, you can delete your account and associated data through the Settings > Account > Delete Account option. Please note that this action is permanent and cannot be undone. Some information may be retained for legal purposes as outlined in our Privacy Policy.",
		},
	];

	return (
		<section className="py-10">
			<h2 className="mb-6 font-bold text-2xl">Frequently Asked Questions</h2>
			<Accordion type="single" collapsible className="w-full">
				{faqs.map((faq, index) => (
					<AccordionItem key={index} value={`item-${index}`}>
						<AccordionTrigger className="text-left">
							{faq.question}
						</AccordionTrigger>
						<AccordionContent>{faq.answer}</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</section>
	);
}
