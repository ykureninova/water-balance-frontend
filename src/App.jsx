import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import GoalCalc from "./pages/GoalCalc";
import Home from "./pages/Home"
import Tracker from "./pages/Tracker"
import Info from "./pages/Info"
import Stats from "./pages/Statistics"
import Profile from "./pages/Profile"
import Achievements from "./pages/Achievements";
import Settings from "./pages/Settings"
import AccountSettings from "./pages/AccountSettings"
import Navbar from "./components/Navbar";
import FactDetail from "./pages/FactDetail";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Навбар зверху (десктоп) + нижній таббар (мобілка) вже в Navbar */}
        <Navbar />
        <main className="flex-1 pb-24 md:pb-8 pt-4 md:pt-8 px-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/goalcalc" element={<GoalCalc />} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/info" element={<Info />} />
            <Route path="/info/:id" element={<FactDetail/>}/>
            <Route path="/stats" element={<Stats />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/account-settings" element={<AccountSettings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;