import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import WeeklyGoalGlass from "../components/WeeklyGoalGlass";
import AchievementToast from "../components/AchievementToast";

import { api } from "../api/client.js";

import streakIcon from "../assets/streak.png";

import firstSipIcon from "../assets/first_sip.png";
import firstGoalIcon from "../assets/first_goal.png";
import backAgainIcon from "../assets/back_again.png";
import streak3Icon from "../assets/3_day_streak.png";
import streak7Icon from "../assets/7_day_streak.png";
import streak14Icon from "../assets/14_day_streak.png";
import streak30Icon from "../assets/30_day_streak.png";
import liter1Icon from "../assets/1_liter_club.png";
import liter10Icon from "../assets/10_liters_total.png";
import liter100Icon from "../assets/100_liters_legend.png";
import earlyBirdIcon from "../assets/early_bird.png";
import nightOwlIcon from "../assets/night_owl.png";
import healthyHabitIcon from "../assets/healthy_habit.png";

const META = {
  first_sip: { icon: firstSipIcon },
  first_goal: { icon: firstGoalIcon },
  back_again: { icon: backAgainIcon },
  streak_3: { icon: streak3Icon },
  streak_7: { icon: streak7Icon },
  streak_14: { icon: streak14Icon },
  streak_30: { icon: streak30Icon },
  liter_1: { icon: liter1Icon },
  liter_10: { icon: liter10Icon },
  liter_100: { icon: liter100Icon },
  early_bird: { icon: earlyBirdIcon },
  night_owl: { icon: nightOwlIcon },
  healthy_habit: { icon: healthyHabitIcon },
};

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);

  // тиждень
  const [weekDays, setWeekDays] = useState(
    [false, false, false, false, false, false, false]
  );
  const [weeklySum, setWeeklySum] = useState(0);
  const [weeklyGoal, setWeeklyGoal] = useState(0);
  const [weeklyPercent, setWeeklyPercent] = useState(0);
  const [weeklyStreak, setWeeklyStreak] = useState(0); // дні підряд

  // тости та модалка
  const [toastVisible, setToastVisible] = useState(false);
  const [toastData, setToastData] = useState(null);
  const [selected, setSelected] = useState(null);

  const showToast = (a) => {
    setToastData(a);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };


  useEffect(() => {
    const handler = (e) => {
      const list = e.detail;
      if (!list?.length) return;

      const a = list[list.length - 1];
      const meta = META[a.code];

      showToast({
        name: a.name,
        condition: a.condition,
        icon: meta?.icon,
      });

      loadAchievements();
      loadWeeklyInfo();
    };

    window.addEventListener("achievement-earned", handler);
    return () => window.removeEventListener("achievement-earned", handler);
  }, []);


  // LOAD ACHIEVEMENTS
  const loadAchievements = async () => {
    const data = await api("/achievements/user/me");
    if (!data) return;

    const mapped = data.map((d) => ({
      ...d,
      icon: META[d.code]?.icon,
    }));

    setAchievements(
      mapped.sort((a, b) => new Date(a.achievedAt) - new Date(b.achievedAt))
    );
  };


  // LOAD WEEKLY CARD DATA
  const loadWeeklyInfo = async () => {
    const data = await api("/achievements/user/me/streak");
    if (!data) return;

    setWeekDays(
      Array.isArray(data.weekDays) && data.weekDays.length === 7
        ? data.weekDays
        : [false, false, false, false, false, false, false]
    );
    setWeeklySum(data.weeklySum || 0);
    setWeeklyGoal(data.weeklyGoal || 0);
    setWeeklyPercent(data.weeklyPercent || 0);
    setWeeklyStreak(data.streak || 0);
  };

  useEffect(() => {
    loadAchievements();
    loadWeeklyInfo();
  }, []);

  const formatDate = (iso) => {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const weekLabels = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  return (
    <div className="min-h-screen bg-white font-[Montserrat]">

      <main className="max-w-[360px] mx-auto px-6 pt-6">
        <h1 className="text-[36px] font-bold text-black mb-6">Achievements</h1>
        <h2 className="text-[24px] font-bold text-black mb-4">This week</h2>

        {/* WEEKLY CARD */}
        <section className="bg-[#BDDBF7] w-[314px] h-[252px] rounded-[35px] p-5 flex flex-col mx-auto mb-10">
          <div className="flex items-center">
            <div className="w-[129px] h-[129px] bg-white rounded-full flex items-center justify-center shadow relative overflow-hidden">
              <WeeklyGoalGlass percent={weeklyPercent} />
            </div>

            <div className="ml-4">
              <p className="text-[20px] font-bold text-black mb-1">
                Weekly goal
              </p>
              <p className="text-[13px] font-semibold text-[#0055A0]">
                {weeklySum} / {weeklyGoal} ml
              </p>
            </div>
          </div>

          {/* ЛІНІЯ + КРАПКИ ДНІВ ТИЖНЯ */}
          <div className="mt-5 relative w-full flex flex-col items-center">
            <div className="absolute top-[5px] left-[22px] right-[22px] h-[2px] bg-[#438BC4] rounded-full" />

            <div className="flex justify-between w-full px-[22px] relative z-10">
              {weekLabels.map((d, i) => (
                <div key={d} className="flex flex-col items-center">
                  <div
                    className={`w-[11px] h-[11px] rounded-full ${
                      weekDays[i]
                        ? "bg-[#438BC4]"
                        : "bg-white border border-[#438BC4]/40"
                    }`}
                  />
                  <p
                    className={`text-[12px] mt-[2px] font-medium ${
                      weekDays[i] ? "text-[#0055A0]" : "text-[#B9D2EE]"
                    }`}
                  >
                    {d}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* STREAK (ДНІ ПІДРЯД) */}
          <div className="mt-5 flex justify-center items-end gap-[4px]">
            <p className="text-[20px] font-bold text-black leading-none">
              {weeklyStreak} days
            </p>
            <img src={streakIcon} alt="streak" className="w-[21px] h-[19px]" />
          </div>
        </section>

        {/* ACHIEVEMENTS GRID */}
        <h2 className="text-[24px] font-bold text-black mb-4">My rewards</h2>

        <div className="grid grid-cols-3 gap-4 justify-items-center">
          {achievements.map((a) => (
            <div
              key={a.id}
              onClick={() => setSelected(a)}
              className="w-[82px] h-[82px] bg-[#BDDBF7] rounded-[20px] flex flex-col items-center justify-center text-center shadow-sm p-2 cursor-pointer hover:scale-105 transition-transform"
            >
              {a.icon && (
                <img src={a.icon} className="w-[34px] h-[34px] mb-1" />
              )}
              <p className="text-[11px] font-semibold text-[#0055A0] leading-tight">
                {a.name}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* MODAL ACHIEVEMENT INFO */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-[25px] w-[280px] p-6 text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            {selected.icon && (
              <img
                src={selected.icon}
                alt={selected.name}
                className="w-[50px] h-[50px] mx-auto mb-3"
              />
            )}

            <h3 className="text-[20px] font-bold text-[#0055A0] mb-2">
              {selected.name}
            </h3>

            <p className="text-[14px] text-gray-700 mb-3">
              {selected.condition}
            </p>

            <p className="text-[12px] text-gray-500">
              Achieved: {formatDate(selected.achievedAt)}
            </p>

            <button
              onClick={() => setSelected(null)}
              className="mt-4 px-4 py-2 bg-[#BDDBF7] text-[#0055A0] font-semibold rounded-[15px]"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <AchievementToast
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
        achievement={toastData}
      />
    </div>
  );
}
