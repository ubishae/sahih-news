"use client";

import { Button } from "@/components/ui/button";
import { useSheets } from "./index";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const SheetExample = () => {
	const sheets = useSheets();

	// Example of opening a content sheet
	const openContentSheet = (
		side: "top" | "right" | "bottom" | "left" = "right",
		width?: "sm" | "md" | "lg" | "xl" | "2xl" | "full",
		height?: "sm" | "md" | "lg" | "xl" | "2xl" | "full",
	) => {
		sheets.openContentSheet({
			title: "User Profile",
			description: "Update your profile information",
			side,
			width,
			height,
			children: (
				<div className="py-4">
					<div className="grid w-full items-center gap-4">
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="name">Name</Label>
							<Input id="name" placeholder="Your name" />
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="email">Email</Label>
							<Input id="email" placeholder="Your email" />
						</div>
					</div>
					<div className="mt-6 flex justify-end">
						<Button
							onClick={() => {
								// Close all sheets
								sheets.closeAll();
							}}
						>
							Save Changes
						</Button>
					</div>
				</div>
			),
		});
	};

	// Example of opening a custom component sheet
	const openCustomSheet = (
		side: "top" | "right" | "bottom" | "left" = "right",
		width?: "sm" | "md" | "lg" | "xl" | "2xl" | "full",
		height?: "sm" | "md" | "lg" | "xl" | "2xl" | "full",
	) => {
		sheets.openSheet(
			<div className="space-y-4">
				<h2 className="font-bold text-xl">Custom Sheet</h2>
				<p>
					This is a fully custom sheet with complete control over its content.
				</p>
				<Button
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
			{},
			side,
			width,
			height,
		);
	};

	return (
		<div className="flex flex-col gap-4 p-4">
			<h1 className="font-bold text-2xl">Sheet Manager Examples</h1>

			<div className="space-y-4">
				<h2 className="font-semibold text-lg">Content Sheets</h2>
				<div className="flex flex-wrap gap-2">
					<Button onClick={() => openContentSheet("right")}>Right Sheet</Button>
					<Button onClick={() => openContentSheet("left")}>Left Sheet</Button>
					<Button onClick={() => openContentSheet("top")}>Top Sheet</Button>
					<Button onClick={() => openContentSheet("bottom")}>
						Bottom Sheet
					</Button>
					<Button onClick={() => openContentSheet("right", "lg")}>
						Right Sheet with width
					</Button>
					<Button onClick={() => openContentSheet("right", "lg", "lg")}>
						Right Sheet with width and height
					</Button>
				</div>
			</div>

			<div className="space-y-4">
				<h2 className="font-semibold text-lg">Custom Sheets</h2>
				<div className="flex flex-wrap gap-2">
					<Button onClick={() => openCustomSheet("right")}>
						Right Custom Sheet
					</Button>
					<Button onClick={() => openCustomSheet("left")}>
						Left Custom Sheet
					</Button>
					<Button onClick={() => openCustomSheet("top")}>
						Top Custom Sheet
					</Button>
					<Button onClick={() => openCustomSheet("bottom")}>
						Bottom Custom Sheet
					</Button>
					<Button onClick={() => openCustomSheet("right", "lg")}>
						Right Custom Sheet with width
					</Button>
					<Button onClick={() => openCustomSheet("right", "lg", "lg")}>
						Right Custom Sheet with width and height
					</Button>
				</div>
			</div>
		</div>
	);
};
