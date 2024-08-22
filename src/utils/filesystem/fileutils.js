import React from 'react';

function FileUtils({ viewingFile, closeViewer, showCloseButton }) {
  const handleFileClick = () => {
    if (viewingFile.type === 'link' && viewingFile.url) {
      window.open(viewingFile.url, '_blank');
    }
  };

  return (
    <div className="fileUtils flex justify-center items-center w-full h-full bg-white text-black relative rounded-lg p-4 overflow-auto">
      {showCloseButton && (
        <button
          onClick={closeViewer}
          className="absolute top-5 right-5 bg-black bg-opacity-10 text-black border border-black border-opacity-20 px-4 py-2 rounded-full text-sm backdrop-blur-md transition-transform duration-300 hover:bg-opacity-20 hover:scale-110 focus:outline-none"
        >
          Close
        </button>
      )}
      {viewingFile?.type === 'link' ? (
        <button
          onClick={handleFileClick}
          className="text-blue-500 underline bg-white hover:text-blue-700"
        >
          Open Link
        </button>
      ) : viewingFile?.name?.endsWith('.png') || viewingFile?.name?.endsWith('.jpg') ? (
        <img
          src={viewingFile.src}
          alt={viewingFile.name}
          className="max-w-[90%] max-h-[90%] rounded-lg"
        />
      ) : viewingFile?.name?.endsWith('.mp4') ? (
        <video controls className="max-w-[90%] max-h-[90%] rounded-lg">
          <source src={viewingFile.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : viewingFile?.name?.endsWith('.txt') ? (
        <div className="w-full h-full bg-white p-4 rounded-lg whitespace-pre-wrap overflow-auto text-balance text-black">
          <pre className="font-mono text-base leading-relaxed w-full h-full overflow-x text-balance">
            {viewingFile.src}
          </pre>
        </div>
      ) : (
        <div>Unsupported file format</div>
      )}
    </div>
  );
}

export default FileUtils;
