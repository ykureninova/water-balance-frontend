import { useNavigate } from "react-router-dom";
import { getUser, logout } from "../utils/storage.js";
import { useEffect, useState, onClose } from "react";
import SupportModal from "../components/SupportModal.jsx";
import NotificationsModal from "../components/NotificationsModal.jsx";


export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [showSupport, setShowSupport] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const u = getUser();
    if (!u) {
      navigate("/login", { replace: true });
    } else {
      setUser(u);
    }
  }, [navigate]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logout();
      navigate("/", { replace: true });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  // Безпечне отримання імені (на випадок якщо є тільки username або тільки email)
  const displayName = user.username || (user.email ? user.email.split("@")[0] : "User");

  return (
    <div className="min-h-screen pt-12 pb-20 md:pb-12">
      <div className="max-w-2xl mx-auto px-6">

        {/* Заголовок + аватар */}
        <div className="text-center mb-10">
          <div className="w-32 h-32 mx-auto bg-gray-200 border-4 border-white rounded-full shadow-xl mb-4 
            bg-cover bg-center"
            style={{ backgroundImage: user.avatar ? `url(${user.avatar})` : "none" }}>
            {!user.avatar && (
              <div className="w-full h-full flex items-center justify-center text-5xl text-gray-400 font-bold">
                {displayName[0].toUpperCase()}
              </div>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[#0055A0]">
            Hi, {displayName}!
          </h1>
          <p className="text-gray-600 mt-2">
            {user.email || "No email"}
          </p>
        </div>

        {/* Меню */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-[#BDDBF7]/50 overflow-hidden">
          <div className="p-4 space-y-3">
            <button
              onClick={() => navigate("/account-settings")}
              className="w-full text-left py-5 px-6 bg-[#BDDBF7]/30 rounded-2xl flex items-center justify-between hover:bg-[#BDDBF7]/50 transition"
            >
              <span className="font-medium text-gray-800">Account settings</span>
              <span className="text-gray-500">→</span>
            </button>

            <button
              onClick={() => navigate("/settings")}
              className="w-full text-left py-5 px-6 bg-[#BDDBF7]/30 rounded-2xl flex items-center justify-between hover:bg-[#BDDBF7]/50 transition"
            >
              <span className="font-medium text-gray-800">App settings</span>
              <span className="text-gray-500">→</span>
            </button>

            <button
              onClick={() => setShowNotifications(true)}
              className="w-full text-left py-5 px-6 bg-[#BDDBF7]/30 rounded-2xl flex items-center justify-between hover:bg-[#BDDBF7]/50 transition"
            >
              <span className="font-medium text-gray-800">Notifications</span>
              <span className="text-gray-500">→</span>
            </button>

            <button
              onClick={() => setShowSupport(true)}
              className="w-full text-left py-5 px-6 bg-[#BDDBF7]/30 rounded-2xl flex items-center justify-between hover:bg-[#BDDBF7]/50 transition"
            >
              <span className="font-medium text-gray-800">Support</span>
              <span className="text-gray-500">→</span>
            </button>
          </div>
        </div>

        {/* Кнопка виходу */}
        <div className="mt-10 text-center">
          <button
            onClick={handleLogout}
            className="w-full max-w-md bg-[#0055A0] hover:bg-[#004480] text-white font-bold py-4 rounded-full transition shadow-lg"
          >
            Log out
          </button>
        </div>

        {/* Модалка підтримки */}
        {showSupport && <SupportModal onClose={() => setShowSupport(false)} />}
        {/* Modalka notifications */}
        {showNotifications && <NotificationsModal onClose={() => setShowNotifications(false)}/>}
      </div>
    </div>
  );
}