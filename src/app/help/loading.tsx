import Header from "@/components/header";
import { Skeleton } from "@/components/ui/skeleton";

export default function HelpLoading() {
	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main className="container mx-auto max-w-4xl px-4 py-6">
				{/* Hero section skeleton */}
				<div className="mb-10 space-y-4">
					<Skeleton className="h-12 w-3/4 max-w-md" />
					<Skeleton className="h-6 w-full max-w-2xl" />
					<Skeleton className="h-10 w-40" />
				</div>

				{/* Categories skeleton */}
				<div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3">
					{Array(6)
						.fill(0)
						.map((_, i) => (
							<Skeleton key={i} className="h-40 rounded-lg" />
						))}
				</div>

				{/* FAQ skeleton */}
				<div className="mb-10 space-y-4">
					<Skeleton className="h-8 w-48" />
					{Array(5)
						.fill(0)
						.map((_, i) => (
							<Skeleton key={i} className="h-16 rounded-lg" />
						))}
				</div>

				{/* Contact form skeleton */}
				<div className="space-y-4">
					<Skeleton className="h-8 w-48" />
					<Skeleton className="h-64 rounded-lg" />
				</div>
			</main>
		</div>
	);
}
