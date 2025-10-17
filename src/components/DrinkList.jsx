import React from 'react'

export default function DrinkList({ drinks, onAdd }) {
  return (
    <div className="w-full max-w-md mt-10">
      <h2 className="text-lg font-medium mb-4 text-gray-800">Today's drinks</h2>
      <ul className="flex flex-wrap gap-3">
        {drinks.map((drink) => (
          <li
            key={drink.id}
            className="px-4 py-2 bg-blue-100 text-[#0055A0] rounded-full text-sm"
          >
            {drink.name} — {drink.amount} ml
          </li>
        ))}
      </ul>
      <button
        onClick={onAdd}
        className="mt-6 w-full py-2 bg-[#0055A0] hover:bg-[#004480] text-white rounded-full transition"
      >
        + Add drink
      </button>
    </div>
  );
}
