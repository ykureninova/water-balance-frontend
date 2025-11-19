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
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col items-center px-6 pt-10">
      <Navbar />
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Edit your account</h1>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          {/* Аватар */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-32 h-32 bg-gray-300 rounded-full shadow-lg"></div>
              <button className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-blue-700">
                Edit
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input type="text" value={form.username} onChange={e => setForm({...form, username: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password (optional)</label>
              <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
                placeholder="Leave blank to keep current" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
              <input type="password" value={form.confirm} onChange={e => setForm({...form, confirm: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500" />
            </div>

            <button type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-full transition mt-8">
              Save Changes
            </button>
          </form>
        </div>

        <button onClick={() => navigate("/profile")} className="mt-6 text-blue-600 underline text-center w-full">
          Back to Profile
        </button>
      </div>
    </div>
  );
}