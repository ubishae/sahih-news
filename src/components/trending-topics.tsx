import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function TrendingTopics() {
	// Sample trending topics data
	const trendingTopics = [
		{ id: 1, tag: "ClimatePolicy", count: "12.5K posts" },
		{ id: 2, tag: "TechInnovation", count: "8.3K posts" },
		{ id: 3, tag: "SportsUpdate", count: "6.7K posts" },
		{ id: 4, tag: "HealthStudy", count: "5.2K posts" },
		{ id: 5, tag: "LocalNews", count: "3.9K posts" },
	];

	return (
		<Card>
			<CardHeader className="pb-2">
				<CardTitle className="flex items-center font-medium text-base">
					<TrendingUp className="mr-2 h-4 w-4" />
					Trending Topics
				</CardTitle>
			</CardHeader>
			<CardContent className="pt-0">
				<div className="space-y-2">
					{trendingTopics.map((topic) => (
						<Link
							key={topic.id}
							href={`/topic/${topic.tag}`}
							className="flex items-center justify-between rounded-md p-2 transition-colors hover:bg-muted"
						>
							<div>
								<div className="font-medium">#{topic.tag}</div>
								<div className="text-muted-foreground text-xs">
									{topic.count}
								</div>
							</div>
							<ArrowUpRight className="h-4 w-4 text-muted-foreground" />
						</Link>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
