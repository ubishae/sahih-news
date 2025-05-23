"use client";

import { createContext, useContext, useState } from "react";
import { nanoid } from "nanoid";
import type { SheetSide, SheetWidth, SheetHeight } from "./types";

export type SheetProps = {
	id: string;
	component: React.ReactNode | "content";
	props?: Record<string, unknown>;
	onClose?: () => void;
	side?: SheetSide;
	width?: SheetWidth;
	height?: SheetHeight;
};

export type ContentSheetProps = {
	title?: string;
	description?: string;
	children: React.ReactNode;
	onClose?: () => void;
	side?: SheetSide;
	width?: SheetWidth;
	height?: SheetHeight;
};

type SheetContextType = {
	sheets: SheetProps[];
	openSheet: (
		component: React.ReactNode,
		props?: Record<string, unknown>,
		side?: SheetSide,
		width?: SheetWidth,
		height?: SheetHeight,
	) => string;
	openContentSheet: (props: ContentSheetProps) => string;
	closeSheet: (id: string) => void;
	closeAll: () => void;
};

const SheetContext = createContext<SheetContextType | undefined>(undefined);

export const SheetProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [sheets, setSheets] = useState<SheetProps[]>([]);

	const openSheet = (
		component: React.ReactNode,
		props?: Record<string, unknown>,
		side: SheetSide = "right",
		width?: SheetWidth,
		height?: SheetHeight,
	) => {
		const id = nanoid();
		setSheets((current) => [
			...current,
			{ id, component, props, side, width, height },
		]);
		return id;
	};

	const openContentSheet = (props: ContentSheetProps) => {
		const id = nanoid();
		const side = props.side || "right";
		const width = props.width;
		const height = props.height;
		setSheets((current) => [
			...current,
			{
				id,
				component: "content",
				props,
				side,
				width,
				height,
				onClose: () => {
					if (props.onClose) {
						props.onClose();
					}
					closeSheet(id);
				},
			},
		]);
		return id;
	};

	const closeSheet = (id: string) => {
		setSheets((current) => {
			const sheetToClose = current.find((sheet) => sheet.id === id);
			if (sheetToClose?.onClose) {
				sheetToClose.onClose();
			}
			return current.filter((sheet) => sheet.id !== id);
		});
	};

	const closeAll = () => {
		for (const sheet of sheets) {
			if (sheet.onClose) {
				sheet.onClose();
			}
		}
		setSheets([]);
	};

	return (
		<SheetContext.Provider
			value={{
				sheets,
				openSheet,
				openContentSheet,
				closeSheet,
				closeAll,
			}}
		>
			{children}
		</SheetContext.Provider>
	);
};

export const useSheets = () => {
	const context = useContext(SheetContext);
	if (context === undefined) {
		throw new Error("useSheets must be used within a SheetProvider");
	}
	return context;
};
