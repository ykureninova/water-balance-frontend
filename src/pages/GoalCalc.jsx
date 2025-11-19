import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { setUser, setNorm, getUser} from '../utils/storage.js';
import Navbar from "../components/Navbar.jsx";

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

    let base = Number(data.weight) * 35;   // середнє: 35 мл на 1 кг ваги

    // Додаємо бонус за активність
    const activityBonus = data.activity
      ? (Number(data.activity) - 1) * 300   // від 0 до +1200 мл
      : 0;

    // Якщо чоловік — трохи більше
    if (data.gender === "male") base += 300;

    return Math.round(base + activityBonus);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.gender || !data.weight) {
      alert("Please select gender and enter your weight");
      return;
    }

    const norm = calculateNorm();
    setNorm(norm);
    setCalculatedGoal(norm);

    const user = getUser();
    if (user) {
      setUser({ ...user, waterNorm: norm });
    }

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate("/tracker");
    }, 2500); // 2.5 секунди — і переходимо
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-6">
      
      {/* Красивий тост */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="animate-bounce-in bg-gradient-to-r from-blue-500 to-[#0055A0] text-white px-8 py-6 rounded-2xl shadow-2xl text-center">
            <p className="text-3xl font-bold mb-2">Your Goal — {calculatedGoal} ml!</p>
            <p className="text-lg opacity-90">Keep it up!</p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-sm"
      >
        <h1 className="text-4xl font-bold mb-20">
          Let’s calculate your goal
        </h1>
        
        <div>
          <select
            name="gender"
            onChange={handleChange}
            className="input border-[#8CC1E9] w-full mb-3 p-2 border rounded-3xl"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <input
            name="height"
            type="number"
            placeholder="Height (cm)"
            onChange={handleChange}
            className="input border-[#8CC1E9] w-full mb-3 p-2 border rounded-3xl"
          />
          <input
            name="weight"
            type="number"
            placeholder="Weight (kg)"
            onChange={handleChange}
            className="input border-[#8CC1E9] w-full mb-3 p-2 border rounded-3xl"
          />
          <input
            name="activity"
            type="number"
            placeholder="Activity level (1-5)"
            onChange={handleChange}
            className="input border-[#8CC1E9] w-full mb-3 p-2 border rounded-3xl"
          />

          <button
            type="submit"
            className="input w-full bg-[#0055A0] text-white font-medium py-2 rounded-3xl hover:bg-[#004480] transition"
          >
            Calculate
          </button>
        </div>
        
      </form>
    </div>
  );
}
