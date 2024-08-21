// FileUtils.js
import React from 'react';

function FileUtils({ viewingFile, closeViewer }) {
  return (
    <div className="fileUtils flex justify-center items-center w-full h-full bg-gray-900 text-white relative rounded-lg">
      <button
        onClick={closeViewer}
        className="absolute top-2 right-2 bg-blue-600 text-white font-semibold px-3 py-1 rounded-full hover:bg-blue-700 transition-colors"
      >
        Close
      </button>
      {viewingFile?.name?.endsWith('.png') || viewingFile?.name?.endsWith('.jpg') ? (
        <img
          src={viewingFile.src}
          alt={viewingFile.name}
          className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg"
        />
      ) : viewingFile?.name?.endsWith('.mp4') ? (
        <video controls className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg">
          <source src={viewingFile.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : viewingFile?.name?.endsWith('.txt') ? (
        <div>
          <pre>{viewingFile.src}</pre>
        </div>
      ) : (
        <div>Unsupported file format</div>
      )}
    </div>
  );
}

export default FileUtils;