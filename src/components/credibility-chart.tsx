"use client";

import { useEffect, useRef } from "react";

interface CredibilityChartProps {
	accurate: number;
	inaccurate: number;
	consensusPercentage: number;
}

export default function CredibilityChart({
	accurate,
	inaccurate,
	consensusPercentage,
}: CredibilityChartProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		// Clear canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Draw pie chart
		const total = accurate + inaccurate;
		const accurateAngle = (accurate / total) * Math.PI * 2;

		// Draw accurate slice
		ctx.beginPath();
		ctx.moveTo(100, 100);
		ctx.arc(100, 100, 80, 0, accurateAngle);
		ctx.fillStyle = "#22c55e"; // green
		ctx.fill();

		// Draw inaccurate slice
		ctx.beginPath();
		ctx.moveTo(100, 100);
		ctx.arc(100, 100, 80, accurateAngle, Math.PI * 2);
		ctx.fillStyle = "#ef4444"; // red
		ctx.fill();

		// Draw inner circle for donut chart
		ctx.beginPath();
		ctx.arc(100, 100, 50, 0, Math.PI * 2);
		ctx.fillStyle = "#ffffff";
		ctx.fill();

		// Add text in the middle
		ctx.fillStyle = "#000000";
		ctx.font = "bold 24px sans-serif";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(`${consensusPercentage}%`, 100, 100);

		// Add legend
		ctx.font = "14px sans-serif";
		ctx.fillStyle = "#22c55e";
		ctx.fillRect(20, 200, 15, 15);
		ctx.fillStyle = "#000000";
		ctx.textAlign = "left";
		ctx.fillText(`Accurate (${accurate})`, 45, 212);

		ctx.fillStyle = "#ef4444";
		ctx.fillRect(20, 225, 15, 15);
		ctx.fillStyle = "#000000";
		ctx.fillText(`Inaccurate (${inaccurate})`, 45, 237);
	}, [accurate, inaccurate, consensusPercentage]);

	return (
		<div className="flex justify-center">
			<canvas ref={canvasRef} width="200" height="250" className="max-w-full" />
		</div>
	);
}
