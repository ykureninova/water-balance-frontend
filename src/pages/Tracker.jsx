import { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import ProgressCircle from "../components/ProgressCircle.jsx";
import { getNorm, getTodayProgress, addDrink, getDrinks, getUser } from "../utils/storage.js";
import { useNavigate } from "react-router-dom";

export default function Tracker() {
  const [goal] = useState(getNorm());
  const [progress, setProgress] = useState(0);
  const [drinks, setDrinks] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [form, setForm] = useState({ name: "Water", amount: 250 });
  const [user, setUser] = useState(null);        // ← новий стан
  const [loading, setLoading] = useState(true);  // ← щоб не було помилки null.username

  const navigate = useNavigate();

  // Завантажуємо юзера і дані тільки один раз при монтуванні
  useEffect(() => {
    const currentUser = getUser();

    if (!currentUser) {
      navigate("/login", { replace: true });
      return;
    }

    setUser(currentUser);

    // Завантажуємо напої за сьогодні
    const today = new Date().toISOString().slice(0, 10);
    const todayDrinks = getDrinks().filter(d => d.date && d.date.startsWith(today));
    setDrinks(todayDrinks);
    setProgress(getTodayProgress());
    setLoading(false);
  }, [navigate]);

  const handleAdd = () => {
    if (!form.amount || form.amount <= 0) return;

    const newDrink = {
      id: Date.now(),
      name: form.name,
      amount: parseInt(form.amount),
      date: new Date().toISOString(),
    };

    addDrink(newDrink);
    setProgress(getTodayProgress());

    // Оновлюємо список напоїв
    const today = new Date().toISOString().slice(0, 10);
    const updatedDrinks = getDrinks().filter(d => d.date && d.date.startsWith(today));
    setDrinks(updatedDrinks);

    setForm({ ...form, amount: 250 }); // скидаємо поле
  };

  // Показуємо лоадер, поки юзер не завантажився
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-white flex flex-col items-center px-6 mt-5">
        <main className="flex flex-col items-center mt-10 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-8">
            Welcome, {user?.username || "friend"}!
          </h1>

          <ProgressCircle progress={progress} goal={goal} />

          {/* Форма додавання */}
          <div className="mt-10 w-full flex flex-col gap-3">
            <select
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input border border-[#8CC1E9] w-full p-3 rounded-3xl"
            >
              <option>Water</option>
              <option>Tea</option>
              <option>Coffee</option>
              <option>Juice</option>
              <option>Milk</option>
            </select>

            <input
              type="number"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: parseInt(e.target.value) || "" })}
              className="input border border-[#8CC1E9] w-full p-3 rounded-3xl"
              placeholder="Amount (ml)"
            />

            <button
              onClick={handleAdd}
              className="bg-[#0055A0] hover:bg-[#004480] text-white rounded-full py-3 mt-2 transition font-medium"
            >
              + Add drink
            </button>
          </div>

          {/* Список напоїв за сьогодні */}
          <div className="mt-10 w-full">
            <h2 className="text-lg font-medium text-gray-800 mb-3">
              Today's drinks ({progress} ml of {goal} ml)
            </h2>

            {drinks.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No drinks yet. Add your first one!</p>
            ) : (
              <ul className="flex flex-wrap gap-3">
                {(showAll ? drinks : drinks.slice(-6)).map((d) => (
                  <li
                    key={d.id}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {d.name} — {d.amount} ml
                  </li>
                ))}
              </ul>
            )}

            {drinks.length > 6 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-blue-600 mt-4 underline text-sm"
              >
                {showAll ? "Hide" : "Show all"}
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}