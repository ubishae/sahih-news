import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface OverlayProps {
	children: ReactNode;
	isLoading: boolean;
	className?: string;
}

export default function Overlay({
	children,
	isLoading,
	className,
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
						"bg-background/40",
						"backdrop-blur-[1px]",
						className,
					)}
				/>
			)}
		</div>
	);
}
