import { useState, useEffect } from "react";
import ProgressCircle from "../components/ProgressCircle.jsx";
import { getUser, setUser } from "../utils/storage.js";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client.js";
import { useToast } from "../components/ToastContext.jsx";

const drinkIcons = {
  Water: "https://img.icons8.com/color/48/water.png",
  Tea: "https://img.icons8.com/color/48/tea-cup.png",
  Coffee: "https://img.icons8.com/color/48/coffee.png",
  Juice: "https://img.icons8.com/color/48/orange-juice.png",
  Milk: "https://img.icons8.com/color/48/milk-bottle.png",
  "Sparkling water": "https://img.icons8.com/color/48/soda.png",
};

export default function Tracker() {
  const { showToast } = useToast();

  const [goal, setGoal] = useState(2000);
  const [progress, setProgress] = useState(0);
  const [drinks, setDrinks] = useState([]);
  const [drinkTypes, setDrinkTypes] = useState([]);
  const [form, setForm] = useState({ drinkTypeId: "", amount: 250 });
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);

  const [circleSize, setCircleSize] = useState(300);

  const navigate = useNavigate();

  useEffect(() => {
    const updateSize = () =>
      setCircleSize(window.innerWidth >= 768 ? 480 : 300);

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);


  // LOAD USER DATA
  const loadData = async () => {
    try {
      const backendUser = await api("/user/me");
      if (!backendUser) {
        navigate("/login", { replace: true });
        return;
      }

      setUser(backendUser);
      setUserState(backendUser);
      setGoal(backendUser.waterNorm || 2000);

      const types = await api("/drink/all");
      setDrinkTypes(types || []);
      if (types?.length) {
        setForm((f) => ({ ...f, drinkTypeId: types[0]._id }));
      }

      const water = await api("/water/user/me");
      setDrinks(water || []);

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      const totalToday = (water || [])
        .filter((w) => {
          const d = new Date(w.createdAt);
          return d >= today && d < tomorrow;
        })
        .reduce((s, w) => s + w.amount, 0);

      setProgress(totalToday);
    } catch (err) {
      const local = getUser();
      if (!local) {
        navigate("/login", { replace: true });
        return;
      }
      setUserState(local);
      setGoal(local.waterNorm || 2000);
      setDrinks([]);
      setProgress(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [navigate]);

  // reload on focus
  useEffect(() => {
    const handleFocus = () => loadData();
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  // ADD DRINK
  const handleAdd = async () => {
    if (!form.amount || form.amount <= 0 || !form.drinkTypeId) return;

    try {
      const res = await api("/water/add", {
        method: "post",
        data: {
          amount: Number(form.amount),
          drinkType: form.drinkTypeId,
        },
      });

      if (res?.newAchievements?.length) {
        showToast("New achievement unlocked!");
        window.dispatchEvent(
          new CustomEvent("achievement-earned", {
            detail: res.newAchievements,
          })
        );
      }

      await loadData();
      setForm((f) => ({ ...f, amount: 250 }));
    } catch (err) {
      console.error("ADD DRINK ERROR:", err);
      alert("Failed to add drink");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 mt-10">

      <h1 className="text-center text-3xl sm:text-4xl font-bold text-[#0055A0] mb-8">
        Welcome back, {user?.username || "friend"}!
      </h1>

      {/* grid WITHOUT px-6 offset */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-32 xl:gap-48 items-start max-w-7xl mx-auto">

        {/* stable centered circle */}
        <div className="flex justify-center -mt-4 md:mt-0">
          <ProgressCircle progress={progress} goal={goal} size={circleSize} />
        </div>

        <div className="space-y-8 px-6 md:px-0">
          {/* form */}
          <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-[#BDDBF7]/50 max-w-md mx-auto md:mx-0">

            <select
              value={form.drinkTypeId}
              onChange={(e) =>
                setForm({ ...form, drinkTypeId: e.target.value })
              }
              className="w-full px-4 py-3.5 bg-gray-50 border border-[#8CC1E9] rounded-2xl text-base sm:text-lg mb-4"
            >
              {drinkTypes.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              value={form.amount}
              onChange={(e) =>
                setForm({
                  ...form,
                  amount: parseInt(e.target.value) || "",
                })
              }
              placeholder="Amount (ml)"
              className="w-full px-4 py-3.5 bg-gray-50 border border-[#8CC1E9] rounded-2xl text-base sm:text-lg mb-5"
            />

            <button
              onClick={handleAdd}
              className="w-full bg-[#0055A0] hover:bg-[#004480] text-white font-bold py-4 rounded-2xl transition shadow-lg text-base sm:text-lg"
            >
              + Add drink
            </button>
          </div>

          {/* drinks list */}
          <div className="bg-gradient-to-br from-[#BDDBF7]/30 to-[#8CC1E9]/20 rounded-3xl p-6 sm:p-8 shadow-xl border border-[#8CC1E9]/40 max-w-md mx-auto md:mx-0">

            <h2 className="text-xl sm:text-2xl font-bold text-[#0055A0] mb-2">
              Today’s drinks
            </h2>

            <p className="text-base sm:text-lg font-medium text-[#0055A0] mb-6">
              {progress} / {goal} ml
            </p>

            {/* drinks */}
            <div className="md:hidden space-y-3 max-h-96 overflow-y-auto pr-2">
              {drinks.map((d) => {
                const time = new Date(d.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                const name = d.drinkType?.name || "Water";

                return (
                  <div
                    key={d._id}
                    className="bg-white/90 rounded-2xl p-4 shadow flex items-center gap-4 border border-[#8CC1E9]/30"
                  >
                    <img
                      src={drinkIcons[name] || drinkIcons.Water}
                      alt={name}
                      className="w-11 h-11"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-base">{name}</p>
                      <p className="text-sm text-gray-600">
                        {d.amount} ml · {time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="hidden md:block overflow-x-auto pb-3">
              <div className="flex gap-4 min-w-max">
                {drinks.map((d) => {
                  const time = new Date(d.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  const name = d.drinkType?.name || "Water";

                  return (
                    <div
                      key={d._id}
                      className="bg-white/90 rounded-2xl p-5 shadow flex flex-col items-center min-w-32 border border-[#8CC1E9]/30"
                    >
                      <img
                        src={drinkIcons[name] || drinkIcons.Water}
                        alt={name}
                        className="w-12 h-12 mb-2"
                      />
                      <p className="font-medium text-sm">{d.amount} ml</p>
                      <p className="text-xs text-gray-500">{time}</p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={() => navigate("/info")}
          className="text-[#0055A0] font-medium underline text-lg"
        >
          Why water matters
        </button>
      </div>
    </div>
  );
}
