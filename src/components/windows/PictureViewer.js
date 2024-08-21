// src/components/windows/PictureViewer.js
import React from 'react';

const PictureViewer = ({ title, src, onClose }) => (
  <div className="flex justify-center items-center w-full h-full bg-black bg-opacity-90 relative overflow-hidden">
    <button
      onClick={onClose}
      className="absolute top-5 right-5 bg-white bg-opacity-10 text-white border border-white border-opacity-20 px-4 py-2 rounded-full text-sm backdrop-blur-md transition-transform duration-300 hover:bg-opacity-20 hover:scale-110 focus:outline-none"
    >
      Close
    </button>
    <img
      src={src}
      alt={title}
      className="max-w-5/6 max-h-5/6 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 hover:opacity-95"
    />
  </div>
);

export default PictureViewer;
