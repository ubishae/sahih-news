"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { ConfirmModalProps } from "./context";

interface ConfirmModalComponentProps extends ConfirmModalProps {
	onClose: () => void;
	open: boolean;
}

export const ConfirmModal = ({
	title,
	description,
	children,
	labels = { confirm: "Confirm", cancel: "Cancel" },
	onConfirm,
	onCancel,
	confirmProps,
	cancelProps,
	closeOnConfirm = true,
	closeOnCancel = true,
	onClose,
	open,
}: ConfirmModalComponentProps) => {
	const handleConfirm = () => {
		if (onConfirm) {
			onConfirm();
		}
		if (closeOnConfirm) {
			onClose();
		}
	};

	const handleCancel = () => {
		if (onCancel) {
			onCancel();
		}
		if (closeOnCancel) {
			onClose();
		}
	};

	return (
		<Dialog open={open} onOpenChange={(open) => !open && onClose()}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					{description && <DialogDescription>{description}</DialogDescription>}
				</DialogHeader>
				{children}
				<DialogFooter className="flex justify-end gap-2 sm:justify-end">
					<Button
						variant="outline"
						onClick={handleCancel}
						{...(cancelProps || {})}
					>
						{labels.cancel}
					</Button>
					<Button onClick={handleConfirm} {...(confirmProps || {})}>
						{labels.confirm}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
