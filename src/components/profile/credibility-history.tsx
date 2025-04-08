"use client";

import { useEffect, useRef } from "react";

interface CredibilityHistoryProps {
	history: number[];
}

export default function CredibilityHistory({
	history,
}: CredibilityHistoryProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		// Clear canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Set dimensions
		const width = canvas.width;
		const height = canvas.height;
		const padding = 40;
		const chartWidth = width - padding * 2;
		const chartHeight = height - padding * 2;

		// Find min and max values for scaling
		const minValue = Math.min(...history) * 0.9; // Add 10% padding
		const maxValue = Math.max(...history) * 1.1; // Add 10% padding
		const valueRange = maxValue - minValue;

		// Draw axes
		ctx.beginPath();
		ctx.strokeStyle = "#e2e8f0"; // Tailwind slate-200
		ctx.moveTo(padding, padding);
		ctx.lineTo(padding, height - padding);
		ctx.lineTo(width - padding, height - padding);
		ctx.stroke();

		// Draw labels
		ctx.fillStyle = "#94a3b8"; // Tailwind slate-400
		ctx.font = "12px sans-serif";
		ctx.textAlign = "center";

		// X-axis labels
		const months = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
		];
		const barWidth = chartWidth / history.length;
		months.slice(0, history.length).forEach((month, i) => {
			const x = padding + i * barWidth + barWidth / 2;
			ctx.fillText(month, x, height - padding + 20);
		});

		// Y-axis labels
		ctx.textAlign = "right";
		for (let i = 0; i <= 5; i++) {
			const value = Math.round(minValue + (valueRange / 5) * i);
			const y =
				height - padding - ((value - minValue) / valueRange) * chartHeight;
			ctx.fillText(value.toString(), padding - 10, y + 4);

			// Draw horizontal grid lines
			ctx.beginPath();
			ctx.strokeStyle = "#e2e8f0"; // Tailwind slate-200
			ctx.setLineDash([5, 5]);
			ctx.moveTo(padding, y);
			ctx.lineTo(width - padding, y);
			ctx.stroke();
			ctx.setLineDash([]);
		}

		// Draw line chart
		ctx.beginPath();
		ctx.strokeStyle = "#22c55e"; // Tailwind green-500
		ctx.lineWidth = 3;

		history.forEach((value, i) => {
			const x = padding + i * barWidth + barWidth / 2;
			const y =
				height - padding - ((value - minValue) / valueRange) * chartHeight;

			if (i === 0) {
				ctx.moveTo(x, y);
			} else {
				ctx.lineTo(x, y);
			}
		});

		ctx.stroke();

		// Add points
		history.forEach((value, i) => {
			const x = padding + i * barWidth + barWidth / 2;
			const y =
				height - padding - ((value - minValue) / valueRange) * chartHeight;

			ctx.beginPath();
			ctx.fillStyle = "#ffffff";
			ctx.arc(x, y, 5, 0, Math.PI * 2);
			ctx.fill();

			ctx.beginPath();
			ctx.strokeStyle = "#22c55e"; // Tailwind green-500
			ctx.lineWidth = 2;
			ctx.arc(x, y, 5, 0, Math.PI * 2);
			ctx.stroke();
		});

		// Add area under the line
		ctx.beginPath();
		ctx.fillStyle = "#22c55e20"; // Tailwind green-500 with transparency

		history.forEach((value, i) => {
			const x = padding + i * barWidth + barWidth / 2;
			const y =
				height - padding - ((value - minValue) / valueRange) * chartHeight;

			if (i === 0) {
				ctx.moveTo(x, y);
			} else {
				ctx.lineTo(x, y);
			}
		});

		// Complete the area
		const lastX = padding + (history.length - 1) * barWidth + barWidth / 2;
		ctx.lineTo(lastX, height - padding);
		ctx.lineTo(padding + barWidth / 2, height - padding);
		ctx.closePath();
		ctx.fill();
	}, [history]);

	return (
		<div className="h-[250px] w-full">
			<canvas
				ref={canvasRef}
				width="600"
				height="250"
				className="h-full w-full"
			/>
		</div>
	);
}
