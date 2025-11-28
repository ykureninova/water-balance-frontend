import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import GoalCalc from "./pages/GoalCalc";
import Tracker from "./pages/Tracker";
import Info from "./pages/Info";
import Stats from "./pages/Statistics";
import Profile from "./pages/Profile";
import Achievements from "./pages/Achievements";
import Settings from "./pages/Settings";
import AccountSettings from "./pages/AccountSettings";
import FactDetail from "./pages/FactDetail";

import Navbar from "./components/Navbar";
import { ToastProvider } from "./components/ToastContext.jsx";
import Landing from "./pages/Landing.jsx";

function App() {
  return (
    <ToastProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />

          <main className="flex-1 ">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/goalcalc" element={<GoalCalc />} />
              <Route path="/tracker" element={<Tracker />} />
              <Route path="/info" element={<Info />} />
              <Route path="/info/:id" element={<FactDetail />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/account-settings" element={<AccountSettings />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ToastProvider>
);
}

export default App;
