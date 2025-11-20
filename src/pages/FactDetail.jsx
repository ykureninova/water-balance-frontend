import React from "react";
import { useParams, Link } from "react-router-dom";
import facts from "../data/facts.js";

export default function FactDetail() {
  const { id } = useParams();
  const fact = facts.find(f => f.id === Number(id));

  if (!fact) {
    return (
      <div className="text-center py-32">
        <h2 className="text-4xl font-bold text-[#0055A0] mb-4">Fact not found</h2>
        <Link to="/info" className="text-[#0055A0] text-lg underline">← Back to all facts</Link>
      </div>
    );
  }

  return (
    <article className="w-full max-w-4xl mx-auto px-6 pb-12">
      {/* Кнопка назад */}
      <Link to="/info" className="inline-flex items-center gap-2 text-[#0055A0] font-medium hover:underline mb-10">
        ← All facts
      </Link>

      {/* Головне зображення */}
      <div className="rounded-3xl overflow-hidden shadow-2xl mb-12 border-4 border-white">
        <img 
          src={fact.image} 
          alt={fact.title}
          className="w-full h-96 md:h-[500px] object-cover"
        />
      </div>

      {/* Заголовок */}
      <h1 className="text-4xl md:text-6xl font-bold text-[#0055A0] mb-8 leading-tight">
        {fact.title}
      </h1>

      {/* Текст з автоматичними переносами рядків */}
      <div className="prose prose-lg max-w-none text-gray-700 space-y-6 text-lg leading-relaxed">
        {fact.content.split("\n\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {/* Додатковий акцент в кінці */}
      <div className="mt-16 p-8 bg-[#BDDBF7]/30 rounded-3xl border-2 border-[#8CC1E9]/50">
        <p className="text-xl font-medium text-[#0055A0] text-center">
          Stay hydrated. Your body will thank you.
        </p>
      </div>
    </article>
  );
}