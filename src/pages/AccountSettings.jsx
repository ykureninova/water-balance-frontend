import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, updateUser } from "../utils/storage.js";
import Navbar from "../components/Navbar.jsx";

export default function Account() {
  const [form, setForm] = useState({ username: "", email: "", password: "", confirm: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const user = getUser();
    if (!user) return navigate("/login");
    setForm({ username: user.username || "", email: user.email || "", password: "", confirm: "" });
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password && form.password !== form.confirm) {
      alert("Passwords do not match!");
      return;
    }
    updateUser({ username: form.username, email: form.email });
    alert("Account updated successfully!");
    navigate("/profile");
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="w-full max-w-md">

        <div className="bg-[#BDDBF7] rounded-3xl shadow-xl p-8 mt-15">
          {/* Аватар */}
          <div className="flex justify-center -mt-20 md:-mt-24">
            <div className="relative">
              {/* МАГІЯ: м'який градієнтний ореол під аватаркою */}
              <div className="absolute -inset-6 bg-gradient-to-br from-blue-300/30 to-white rounded-full blur-3xl opacity-100"></div>
              <div className="absolute -inset-3 bg-gradient-to-br from-blue-200/50 to-cyan-200/40 rounded-full blur-2xl opacity-100 animate-pulse-slow"></div>
              {/* Сам аватар */}
              <div className="relative w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full shadow-2xl ring-8 ring-white overflow-hidden">
                {/* Якщо захочеш фотку юзера — підставиш сюди */}
                {/* <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" /> */}
              </div>

              {/* Кнопка Edit */}
              <button className="absolute bottom-1 right-1 bg-[#0055A0] hover:bg-[#004480] text-white rounded-full w-11 h-11 flex items-center justify-center shadow-xl transition-all hover:scale-110">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 mt-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input type="text" value={form.username} onChange={e => setForm({...form, username: e.target.value})}
                className="w-full text-left py-4 px-6 bg-blue-50 rounded-2xl flex items-center gap-4 hover:bg-blue-100 transition border border-[#8CC1E9] focus:outline-none focus:border-[#438BC4]" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                className="w-full text-left py-4 px-6 bg-blue-50 rounded-2xl flex items-center gap-4 hover:bg-blue-100 transition border border-[#8CC1E9] focus:outline-none focus:border-[#438BC4]" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password (optional)</label>
              <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})}
                className="w-full text-left py-4 px-6 bg-blue-50 rounded-2xl flex items-center gap-4 hover:bg-blue-100 transition border border-[#8CC1E9] focus:outline-none focus:border-[#438BC4]"
                placeholder="Leave blank to keep current" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
              <input type="password" value={form.confirm} onChange={e => setForm({...form, confirm: e.target.value})}
                className="w-full text-left py-4 px-6 bg-blue-50 rounded-2xl flex items-center gap-4 hover:bg-blue-100 transition border border-[#8CC1E9] focus:outline-none focus:border-[#438BC4]" />
            </div>

            <button type="submit"
              className="w-full bg-[#0055A0] hover:bg-[#004480] text-white font-bold py-4 rounded-full transition mt-8">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}