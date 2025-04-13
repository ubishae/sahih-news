"use client";

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import type { ContentSheetProps } from "./context";
import type { SheetSide } from "./types";

interface ContentSheetComponentProps extends ContentSheetProps {
	onClose: () => void;
	open: boolean;
}

export const ContentSheet = ({
	title,
	description,
	children,
	onClose,
	open,
	side = "right",
}: ContentSheetComponentProps) => {
	return (
		<Sheet open={open} onOpenChange={(open) => !open && onClose()}>
			<SheetContent side={side as SheetSide}>
				{(title || description) && (
					<SheetHeader>
						{title && <SheetTitle>{title}</SheetTitle>}
						{description && <SheetDescription>{description}</SheetDescription>}
					</SheetHeader>
				)}
				{children}
			</SheetContent>
		</Sheet>
	);
};
