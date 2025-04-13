"use client";

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import type { ContentSheetProps } from "./context";
import type { SheetSide, SheetWidth, SheetHeight } from "./types";

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
	width,
	height,
}: ContentSheetComponentProps & { width?: SheetWidth; height?: SheetHeight }) => {
	// Create a className based on the width prop
	const getWidthClass = (width?: SheetWidth) => {
		if (!width) return "";
		
		// Handle predefined sizes
		switch (width) {
			case "sm": return "sm:max-w-sm";
			case "md": return "sm:max-w-md";
			case "lg": return "sm:max-w-lg";
			case "xl": return "sm:max-w-xl";
			case "2xl": return "sm:max-w-2xl";
			case "full": return "sm:max-w-full";
			default: 
				// If it's a custom value, assume it's a valid CSS class
				return width.startsWith("sm:max-w-") ? width : "";
		}
	};

	// Create a className based on the height prop
	const getHeightClass = (height?: SheetHeight) => {
		if (!height) return "";
		
		// Handle predefined sizes
		switch (height) {
			case "sm": return "max-h-[25vh]";
			case "md": return "max-h-[50vh]";
			case "lg": return "max-h-[75vh]";
			case "xl": return "max-h-[85vh]";
			case "2xl": return "max-h-[90vh]";
			case "full": return "max-h-screen";
			default: 
				// If it's a custom value, assume it's a valid CSS class
				return height;
		}
	};

	const widthClass = getWidthClass(width);
	const heightClass = getHeightClass(height);
	
	// Combine classes
	const combinedClasses = [widthClass, heightClass].filter(Boolean).join(" ");

	return (
		<Sheet open={open} onOpenChange={(open) => !open && onClose()}>
			<SheetContent 
				side={side as SheetSide} 
				className={`${height === "full" ? "h-full" : ""} ${
					width === "full" ? "w-full" : ""
				} ${combinedClasses} ${side === "bottom" ? "px-10 py-5" : ""}`}
			>
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
