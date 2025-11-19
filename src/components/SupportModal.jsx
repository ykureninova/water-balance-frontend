import { useState } from "react";

export default function SupportModal({ onClose }) {
  const [copied, setCopied] = useState("");

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-6">
      {/* Легкий розмитий фон */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" onClick={onClose}></div>

      {/* Модалка */}
      <div
        className="relative bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl border border-blue-100"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-center mb-7 text-blue-900">Support</h2>

        <div className="space-y-5">
          {/* Email */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-blue-50 rounded-2xl p-5 border border-blue-100">
            <div className="text-left">
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-semibold text-blue-900 break-all">support@waterdrops.com</p>
            </div>
            <button
              onClick={() => copyToClipboard("support@waterdrops.com")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition whitespace-nowrap min-w-20"
            >
              {copied === "support@waterdrops.com" ? "Copied!" : "Copy"}
            </button>
          </div>

          {/* Phone */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-blue-50 rounded-2xl p-5 border border-blue-100">
            <div className="text-left">
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-semibold text-blue-900">+380 99 123 45 67</p>
            </div>
            <button
              onClick={() => copyToClipboard("+380991234567")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition whitespace-nowrap min-w-20"
            >
              {copied === "+380991234567" ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full bg-gradient-to-r from-blue-100 to-cyan-100 hover:from-blue-200 hover:to-cyan-200 text-blue-900 font-bold py-4 rounded-full transition shadow-md"
        >
          Close
        </button>
      </div>
    </div>
  );
}