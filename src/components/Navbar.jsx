import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // ДОДАНО useLocation

// ICONS 
import trackerIcon from '../assets/drop.png'; 
import statsIcon from '../assets/stats.png';
import homeIcon from '../assets/home.png';
import trophyIcon from '../assets/trophy.png';
import profileIcon from '../assets/pfp.png';
import infoIcon from '../assets/information.png'
import bookIcon from '../assets/book.png'
import addIcon from '../assets/add.png'

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const isProfileActive = ["/profile", "/account", "/settings"].some(p => 
    location.pathname.startsWith(p)
  );

  const items = [
    { to: "/", label: "About", icon: bookIcon },
    { to: "/stats", label: "Stats", icon: statsIcon },
    { to: "/tracker", label: "Tracker", icon: addIcon },
    { to: "/achievements", label: "Awards", icon: trophyIcon },
    { to: "/profile", label: "Profile", icon: profileIcon },
    
    // посил. на інфу десь на гол. сторінцці
    // { to: "/info", label: "Info", icon: infoIcon } 
  ];

  return (
    <>
      {/* Десктоп - верхній */}
      <nav className="hidden md:block w-full border-b border-gray-200 bg-white">
        <div className="flex justify-center gap-12 py-5 text-gray-700 font-medium">
          {items.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className={`hover:text-blue-600 transition ${
                (item.to === "/profile" ? isProfileActive : isActive(item.to))
                  ? "text-blue-600 font-bold"
                  : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Мобільний - нижній таббар */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around py-3">
          {items.map(item => {
            const active = item.to === "/profile" ? isProfileActive : isActive(item.to);

            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center gap-1.5 px-4 py-3 rounded-2xl transition-all duration-200 ${
                  active ? "bg-blue-100 text-blue-600" : "text-gray-500"
                }`}
              >
                <img src={item.icon} alt={item.label} className="w-7 h-7" />
                <span className={`text-xs font-medium ${active ? "text-blue-600 font-bold" : ""}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Відступ знизу на мобілці */}
      <div className="pb-20 md:pb-0" />
    </>
  );
}