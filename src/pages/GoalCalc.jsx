import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUser, setNorm, getUser } from "../utils/storage.js";
import { api } from "../api/client.js";

export default function GoalCalculator() {
  const [data, setData] = useState({
    gender: "",
    height: "",
    weight: "",
    activity: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [calculatedGoal, setCalculatedGoal] = useState(0);

  const navigate = useNavigate();

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const calculateNorm = () => {
    if (!data.weight) return 2000;
    let base = Number(data.weight) * 35;
    const activityBonus = data.activity ? (Number(data.activity) - 1) * 300 : 0;
    if (data.gender === "male") base += 300;
    return Math.round(base + activityBonus);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.gender || !data.weight) {
      alert("Please select gender and enter your weight");
      return;
    }

    const norm = calculateNorm();
    setNorm(norm);
    setCalculatedGoal(norm);

    try {
      await api("/user/me/settings", {
        method: "post",
        data: {
          gender: data.gender,
          height: data.height ? Number(data.height) : undefined,
          weight: Number(data.weight),
          activity: data.activity ? Number(data.activity) : undefined,
          waterNorm: norm,
        },
      });
      const updatedUser = await api("/user/me");
      const localUser = getUser();
      setUser({ ...(localUser || {}), ...updatedUser, waterNorm: norm });
    } catch (err) {
      console.error(err);
    }

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate("/tracker");
    }, 2800);
  };

  const activityLevels = [
    { value: "1", title: "1 — Sitting lifestyle", desc: "Little or no exercise, desk job" },
    { value: "2", title: "2 — Lightly active", desc: "Light exercise 1–3 days/week" },
    { value: "3", title: "3 — Moderately active", desc: "Moderate exercise 3–5 days/week" },
    { value: "4", title: "4 — Very active", desc: "Hard exercise 6–7 days/week" },
    { value: "5", title: "5 — Super active", desc: "Physical job or 2× training a day" },
  ];

  return (
    <div className="min-h-screen  flex flex-col">
      {/* Успішне повідомлення завжди по центру */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none px-6">
          <div className="animate-bounce bg-white border-4 border-[#0055A0] rounded-3xl px-10 py-8 shadow-2xl text-center">
            <p className="text-5xl font-bold text-[#0055A0] mb-2">{calculatedGoal} ml</p>
            <p className="text-2xl text-gray-700">Your daily goal!</p>
            <p className="text-sm text-gray-500 mt-4">Redirecting...</p>
          </div>
        </div>
      )}

      {/* Основний контент */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md lg:max-w-2xl">
          {/* Заголовок */}
          <h1 className="text-center text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0055A0] mb-12">
            Let’s calculate your goal
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Стать */}
            <div>
              <label className="block text-xl font-medium text-gray-700 mb-4 text-center sm:text-left">
                Gender
              </label>
              <div className="grid grid-cols-2 gap-4">
                {["male", "female"].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setData({ ...data, gender: g })}
                    className={`py-5 rounded-2xl font-semibold text-lg capitalize transition-all ${
                      data.gender === g
                        ? "bg-[#0055A0] text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {g === "male" ? "Male" : "Female"}
                  </button>
                ))}
              </div>
            </div>

            {/* Зріст (необов’язково) */}
            <div>
              <label className="block text-xl font-medium text-gray-700 mb-3">
                Height (cm) — optional
              </label>
              <input
                name="height"
                type="number"
                placeholder="e.g. 175"
                value={data.height}
                onChange={handleChange}
                className="w-full px-6 py-4 text-lg bg-gray-50 border border-[#8CC1E9] rounded-2xl focus:outline-none focus:border-[#0055A0] transition"
              />
            </div>

            {/* Вага (обов’язково) */}
            <div>
              <label className="block text-xl font-medium text-gray-700 mb-3">
                Weight (kg)
              </label>
              <input
                name="weight"
                type="number"
                placeholder="e.g. 70"
                value={data.weight}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 text-lg bg-gray-50 border border-[#8CC1E9] rounded-2xl focus:outline-none focus:border-[#0055A0] transition"
              />
            </div>

            {/* Рівень активності */}
            <div>
              <label className="block text-xl font-medium text-gray-700 mb-5">
                Activity level
              </label>
              <div className="space-y-4">
                {activityLevels.map((level) => (
                  <label
                    key={level.value}
                    className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                      data.activity === level.value
                        ? "border-[#0055A0] bg-[#BDDBF7]/30 shadow-md"
                        : "border-gray-200 bg-white hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="activity"
                      value={level.value}
                      checked={data.activity === level.value}
                      onChange={handleChange}
                      className="mt-1 w-5 h-5 text-[#0055A0]"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{level.title}</p>
                      <p className="text-sm sm:text-base text-gray-600 mt-1">{level.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Кнопка */}
            <button
              type="submit"
              className="w-full bg-[#0055A0] hover:bg-[#004480] text-white font-bold text-xl py-6 rounded-3xl shadow-xl transition transform hover:scale-105"
            >
              Calculate my goal
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}