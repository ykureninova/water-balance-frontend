import { useNavigate } from "react-router-dom";
import { getUser, logout } from "../utils/storage.js";
import { useEffect, useState } from "react";
import SupportModal from "../components/SupportModal.jsx";
import Navbar from "../components/Navbar.jsx";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [showSupport, setShowSupport] = useState(false);

  useEffect(() => {
    const u = getUser();
    if (!u) navigate("/login");
    else setUser(u);
  }, [navigate]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logout();
      navigate("/", { replace: true });
    }
  };

  if (!user) return <div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col items-center px-6 pt-10">
      <Navbar />
      <div className="w-full max-w-md">
        {/* Аватар */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 bg-gray-300 rounded-full border-4 border-white shadow-lg"></div>
          <h2 className="text-2xl font-bold mt-4">Hi, {user.username || user.email.split("@")[0]}!</h2>
        </div>

        {/* Меню */}
        <div className="bg-white rounded-3xl shadow-lg p-6 space-y-4">
          <button onClick={() => navigate("/account-settings")} className="w-full text-left py-4 px-6 bg-blue-50 rounded-2xl flex items-center gap-4 hover:bg-blue-100 transition">
            Account
          </button>

          <button onClick={() => navigate("/settings")} className="w-full text-left py-4 px-6 bg-blue-50 rounded-2xl flex items-center gap-4 hover:bg-blue-100 transition">
            Settings
          </button>

          <button onClick={() => alert("Notifications are coming soon!")} className="w-full text-left py-4 px-6 bg-blue-50 rounded-2xl flex items-center gap-4 hover:bg-blue-100 transition">
            Notifications
          </button>

          <button
            onClick={() => setShowSupport(true)}
            className="w-full text-left py-4 px-6 bg-blue-50 rounded-2xl flex items-center gap-4 hover:bg-blue-100 transition"
          >
            Support
          </button>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-10 w-full bg-[#0055A0] hover:bg-[#004480] text-white font-medium py-4 rounded-full transition"
        >
          Log out
        </button>
      </div>

      {showSupport && <SupportModal onClose={() => setShowSupport(false)} />}
    </div>
  );
} 
