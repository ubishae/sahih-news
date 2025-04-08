import Header from "@/components/header";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main className="container mx-auto max-w-6xl px-4 py-6">
				<Skeleton className="mb-6 h-8 w-32" />

				<div className="flex flex-col gap-6 md:flex-row">
					<div className="flex-shrink-0 md:w-64">
						<Skeleton className="h-[300px] w-full rounded-lg" />
					</div>

					<div className="flex-1">
						<Skeleton className="h-[600px] w-full rounded-lg" />
					</div>
				</div>
			</main>
		</div>
	);
}
