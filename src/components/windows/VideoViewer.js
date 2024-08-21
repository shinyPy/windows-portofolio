// src/components/windows/VideoViewer.js
import React from 'react';

const VideoViewer = ({ title, src, onClose }) => (
  <div className="flex flex-col justify-center items-center w-full h-full bg-black bg-opacity-90 relative">
    <button
      onClick={onClose}
      className="absolute top-5 right-5 bg-white bg-opacity-10 text-white border border-white border-opacity-20 px-4 py-2 rounded-full text-sm backdrop-blur-md transition-transform duration-300 hover:bg-opacity-20 hover:scale-110 focus:outline-none"
    >
      Close
    </button>
    <video controls className="max-w-5/6 max-h-5/6 rounded-lg shadow-lg">
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
);

export default VideoViewer;
