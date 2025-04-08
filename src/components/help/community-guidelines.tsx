import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export function CommunityGuidelines() {
	return (
		<section className="py-10">
			<h2 className="mb-6 font-bold text-2xl">Community Guidelines</h2>
			<Card>
				<CardHeader>
					<CardTitle>Our Community Standards</CardTitle>
					<CardDescription>
						SahihNews is committed to creating a safe, respectful, and
						informative environment for all users. Please follow these
						guidelines when using our platform.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="space-y-4">
						<div className="flex items-start gap-3">
							<CheckCircle className="mt-0.5 h-5 w-5 text-green-600" />
							<div>
								<h3 className="font-medium">Share Accurate Information</h3>
								<p className="text-muted-foreground">
									Verify facts before posting, include reliable sources, and be
									willing to correct mistakes.
								</p>
							</div>
						</div>

						<div className="flex items-start gap-3">
							<CheckCircle className="mt-0.5 h-5 w-5 text-green-600" />
							<div>
								<h3 className="font-medium">Be Respectful</h3>
								<p className="text-muted-foreground">
									Treat others with respect, even when disagreeing. Avoid
									personal attacks, harassment, or hate speech.
								</p>
							</div>
						</div>

						<div className="flex items-start gap-3">
							<CheckCircle className="mt-0.5 h-5 w-5 text-green-600" />
							<div>
								<h3 className="font-medium">Participate Constructively</h3>
								<p className="text-muted-foreground">
									Contribute to discussions in a meaningful way. Help verify
									information and provide valuable insights.
								</p>
							</div>
						</div>
					</div>

					<div className="space-y-4">
						<div className="flex items-start gap-3">
							<AlertTriangle className="mt-0.5 h-5 w-5 text-amber-600" />
							<div>
								<h3 className="font-medium">Prohibited Content</h3>
								<p className="text-muted-foreground">
									Do not post content that is illegal, harmful, misleading, or
									violates others' privacy or intellectual property.
								</p>
							</div>
						</div>

						<div className="flex items-start gap-3">
							<XCircle className="mt-0.5 h-5 w-5 text-red-600" />
							<div>
								<h3 className="font-medium">Consequences of Violations</h3>
								<p className="text-muted-foreground">
									Violations may result in content removal, reduced credibility
									scores, temporary restrictions, or account termination.
								</p>
							</div>
						</div>
					</div>

					<Button variant="outline" className="w-full sm:w-auto">
						Read Full Community Guidelines
					</Button>
				</CardContent>
			</Card>
		</section>
	);
}
