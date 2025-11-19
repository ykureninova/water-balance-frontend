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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/goalcalc" element={<GoalCalc/>}/>
        <Route path="/tracker" element={<Tracker/>}/>
        <Route path="/info" element={<Info/>}/>
        <Route path="/stats" element={<Stats/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/achievements" element={<Achievements/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/account-settings" element={<AccountSettings/>}/>
      </Routes>
    </Router>
  )
}

export default App
