import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import ProgressCircle from "../components/ProgressCircle.jsx";

export default function Tracker() {
  const [goal] = useState(2000);
  const [progress, setProgress] = useState(1250);
  const [drinks, setDrinks] = useState([
    { id: 1, name: "Water", amount: 250 },
    { id: 2, name: "Coffee", amount: 200 },
  ]);
  const [showAll, setShowAll] = useState(false);
  const [form, setForm] = useState({ name: "Water", amount: 250 });

  const handleAdd = () => {
    const newProgress = Math.min(goal, progress + form.amount);
    const newDrink = { id: Date.now(), ...form };
    setProgress(newProgress);
    setDrinks((prev) => [...prev, newDrink]);
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-white flex flex-col items-center px-6 mt-5">
      <main className="flex flex-col items-center mt-10 w-full max-w-md">
        <ProgressCircle progress={progress} goal={goal} />

        {/* форма додавання */}
        <div className="mt-10 w-full flex flex-col gap-3">
          <select
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input border border-[#8CC1E9] w-full mb-3 p-2 rounded-3xl"
          >
            <option>Water</option>
            <option>Tea</option>
            <option>Coffee</option>
            <option>Juice</option>
          </select>

          <input
            type="number"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: parseInt(e.target.value) })
            }
            className="input border border-[#8CC1E9] w-full mb-3 p-2 rounded-3xl"
            placeholder="Amount (ml)"
          />

          <button
            onClick={handleAdd}
            className="bg-[#0055A0] hover:bg-[#004480] text-white rounded-full py-2 mt-2 transition"
          >
            + Add drink
          </button>
        </div>

        {/* сьогоднішні записи */}
        <div className="mt-10 w-full">
          <h2 className="text-lg font-medium text-gray-800 mb-3">
            Today's drinks
          </h2>
          <ul className="flex flex-wrap gap-3">
            {(showAll ? drinks : drinks.slice(0, 2)).map((d) => (
              <li
                key={d.id}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm"
              >
                {d.name} — {d.amount} ml
              </li>
            ))}
          </ul>

          {drinks.length > 2 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-blue-600 mt-3 underline"
            >
              {showAll ? "Hide records" : "Today's records"}
            </button>
          )}
        </div>
      </main>
    </div>
    </div>
    
  );
}
