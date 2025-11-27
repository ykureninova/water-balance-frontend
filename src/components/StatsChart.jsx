import React from "react";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

export default function StatsChart({ data, range, isMobile }) {
  if (!data || data.length === 0) return null;

  let labels = [];

  const weekNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // MOBILE LABELS
  if (isMobile) {
    if (range === "w") labels = data.map((p, i) => weekNames[i] ?? "");
    else if (range === "m")
      labels = data.map((p) =>
        p.h % 5 === 0 || p.h === 1 || p.h === data.length ? p.h : ""
      );
    else if (range === "d")
      labels = data.map((p) =>
        p.h % 3 === 0 || p.h === 1 || p.h === 24 ? p.h : ""
      );
    else if (range === "y") labels = data.map((p) => p.h);
  }

  // DESKTOP LABELS (FULL)
  else {
    if (range === "w") labels = data.map((p, i) => weekNames[i] ?? "");
    else labels = data.map((p) => p.h);
  }

  const chartData = {
    labels,
    datasets: [
      {
        data: data.map((p) => p.ml),
        borderColor: "#2C81D0",
        backgroundColor: "#2C81D0",
        borderWidth: 3,
        pointRadius: isMobile ? 4 : 6,
        pointBackgroundColor: "#2C81D0",
        tension: 0.35,
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: "#438BC4",
          font: {
            size: isMobile ? 9 : 12,
            family: "Montserrat",
            weight: "600",
          },
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
        },
        grid: { display: false },
      },
      y: {
        ticks: {
          color: "#438BC4",
          font: {
            size: isMobile ? 10 : 12,
            family: "Montserrat",
            weight: "600",
          },
        },
        grid: { color: "#E3EEF9" },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#0055A0",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 8,
      },
    },
    layout: { padding: isMobile ? 8 : 16 },
  };

  return (
    <div
      className={
        isMobile
          ? "relative w-[314px] h-[252px] flex items-center justify-center"
          : "relative w-[600px] h-[400px] flex items-center justify-center"
      }
    >
      <div className="absolute inset-0 bg-[#BDDBF7] opacity-70 blur-2xl rounded-[35px]" />
      <div className="absolute inset-0 bg-white rounded-[35px] shadow-md p-4">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
