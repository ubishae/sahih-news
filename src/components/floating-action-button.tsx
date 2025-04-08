"use client";

import QuickPost from "@/components/quick-post";
import { useEffect, useState } from "react";

export default function FloatingActionButton() {
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			// Hide when scrolling down, show when scrolling up
			if (currentScrollY > lastScrollY && isVisible) {
				setIsVisible(false);
			} else if (currentScrollY < lastScrollY && !isVisible) {
				setIsVisible(true);
			}

			setLastScrollY(currentScrollY);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [lastScrollY, isVisible]);

	return (
		<div
			className={`fixed right-6 bottom-6 transition-transform duration-300 md:hidden ${
				isVisible ? "translate-y-0" : "translate-y-20"
			}`}
		>
			<QuickPost
				buttonVariant="default"
				buttonSize="icon"
				className="h-14 w-14 rounded-full shadow-lg"
			/>
		</div>
	);
}
