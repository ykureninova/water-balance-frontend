import { useState } from "react";

export default function GoalCalculator() {
  const [data, setData] = useState({
    gender: "",
    height: "",
    weight: "",
    activity: "",
  });

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Goal data:", data);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-6">
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
