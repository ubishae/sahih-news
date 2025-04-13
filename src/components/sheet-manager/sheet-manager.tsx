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
import type { SheetSide } from "./types";

// Define an interface for components that can be used with the sheet manager
interface SheetComponentProps {
	onClose?: () => void;
	[key: string]: unknown;
}

export const SheetManager: React.FC = () => {
	const { sheets, closeSheet } = useSheets();

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
							title={sheet.props.title as string | undefined}
							description={sheet.props.description as string | undefined}
							children={sheet.props.children as React.ReactNode}
							{...sheet.props}
						/>
					);
				}

				// Render custom component sheet
				return (
					<Sheet
						key={sheet.id}
						open={true}
						onOpenChange={(open) => !open && closeSheet(sheet.id)}
					>
						<SheetContent side={sheet.side as SheetSide}>
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
