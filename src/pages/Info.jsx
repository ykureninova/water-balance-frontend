import React from "react";
import { Link } from "react-router-dom";
import splashHeader from '../assets/splash-header.jpg';
import facts from "../data/facts.js";

export default function Info() {
  return (
    <div className="w-full">
      {/* Заголовок */}
      <div className="text-center px-6 pt-8 pb-12">
        <h1 className="text-5xl md:text-6xl font-bold text-[#0055A0] leading-tight">
          Why water<br />matters
        </h1>
        <p className="text-gray-600 mt-4 text-lg max-w-xl mx-auto">
          Quick facts & tips for better hydration
        </p>
      </div>

      {/* Головне зображення */}
      <div className="px-6 mb-12">
        <div className="rounded-3xl overflow-hidden border-white border-4 shadow-xl">
          <img
            src={splashHeader}
            alt="Pouring water"
            className="w-full h-72 md:h-96 object-cover"
          />
        </div>
      </div>

      {/* Картки адаптивний грид */}
      <div className="px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {facts.map((fact) => (
            <Link
              key={fact.id}
              to={`/info/${fact.id}`}
              className={`group rounded-3xl p-8 ${fact.color} shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-[#BDDBF7] backdrop-blur-sm`}
            >
              <h3 className="text-2xl font-bold text-[#0055A0] mb-3 group-hover:text-[#004480] transition">
                {fact.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {fact.short}
              </p>
              <span className="inline-block mt-6 text-[#0055A0] font-semibold group-hover:underline">
                Read more →
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Цитата */}
      <div className="text-center px-6 mt-20 pb-10">
        <p className="text-xl md:text-2xl text-gray-700 italic max-w-3xl mx-auto">
          "Water is the driving force of all nature."
          <br />
          <span className="text-[#0055A0] font-medium not-italic">— Leonardo da Vinci</span>
        </p>
      </div>
    </div>
  );
}