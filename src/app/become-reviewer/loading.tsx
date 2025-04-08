import Header from "@/components/header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main className="container mx-auto max-w-4xl px-4 py-6">
				{/* Hero section skeleton */}
				<div className="mb-8 text-center">
					<Skeleton className="mx-auto mb-4 h-14 w-14 rounded-full" />
					<Skeleton className="mx-auto mb-2 h-10 w-64" />
					<Skeleton className="mx-auto h-4 w-full max-w-2xl" />
					<Skeleton className="mx-auto mt-2 h-4 w-full max-w-md" />
				</div>

				{/* Eligibility card skeleton */}
				<Card className="mb-8">
					<CardHeader>
						<Skeleton className="mb-2 h-6 w-48" />
						<Skeleton className="h-4 w-64" />
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<Skeleton className="h-10 w-10 rounded-full" />
										<div>
											<Skeleton className="mb-1 h-5 w-32" />
											<Skeleton className="h-4 w-24" />
										</div>
									</div>
									<Skeleton className="h-6 w-20" />
								</div>

								<div className="space-y-3">
									{Array(4)
										.fill(0)
										.map((_, i) => (
											<div key={i} className="space-y-1">
												<div className="flex justify-between">
													<Skeleton className="h-4 w-32" />
													<Skeleton className="h-4 w-20" />
												</div>
												<Skeleton className="h-2 w-full" />
											</div>
										))}
								</div>
							</div>

							<div className="flex flex-col justify-center">
								<Skeleton className="h-32 w-full" />
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Tabs skeleton */}
				<Skeleton className="mb-6 h-10 w-full" />

				<div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
					{Array(3)
						.fill(0)
						.map((_, i) => (
							<Card key={i}>
								<CardHeader>
									<Skeleton className="mx-auto mb-2 h-12 w-12 rounded-full" />
									<Skeleton className="mx-auto mb-1 h-6 w-32" />
									<Skeleton className="mx-auto h-4 w-24" />
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="space-y-2">
										<Skeleton className="h-5 w-24" />
										<div className="space-y-2">
											{Array(4)
												.fill(0)
												.map((_, j) => (
													<div key={j} className="flex items-center gap-2">
														<Skeleton className="h-4 w-4 rounded-full" />
														<Skeleton className="h-4 w-full" />
													</div>
												))}
										</div>
									</div>

									<div className="space-y-2">
										<Skeleton className="h-5 w-24" />
										<div className="space-y-2">
											{Array(4)
												.fill(0)
												.map((_, j) => (
													<div key={j} className="flex items-center gap-2">
														<Skeleton className="h-4 w-4 rounded-full" />
														<Skeleton className="h-4 w-full" />
													</div>
												))}
										</div>
									</div>
								</CardContent>
							</Card>
						))}
				</div>

				{/* FAQ skeleton */}
				<div className="space-y-4">
					<Skeleton className="mb-2 h-8 w-48" />
					<div className="space-y-2">
						{Array(5)
							.fill(0)
							.map((_, i) => (
								<Skeleton key={i} className="h-12 w-full" />
							))}
					</div>
				</div>

				{/* CTA skeleton */}
				<Skeleton className="mt-8 h-40 w-full" />
			</main>
		</div>
	);
}
