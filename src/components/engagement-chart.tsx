"use client";

import { useEffect, useRef } from "react";

interface EngagementChartProps {
	data: number[];
	labels: string[];
	type: "bar" | "line";
	color: string;
}

export default function EngagementChart({
	data,
	labels,
	type,
	color,
}: EngagementChartProps) {
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

		// Find max value for scaling
		const maxValue = Math.max(...data) * 1.1; // Add 10% padding

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
		const barWidth = chartWidth / data.length;
		labels.forEach((label, i) => {
			const x = padding + i * barWidth + barWidth / 2;
			ctx.fillText(label, x, height - padding + 20);
		});

		// Y-axis labels
		ctx.textAlign = "right";
		for (let i = 0; i <= 5; i++) {
			const value = Math.round((maxValue / 5) * i);
			const y = height - padding - (value / maxValue) * chartHeight;
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

		// Draw data
		if (type === "bar") {
			// Bar chart
			const barSpacing = 5;
			const actualBarWidth = (barWidth - barSpacing) * 0.8;

			data.forEach((value, i) => {
				const barHeight = (value / maxValue) * chartHeight;
				const x = padding + i * barWidth + (barWidth - actualBarWidth) / 2;
				const y = height - padding - barHeight;

				ctx.fillStyle = color;
				ctx.fillRect(x, y, actualBarWidth, barHeight);
			});
		} else {
			// Line chart
			ctx.beginPath();
			ctx.strokeStyle = color;
			ctx.lineWidth = 3;

			data.forEach((value, i) => {
				const x = padding + i * barWidth + barWidth / 2;
				const y = height - padding - (value / maxValue) * chartHeight;

				if (i === 0) {
					ctx.moveTo(x, y);
				} else {
					ctx.lineTo(x, y);
				}
			});

			ctx.stroke();

			// Add points
			data.forEach((value, i) => {
				const x = padding + i * barWidth + barWidth / 2;
				const y = height - padding - (value / maxValue) * chartHeight;

				ctx.beginPath();
				ctx.fillStyle = "#ffffff";
				ctx.arc(x, y, 5, 0, Math.PI * 2);
				ctx.fill();

				ctx.beginPath();
				ctx.strokeStyle = color;
				ctx.lineWidth = 2;
				ctx.arc(x, y, 5, 0, Math.PI * 2);
				ctx.stroke();
			});

			// Add area under the line
			ctx.beginPath();
			ctx.fillStyle = `${color}20`; // Add transparency

			data.forEach((value, i) => {
				const x = padding + i * barWidth + barWidth / 2;
				const y = height - padding - (value / maxValue) * chartHeight;

				if (i === 0) {
					ctx.moveTo(x, y);
				} else {
					ctx.lineTo(x, y);
				}
			});

			// Complete the area
			const lastX = padding + (data.length - 1) * barWidth + barWidth / 2;
			ctx.lineTo(lastX, height - padding);
			ctx.lineTo(padding + barWidth / 2, height - padding);
			ctx.closePath();
			ctx.fill();
		}
	}, [data, labels, type, color]);

	return (
		<canvas
			ref={canvasRef}
			width="800"
			height="400"
			className="h-full w-full"
		/>
	);
}
