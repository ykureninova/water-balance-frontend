// src/components/ProgressCircle.jsx
import React from 'react';

export default function ProgressCircle({ progress, goal, size = 320 }) {
  const radius = size / 2 - 20; // відступ під товщину лінії
  const circumference = 2 * Math.PI * radius;

  const normalizedProgress = Math.min(progress, goal);
  const offsetNormal = circumference - (normalizedProgress / goal) * circumference;

  const overProgress = Math.max(progress - goal, 0);
  const maxOver = goal;
  const overOffset = circumference - (Math.min(overProgress, maxOver) / maxOver) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Фон */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="16"
          fill="none"
        />

        {/* Основний прогрес */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#0055A0"
          strokeWidth="16"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offsetNormal}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />

        {/* Перевищення норми */}
        {progress > goal && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#004480"
            strokeWidth="16"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={overOffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        )}
      </svg>

      {/* Текст по центру */}
      <div className="absolute text-center">
        <p className="text-4xl md:text-5xl font-bold text-[#0055A0] leading-none">
          {progress}
          <span className="text-2xl md:text-3xl text-gray-600"> ml</span>
        </p>
        <p className="text-sm md:text-base text-gray-500 mt-1">of {goal} ml</p>
        {progress > goal && (
          <p className="text-xs md:text-sm text-[#004480] font-medium mt-2">
            +{progress - goal} ml
          </p>
        )}
      </div>
    </div>
  );
}