import React from 'react'
import { useState } from "react";

const NotificationsModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-6">
      {/* Легкий розмитий фон */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" onClick={onClose}></div>

      {/* Модалка */}
      <div
        className="relative bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl border border-blue-100"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-center mb-7 text-blue-900">Notifications</h2>

        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-blue-50 rounded-2xl p-5 border border-blue-100">
            <div className="text-left">
              <p className="font-semibold text-blue-900 break-all">Not available for now</p>
              <p className="font-semibold text-blue-900 break-all">Coming soon...</p>
            </div>
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
  )
}

export default NotificationsModal
