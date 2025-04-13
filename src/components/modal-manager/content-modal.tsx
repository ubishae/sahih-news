"use client";

import React from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import type { ContentModalProps } from "./context";

interface ContentModalComponentProps extends ContentModalProps {
	onClose: () => void;
	open: boolean;
}

export const ContentModal = ({
	title,
	children,
	onClose,
	open,
}: ContentModalComponentProps) => {
	return (
		<Dialog open={open} onOpenChange={(open) => !open && onClose()}>
			<DialogContent>
				{title && (
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
					</DialogHeader>
				)}
				{children}
			</DialogContent>
		</Dialog>
	);
};
