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

  const weekNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // X-labels
  let labels = [];

  if (range === "w") {
    labels = data.map((p, i) => weekNames[i]);
  } else {
    if (isMobile) {
      const stepX = Math.ceil(data.length / 8);
      labels = data.map((p, i) => (i % stepX === 0 ? p.h : ""));
    } else {
      labels = data.map((p) => p.h);
    }
  }

  // Показ точок (лише там, де є підпис на мобільному)
  const showPoints = data.map((p, i) => (!isMobile ? true : labels[i] !== ""));

  // Значення ml
  const values = data.map((p) => p.ml);
  const maxValue = Math.max(...values, 0);

  // ----- КРАСИВА ШКАЛА Y -----
  let step;
  if (maxValue <= 200) step = 50;
  else if (maxValue <= 500) step = 100;
  else if (maxValue <= 1500) step = 200;
  else if (maxValue <= 3000) step = 300;
  else step = 500;

  const suggestedMax = Math.ceil(maxValue / step) * step;
  const maxTicks = 6;

  // Chart.js data
  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        borderColor: "#2C81D0",
        pointBackgroundColor: "#2C81D0",
        borderWidth: 3,
        tension: 0.35,
        pointRadius: (ctx) => {
          const i = ctx.dataIndex;
          return showPoints[i] ? (isMobile ? 4 : 6) : 0;
        },
      },
    ],
  };

  // Chart.js options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    scales: {
      x: {
        ticks: {
          color: "#438BC4",
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
        },
        grid: { display: false },
      },

      y: {
        beginAtZero: true,
        suggestedMax,
        ticks: {
          color: "#438BC4",
          stepSize: step,
          maxTicksLimit: maxTicks,
        },
        grid: { color: "#E3EEF9" },
      },
    },

    plugins: {
      tooltip: {
        backgroundColor: "#0055A0",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
      legend: { display: false },
    },
  };

  return (
    <div
      className={
        isMobile
          ? "relative w-[314px] h-[252px]"
          : "relative w-[600px] h-[400px]"
      }
    >
      <div className="absolute inset-0 bg-white rounded-[35px] shadow-lg p-4">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
