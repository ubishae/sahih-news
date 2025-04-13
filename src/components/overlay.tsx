import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface OverlayProps {
	children: ReactNode;
	isLoading: boolean;
	className?: string;
	loadingText?: string;
}

export default function Overlay({
	children,
	isLoading,
	className,
	loadingText = "Loading...",
}: OverlayProps) {
	return (
		<div className="relative">
			{children}

			{isLoading && (
				<div
					className={cn(
						"absolute",
						"inset-0",
						"z-50",
						"flex",
						"flex-col",
						"items-center",
						"justify-center",
						"bg-background/80",
						"backdrop-blur-sm",
						className,
					)}
				>
					<div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
					{loadingText && (
						<p className="mt-2 text-muted-foreground text-sm">{loadingText}</p>
					)}
				</div>
			)}
		</div>
	);
}
