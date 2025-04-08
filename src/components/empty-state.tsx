import type { ReactNode } from "react";

interface EmptyStateProps {
	icon: ReactNode;
	title: string;
	description: string;
	action?: ReactNode;
}

export default function EmptyState({
	icon,
	title,
	description,
	action,
}: EmptyStateProps) {
	return (
		<div className="flex flex-col items-center justify-center space-y-4 p-8 text-center">
			<div className="text-muted-foreground">{icon}</div>
			<h3 className="font-medium text-lg">{title}</h3>
			<p className="max-w-md text-muted-foreground">{description}</p>
			{action && <div className="pt-2">{action}</div>}
		</div>
	);
}
