import { Skeleton } from "@/components/ui/skeleton";

export default function NotificationsLoading() {
	return (
		<div className="space-y-4">
			{Array.from({ length: 5 }).map((_, i) => (
				<div key={i} className="rounded-lg border p-4">
					<div className="flex items-start gap-4">
						<Skeleton className="h-10 w-10 rounded-full" />
						<div className="flex-1">
							<Skeleton className="mb-2 h-5 w-3/4" />
							<Skeleton className="mb-2 h-4 w-full" />
							<Skeleton className="h-3 w-1/4" />
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
