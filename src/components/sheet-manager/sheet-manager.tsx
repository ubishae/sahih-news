"use client";

import React from "react";
import { useSheets } from "./context";
import { ContentSheet } from "./content-sheet";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import type { SheetSide, SheetWidth, SheetHeight } from "./types";

// Define an interface for components that can be used with the sheet manager
interface SheetComponentProps {
	onClose?: () => void;
	[key: string]: unknown;
}

export const SheetManager: React.FC = () => {
	const { sheets, closeSheet } = useSheets();

	// Create a className based on the width prop
	const getWidthClass = (width?: SheetWidth) => {
		if (!width) return "";

		// Handle predefined sizes
		switch (width) {
			case "sm":
				return "sm:max-w-sm";
			case "md":
				return "sm:max-w-md";
			case "lg":
				return "sm:max-w-lg";
			case "xl":
				return "sm:max-w-xl";
			case "2xl":
				return "sm:max-w-2xl";
			case "full":
				return "sm:max-w-full";
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
			case "sm":
				return "max-h-[25vh]";
			case "md":
				return "max-h-[50vh]";
			case "lg":
				return "max-h-[75vh]";
			case "xl":
				return "max-h-[85vh]";
			case "2xl":
				return "max-h-[90vh]";
			case "full":
				return "max-h-screen";
			default:
				// If it's a custom value, assume it's a valid CSS class
				return height;
		}
	};

	return (
		<>
			{sheets.map((sheet) => {
				// Render content sheet
				if (sheet.component === "content" && sheet.props) {
					return (
						<ContentSheet
							key={sheet.id}
							open={true}
							onClose={() => closeSheet(sheet.id)}
							side={sheet.side as SheetSide}
							width={sheet.width}
							height={sheet.height}
							title={sheet.props.title as string | undefined}
							description={sheet.props.description as string | undefined}
							children={sheet.props.children as React.ReactNode}
							{...sheet.props}
						/>
					);
				}

				// Get width and height classes for custom component sheet
				const widthClass = getWidthClass(sheet.width);
				const heightClass = getHeightClass(sheet.height);

				// Combine classes
				const combinedClasses = [widthClass, heightClass]
					.filter(Boolean)
					.join(" ");

				// Render custom component sheet
				return (
					<Sheet
						key={sheet.id}
						open={true}
						onOpenChange={(open) => !open && closeSheet(sheet.id)}
					>
						<SheetContent
							side={sheet.side as SheetSide}
							className={`${sheet.height === "full" ? "h-full" : ""} ${
								sheet.width === "full" ? "w-full" : ""
							} ${combinedClasses} ${sheet.side === "bottom" ? "px-10 py-5" : ""}`}
						>
							<SheetHeader>
								<SheetTitle className="sr-only">Sheet</SheetTitle>
							</SheetHeader>
							{React.isValidElement(sheet.component)
								? React.cloneElement(
										sheet.component as React.ReactElement<SheetComponentProps>,
										{
											...((sheet.props as Record<string, unknown>) || {}),
											onClose: () => closeSheet(sheet.id),
										},
									)
								: sheet.component}
						</SheetContent>
					</Sheet>
				);
			})}
		</>
	);
};
