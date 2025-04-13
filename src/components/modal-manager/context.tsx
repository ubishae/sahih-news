"use client";

import { createContext, useContext, useState } from "react";
import { nanoid } from "nanoid";

export type ModalProps = {
	id: string;
	component: React.ReactNode | "confirm" | "content";
	props?: Record<string, unknown>;
	onClose?: () => void;
};

export type ConfirmModalProps = {
	title: string;
	description?: string;
	children?: React.ReactNode;
	labels?: {
		confirm: string;
		cancel: string;
	};
	onConfirm?: () => void;
	onCancel?: () => void;
	confirmProps?: Record<string, unknown>;
	cancelProps?: Record<string, unknown>;
	closeOnConfirm?: boolean;
	closeOnCancel?: boolean;
};

export type ContentModalProps = {
	title?: string;
	children: React.ReactNode;
	onClose?: () => void;
};

type ModalContextType = {
	modals: ModalProps[];
	openModal: (
		component: React.ReactNode,
		props?: Record<string, unknown>,
	) => string;
	openConfirmModal: (props: ConfirmModalProps) => string;
	openContentModal: (props: ContentModalProps) => string;
	closeModal: (id: string) => void;
	closeAll: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [modals, setModals] = useState<ModalProps[]>([]);

	const openModal = (
		component: React.ReactNode,
		props?: Record<string, unknown>,
	) => {
		const id = nanoid();
		setModals((current) => [...current, { id, component, props }]);
		return id;
	};

	const openConfirmModal = (props: ConfirmModalProps) => {
		const id = nanoid();
		// The actual component will be rendered by the ConfirmModal component
		setModals((current) => [
			...current,
			{
				id,
				component: "confirm",
				props,
				onClose: () => {
					// Default onClose behavior
					closeModal(id);
				},
			},
		]);
		return id;
	};

	const openContentModal = (props: ContentModalProps) => {
		const id = nanoid();
		setModals((current) => [
			...current,
			{
				id,
				component: "content",
				props,
				onClose: () => {
					if (props.onClose) {
						props.onClose();
					}
					closeModal(id);
				},
			},
		]);
		return id;
	};

	const closeModal = (id: string) => {
		setModals((current) => {
			const modalToClose = current.find((modal) => modal.id === id);
			if (modalToClose?.onClose) {
				modalToClose.onClose();
			}
			return current.filter((modal) => modal.id !== id);
		});
	};

	const closeAll = () => {
		// Use for...of instead of forEach
		for (const modal of modals) {
			if (modal.onClose) {
				modal.onClose();
			}
		}
		setModals([]);
	};

	return (
		<ModalContext.Provider
			value={{
				modals,
				openModal,
				openConfirmModal,
				openContentModal,
				closeModal,
				closeAll,
			}}
		>
			{children}
		</ModalContext.Provider>
	);
};

export const useModals = () => {
	const context = useContext(ModalContext);
	if (context === undefined) {
		throw new Error("useModals must be used within a ModalProvider");
	}
	return context;
};
