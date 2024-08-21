// TextViewer.js
import React from 'react';

function TextViewer({ title, iconSrc, onClose, src }) {
  return (
    <div className="w-[600px] h-[400px] bg-white border border-gray-300 rounded-xl shadow-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 flex justify-between items-center rounded-t-xl">
        <div className="flex items-center space-x-2">
          <img src={iconSrc} alt={`${title} icon`} className="w-5 h-5" />
          <div className="text-base font-semibold">{title}</div>
        </div>
        <button
          onClick={onClose}
          className="text-2xl p-1 transition-colors"
        >
          ×
        </button>
      </div>
      <div className="p-3 h-full bg-gray-50 overflow-auto font-sans">
        <pre className="text-gray-800 whitespace-pre-wrap">{src}</pre>
      </div>
    </div>
  );
}

export default TextViewer;
