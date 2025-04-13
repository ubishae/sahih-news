"use client";

import React from "react";
import { useModals } from "./context";
import { ConfirmModal } from "./confirm-modal";
import { ContentModal } from "./content-modal";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

// Define an interface for components that can be used with the modal manager
interface ModalComponentProps {
	onClose?: () => void;
	[key: string]: unknown;
}

export const ModalManager: React.FC = () => {
	const { modals, closeModal } = useModals();

	return (
		<>
			{modals.map((modal) => {
				// Render confirm modal
				if (modal.component === "confirm" && modal.props) {
					return (
						<ConfirmModal
							key={modal.id}
							open={true}
							onClose={() => closeModal(modal.id)}
							title={modal.props.title as string}
							{...modal.props}
						/>
					);
				}

				// Render content modal
				if (modal.component === "content" && modal.props) {
					return (
						<ContentModal
							key={modal.id}
							open={true}
							onClose={() => closeModal(modal.id)}
							children={modal.props.children as React.ReactNode}
							{...modal.props}
						/>
					);
				}

				// Render custom component modal
				return (
					<Dialog
						key={modal.id}
						open={true}
						onOpenChange={(open) => !open && closeModal(modal.id)}
					>
						<DialogContent>
							<DialogHeader>
								<DialogTitle className="sr-only">Modal</DialogTitle>
							</DialogHeader>
							{React.isValidElement(modal.component)
								? React.cloneElement(
										modal.component as React.ReactElement<ModalComponentProps>,
										{
											...((modal.props as Record<string, unknown>) || {}),
											onClose: () => closeModal(modal.id),
										},
									)
								: modal.component}
						</DialogContent>
					</Dialog>
				);
			})}
		</>
	);
};
