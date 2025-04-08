import Header from "@/components/header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main className="container mx-auto max-w-4xl px-4 py-6">
				{/* Profile header skeleton */}
				<Card className="mb-6">
					<CardContent className="pt-6">
						<div className="flex flex-col gap-6 md:flex-row">
							<div className="flex flex-col items-center md:items-start">
								<Skeleton className="mb-4 h-24 w-24 rounded-full md:h-32 md:w-32" />
								<div className="mb-4 grid w-full grid-cols-4 gap-2 md:hidden">
									{Array(4)
										.fill(0)
										.map((_, i) => (
											<div key={i} className="flex flex-col items-center">
												<Skeleton className="mb-1 h-5 w-12" />
												<Skeleton className="h-3 w-10" />
											</div>
										))}
								</div>
								<div className="flex w-full gap-2 md:hidden">
									<Skeleton className="h-9 flex-1" />
									<Skeleton className="h-9 w-9" />
									<Skeleton className="h-9 w-9" />
								</div>
							</div>

							<div className="flex-1">
								<div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
									<div>
										<Skeleton className="mb-2 h-8 w-40" />
										<Skeleton className="h-4 w-24" />
									</div>
									<div className="hidden gap-2 md:flex">
										<Skeleton className="h-10 w-28" />
										<Skeleton className="h-10 w-28" />
										<Skeleton className="h-10 w-10" />
										<Skeleton className="h-10 w-10" />
									</div>
								</div>

								<div className="mt-4 flex items-center gap-2">
									<Skeleton className="h-6 w-40" />
								</div>

								<div className="mt-4 space-y-2">
									<Skeleton className="h-4 w-full" />
									<Skeleton className="h-4 w-full" />
									<Skeleton className="h-4 w-3/4" />
								</div>

								<div className="mt-4 flex flex-col gap-2">
									<Skeleton className="h-4 w-40" />
									<Skeleton className="h-4 w-48" />
									<Skeleton className="h-4 w-36" />
									<Skeleton className="h-4 w-32" />
								</div>

								<div className="mt-4 hidden items-center gap-6 md:flex">
									{Array(4)
										.fill(0)
										.map((_, i) => (
											<div key={i} className="flex items-center gap-1">
												<Skeleton className="h-5 w-8" />
												<Skeleton className="h-4 w-16" />
											</div>
										))}
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Expertise and Achievements skeletons */}
				<div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
					{/* Expertise skeleton */}
					<Card>
						<CardHeader className="pb-2">
							<Skeleton className="mb-2 h-6 w-40" />
							<Skeleton className="h-4 w-48" />
						</CardHeader>
						<CardContent>
							<div className="flex flex-wrap gap-2">
								{Array(4)
									.fill(0)
									.map((_, i) => (
										<Skeleton key={i} className="h-6 w-20" />
									))}
							</div>
						</CardContent>
					</Card>

					{/* Achievements skeleton */}
					<Card>
						<CardHeader className="pb-2">
							<Skeleton className="mb-2 h-6 w-40" />
							<Skeleton className="h-4 w-48" />
						</CardHeader>
						<CardContent>
							<div className="space-y-3">
								{Array(3)
									.fill(0)
									.map((_, i) => (
										<div key={i} className="flex items-center gap-2">
											<Skeleton className="h-8 w-8 rounded-full" />
											<div>
												<Skeleton className="mb-1 h-4 w-32" />
												<Skeleton className="h-3 w-24" />
											</div>
										</div>
									))}
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Credibility section skeleton */}
				<Card className="mb-6">
					<CardHeader className="pb-2">
						<Skeleton className="mb-2 h-6 w-48" />
						<Skeleton className="h-4 w-full" />
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
							<div className="col-span-1 md:col-span-2">
								<Skeleton className="h-[250px] w-full" />
							</div>
							<div className="space-y-4">
								<div className="space-y-2">
									<Skeleton className="mb-2 h-5 w-40" />
									<div className="space-y-3">
										{Array(3)
											.fill(0)
											.map((_, i) => (
												<div key={i} className="space-y-1">
													<div className="flex justify-between">
														<Skeleton className="h-4 w-24" />
														<Skeleton className="h-4 w-12" />
													</div>
													<Skeleton className="h-2 w-full" />
												</div>
											))}
									</div>
								</div>

								<div className="flex flex-wrap gap-2">
									<Skeleton className="h-6 w-32" />
									<Skeleton className="h-6 w-24" />
									<Skeleton className="h-6 w-28" />
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Recent Activity skeleton */}
				<Card className="mb-6">
					<CardHeader className="pb-2">
						<Skeleton className="mb-2 h-6 w-40" />
						<Skeleton className="h-4 w-48" />
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
							{Array(3)
								.fill(0)
								.map((_, i) => (
									<div
										key={i}
										className="rounded-lg bg-muted/50 p-4 text-center"
									>
										<Skeleton className="mx-auto mb-2 h-8 w-12" />
										<Skeleton className="mx-auto h-4 w-24" />
									</div>
								))}
						</div>
					</CardContent>
				</Card>

				{/* Tabs skeleton */}
				<div className="space-y-6">
					<Skeleton className="h-10 w-full" />

					<div className="space-y-4">
						{Array(3)
							.fill(0)
							.map((_, i) => (
								<Skeleton key={i} className="h-[200px] w-full" />
							))}
					</div>
				</div>
			</main>
		</div>
	);
}
