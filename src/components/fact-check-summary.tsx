import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	AlertCircle,
	CheckCircle,
	Clock,
	HelpCircle,
	XCircle,
} from "lucide-react";

interface FactCheckSummaryProps {
	verdict: "true" | "false" | "unverified" | "misleading";
	summary: string;
	factChecker: {
		name: string;
		credibilityScore: number;
		verifiedDate: string;
	};
	keyPoints: string[];
}

export default function FactCheckSummary({
	verdict,
	summary,
	factChecker,
	keyPoints,
}: FactCheckSummaryProps) {
	const getVerdictBadge = () => {
		switch (verdict) {
			case "true":
				return (
					<Badge className="flex items-center gap-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
						<CheckCircle className="h-3 w-3" />
						Verified True
					</Badge>
				);
			case "false":
				return (
					<Badge className="flex items-center gap-1 bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
						<XCircle className="h-3 w-3" />
						False
					</Badge>
				);
			case "unverified":
				return (
					<Badge className="flex items-center gap-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
						<HelpCircle className="h-3 w-3" />
						Unverified
					</Badge>
				);
			case "misleading":
				return (
					<Badge className="flex items-center gap-1 bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400">
						<AlertCircle className="h-3 w-3" />
						Misleading
					</Badge>
				);
		}
	};

	return (
		<Card>
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<CardTitle className="flex items-center gap-2 text-lg">
						<CheckCircle className="h-5 w-5 text-green-600" />
						Fact Check Summary
					</CardTitle>
					{getVerdictBadge()}
				</div>
			</CardHeader>
			<CardContent>
				<p className="mb-4">{summary}</p>

				<div className="mb-4 flex items-center gap-3 rounded-md bg-muted p-3">
					<Avatar>
						<AvatarImage
							src="/placeholder.svg?height=40&width=40"
							alt={factChecker.name}
						/>
						<AvatarFallback>{factChecker.name.charAt(0)}</AvatarFallback>
					</Avatar>
					<div>
						<div className="flex items-center gap-1">
							<span className="font-medium">{factChecker.name}</span>
							<CheckCircle className="h-3.5 w-3.5 fill-blue-500 text-blue-500" />
							<span className="ml-1 rounded-full bg-muted-foreground/20 px-1.5 py-0.5 text-xs">
								{factChecker.credibilityScore}
							</span>
						</div>
						<div className="flex items-center gap-1 text-muted-foreground text-sm">
							<Clock className="h-3 w-3" />
							<span>Verified {factChecker.verifiedDate}</span>
						</div>
					</div>
				</div>

				<div>
					<h4 className="mb-2 font-medium">Key Findings</h4>
					<ul className="space-y-2">
						{keyPoints.map((point, index) => (
							<li key={index} className="flex items-start gap-2">
								<CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
								<span>{point}</span>
							</li>
						))}
					</ul>
				</div>
			</CardContent>
		</Card>
	);
}
