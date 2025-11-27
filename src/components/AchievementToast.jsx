// src/components/AchievementToast.jsx
import React from "react";

export default function AchievementToast({ visible, onClose, achievement }) {
  if (!visible || !achievement) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[99999] bg-black/30">
      <div className="bg-white w-[280px] rounded-3xl p-6 shadow-lg animate-fadeIn flex flex-col items-center">
        <h2 className="text-[20px] font-bold text-[#0055A0] mb-3">Congrats!</h2>

        <img
          src={achievement.icon}
          alt={achievement.name}
          className="w-[60px] h-[60px] mb-3"
        />

        <p className="text-[18px] font-semibold text-[#0055A0] mb-1 text-center">
          {achievement.name}
        </p>

        <p className="text-[12px] text-gray-600 text-center mb-4">
          {achievement.condition}
        </p>

        <button
          onClick={onClose}
          className="bg-[#0055A0] text-white px-4 py-2 rounded-2xl text-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
}
