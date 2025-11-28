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


  let labels = [];

  if (range === "w") {

    labels = data.map((p, i) => weekNames[i]);
  } else {
    if (isMobile) {
      // MOBILE — кожні кілька годин
      const stepX = Math.ceil(data.length / 8);
      labels = data.map((p, i) => (i % stepX === 0 ? p.h : ""));
    } else {

      labels = data.map((p) => p.h);
    }
  }


  const showPoints = data.map((p, i) => {
    if (!isMobile) return true;
    return labels[i] !== "";
  });


  const values = data.map((p) => p.ml);
  const max = Math.max(...values, 0);

  const maxTicks = 6;
  let step = Math.ceil(max / (maxTicks - 1));
  if (step < 50) step = 50;

  const suggestedMax = Math.ceil(max / step) * step;


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


  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    scales: {
      x: {
        ticks: {
          color: "#438BC4",
          maxRotation: 0,
          minRotation: 0,
          autoSkip: false,
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
