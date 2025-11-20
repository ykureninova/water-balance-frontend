import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, updateUser, setNorm } from "../utils/storage.js";
import Navbar from "../components/Navbar.jsx";

export default function Settings() {
  const [data, setData] = useState({ gender: "", weight: "", height: "", activity: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const user = getUser();
    if (!user) return navigate("/login");
    setData({
      gender: user.gender || "",
      weight: user.weight || "",
      height: user.height || "",
      activity: user.activity || "",
    });
  }, [navigate]);

  const calculateNorm = () => {
    if (!data.weight) return 2000;
    let norm = Number(data.weight) * 35;
    if (data.gender === "male") norm += 300;
    const actBonus = data.activity ? (Number(data.activity) - 1) * 300 : 0;
    return Math.round(norm + actBonus);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.weight || !data.gender) {
      alert("Please fill in gender and weight at minimum");
      return;
    }

    const newNorm = calculateNorm();
    setNorm(newNorm);
    updateUser({ ...data, waterNorm: newNorm });

    alert(`Success! Your new daily goal: ${newNorm} ml`);
    navigate("/tracker");
  };

  return (
    <div className="w-full max-w-md mx-auto mt-15">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Personal settings</h1>

        <div className="bg-[#BDDBF7] rounded-3xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <select name="gender" value={data.gender} onChange={e => setData({...data, gender: e.target.value})}
              className="w-full text-left py-4 px-6 bg-blue-50 rounded-2xl flex items-center gap-4 hover:bg-blue-100 transition" required>
              <option value="">Select gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>

            <input type="number" placeholder="Weight (kg)" value={data.weight} onChange={e => setData({...data, weight: e.target.value})}
              className="w-full text-left py-4 px-6 bg-blue-50 rounded-2xl flex items-center gap-4 hover:bg-blue-100 transition" required />

            <input type="number" placeholder="Height (cm)" value={data.height} onChange={e => setData({...data, height: e.target.value})}
              className="w-full text-left py-4 px-6 bg-blue-50 rounded-2xl flex items-center gap-4 hover:bg-blue-100 transition" />

            <input type="number" min="1" max="5" placeholder="Activity level (1–5)" value={data.activity}
              onChange={e => setData({...data, activity: e.target.value})}
              className="w-full text-left py-4 px-6 bg-blue-50 rounded-2xl flex items-center gap-4 hover:bg-blue-100 transition" />

            <button type="submit"
              className="w-full bg-[#0055A0] hover:bg-[#004480] text-white font-bold py-5 rounded-full transition text-lg">
              Save & Update Goal
            </button>
          </form>
        </div>

        <button onClick={() => navigate("/profile")} className="mt-6 text-blue-600 underline text-center w-full">
          ← Back to Profile
        </button>
      </div>
    </div>
  );
}