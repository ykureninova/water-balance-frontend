import React from 'react'

export default function ProgressCircle({ progress, goal }) {
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / goal) * circumference;

  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      <svg className="w-48 h-48 transform -rotate-90">
        <circle
          cx="96"
          cy="96"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="12"
          fill="none"
        />
        <circle
          cx="96"
          cy="96"
          r={radius}
          stroke="#0055A0"
          strokeWidth="12"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-2xl font-semibold text-gray-800">{progress} ml</p>
        <p className="text-sm text-gray-500">of {goal} ml</p>
      </div>
    </div>
  );
}
