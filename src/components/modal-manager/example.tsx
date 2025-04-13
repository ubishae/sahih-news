"use client";

import { Button } from "@/components/ui/button";
import { useModals } from "./index";

export const ModalExample = () => {
	const modals = useModals();

	// Example of opening a confirm modal
	const openConfirmModal = () => {
		modals.openConfirmModal({
			title: "Delete Post",
			description:
				"Are you sure you want to delete this post? This action cannot be undone.",
			labels: { confirm: "Delete", cancel: "Cancel" },
			confirmProps: { variant: "destructive" },
			onConfirm: () => {
				console.log("Post deleted");
				// Call your API to delete the post
			},
			onCancel: () => {
				console.log("Deletion cancelled");
			},
		});
	};

	// Example of opening a content modal
	const openContentModal = () => {
		modals.openContentModal({
			title: "Post Details",
			children: (
				<div className="py-4">
					<p>
						This is a custom content modal that can contain any React
						components.
					</p>
					<div className="mt-4">
						<Button
							onClick={() => {
								// Do something
								modals.closeAll();
							}}
						>
							Close All Modals
						</Button>
					</div>
				</div>
			),
		});
	};

	// Example of opening a custom component modal
	const openCustomModal = () => {
		modals.openModal(
			<div className="p-4">
				<h2 className="mb-4 font-bold text-xl">Custom Modal</h2>
				<p>
					This is a fully custom modal with complete control over its content.
				</p>
				<Button
					className="mt-4"
					onClick={(e) => {
						// Access the onClose function from props
						type ElementWithOnClose = HTMLButtonElement & {
							onClose?: () => void;
						};
						const onClose = (e.currentTarget as ElementWithOnClose).onClose;
						if (onClose) onClose();
					}}
				>
					Close
				</Button>
			</div>,
		);
	};

	return (
		<div className="flex flex-col gap-4 p-4">
			<h1 className="font-bold text-2xl">Modal Manager Examples</h1>
			<div className="flex gap-4">
				<Button onClick={openConfirmModal}>Open Confirm Modal</Button>
				<Button onClick={openContentModal}>Open Content Modal</Button>
				<Button onClick={openCustomModal}>Open Custom Modal</Button>
			</div>
		</div>
	);
};
