import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="flex justify-between items-center px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-16" />
        </Link>

        {/* Бургер */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>

        {/* Меню для великих екранів */}
        <div className="hidden md:flex gap-6 text-gray-700 font-medium">
          <Link to="/tracker" className="hover:text-blue-500">Tracker</Link>
          <Link to="/stats" className="hover:text-blue-500">Stats</Link>
          <Link to="/achievements" className="hover:text-blue-500">Achievements</Link>
          <Link to="/profile" className="hover:text-blue-500">Profile</Link>
        </div>
      </div>

      {/* Меню для мобільних */}
      {open && (
        <div className="flex flex-col gap-4 px-6 pb-4 md:hidden text-gray-700 font-medium border-t border-gray-100">
          <Link to="/tracker" onClick={() => setOpen(false)}>Tracker</Link>
          <Link to="/stats" onClick={() => setOpen(false)}>Stats</Link>
          <Link to="/achievements" onClick={() => setOpen(false)}>Achievements</Link>
          <Link to="/profile" onClick={() => setOpen(false)}>Profile</Link>
        </div>
      )}
    </nav>
  );
}
