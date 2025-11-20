// src/pages/Tracker.jsx
import { useState, useEffect } from "react";
import ProgressCircle from "../components/ProgressCircle.jsx";
import { getNorm, getTodayProgress, addDrink, getDrinks, getUser } from "../utils/storage.js";
import { useNavigate } from "react-router-dom";

const drinkIcons = {
  Water: "https://img.icons8.com/color/48/water.png",
  Tea: "https://img.icons8.com/color/48/tea-cup.png",
  Coffee: "https://img.icons8.com/color/48/coffee.png",
  Juice: "https://img.icons8.com/color/48/orange-juice.png",
  Milk: "https://img.icons8.com/color/48/milk-bottle.png",
  "Sparkling water": "https://img.icons8.com/color/48/soda.png",
};

export default function Tracker() {
  const [goal] = useState(getNorm() || 2000);
  const [progress, setProgress] = useState(0);
  const [drinks, setDrinks] = useState([]);
  const [form, setForm] = useState({ name: "Water", amount: 250 });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser) {
      navigate("/login", { replace: true });
      return;
    }
    setUser(currentUser);

    const today = new Date().toISOString().slice(0, 10);
    const todayDrinks = getDrinks()
      .filter(d => d.date && d.date.startsWith(today))
      .sort((a, b) => new Date(b.date) - new Date(a.date));

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

    const today = new Date().toISOString().slice(0, 10);
    const updated = getDrinks()
      .filter(d => d.date && d.date.startsWith(today))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    setDrinks(updated);
    setForm({ ...form, amount: 250 });
  };

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center"><p>Loading...</p></div>;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 mt-10">
      {/* Привітання */}
      <h1 className="text-center text-3xl sm:text-4xl font-bold text-[#0055A0] mb-8">
        Welcome back, {user?.username || "friend"}!
      </h1>

      {/* Мобілка: вертикально // Десктоп: 2 колонки */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-32 xl:gap-48 items-start max-w-7xl mx-auto px-6">
        {/* КОЛЕСО завжди по центру */}
        <div className="flex justify-center -mt-4 md:mt-0">
          <ProgressCircle 
            progress={progress} 
            goal={goal} 
            size={window.innerWidth >= 768 ? 480 : 300} 
          />
        </div>

        {/* ПРАВА ЧАСТИНА форма + список */}
        <div className="space-y-8">
          {/* Форма — вузька і красива */}
          <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-[#BDDBF7]/50 max-w-md mx-auto md:mx-0">
            <select
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3.5 bg-gray-50 border border-[#8CC1E9] rounded-2xl text-base sm:text-lg mb-4 focus:outline-none focus:border-[#0055A0]"
            >
              {Object.keys(drinkIcons).map(d => <option key={d}>{d}</option>)}
            </select>

            <input
              type="number"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: parseInt(e.target.value) || "" })}
              placeholder="Amount (ml)"
              className="w-full px-4 py-3.5 bg-gray-50 border border-[#8CC1E9] rounded-2xl text-base sm:text-lg mb-5 focus:outline-none focus:border-[#0055A0]"
            />

            <button
              onClick={handleAdd}
              className="w-full bg-[#0055A0] hover:bg-[#004480] text-white font-bold py-4 rounded-2xl transition shadow-lg text-base sm:text-lg"
            >
              + Add drink
            </button>
          </div>

          {/* Список напоїв */}
          <div className="bg-gradient-to-br from-[#BDDBF7]/30 to-[#8CC1E9]/20 rounded-3xl p-6 sm:p-8 shadow-xl border border-[#8CC1E9]/40 max-w-md mx-auto md:mx-0">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0055A0] mb-2">Today’s drinks</h2>
            <p className="text-base sm:text-lg font-medium text-[#0055A0] mb-6">{progress} / {goal} ml</p>

            {drinks.length === 0 ? (
              <p className="text-center text-gray-500 py-10 text-base">No drinks yet</p>
            ) : (
              <>
                {/* МОБІЛКА — вертикальний список */}
                <div className="md:hidden space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar-vertical">
                  {drinks.map((d) => {
                    const time = new Date(d.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    return (
                      <div key={d.id} className="bg-white/90 rounded-2xl p-4 shadow flex items-center gap-4 border border-[#8CC1E9]/30">
                        <img src={drinkIcons[d.name] || drinkIcons.Water} alt={d.name} className="w-11 h-11" />
                        <div className="flex-1">
                          <p className="font-medium text-base">{d.name}</p>
                          <p className="text-sm text-gray-600">{d.amount} ml · {time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* ДЕСКТОП — горизонтальна карусель */}
                <div className="hidden md:block overflow-x-auto pb-3">
                  <div className="flex gap-4 min-w-max">
                    {drinks.map((d) => {
                      const time = new Date(d.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                      return (
                        <div key={d.id} className="bg-white/90 rounded-2xl p-5 shadow flex flex-col items-center min-w-32 border border-[#8CC1E9]/30">
                          <img src={drinkIcons[d.name] || drinkIcons.Water} alt={d.name} className="w-12 h-12 mb-2" />
                          <p className="font-medium text-sm">{d.amount} ml</p>
                          <p className="text-xs text-gray-500">{time}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Кнопка до Info */}
      <div className="mt-12 text-center">
        <button onClick={() => navigate("/info")} className="text-[#0055A0] font-medium underline text-lg">
          Why water matters
        </button>
      </div>
    </div>
  );
}