// src/components/windows/FileExplorer.js
import React, { useState } from 'react';
import Draggable from 'react-draggable';

function FileExplorer({ title, iconSrc, filesystem, windowId, onClose, findItemById }) {
  const [currentPath, setCurrentPath] = useState([windowId]);
  const [viewingFile, setViewingFile] = useState(null);

  const currentFolder = findItemById(filesystem, currentPath[currentPath.length - 1]);

  const updatePath = (id) => {
    const clickedItem = findItemById(filesystem, id);
    if (clickedItem.type === 'folder') {
      setCurrentPath([...currentPath, id]);
    } else if (clickedItem.type === 'file') {
      setViewingFile(clickedItem);
    }
  };

  const goToFolder = (id) => {
    setCurrentPath(currentPath.slice(0, currentPath.indexOf(id) + 1));
  };

  const closeViewer = () => {
    setViewingFile(null);
  };

  return (
    <Draggable handle=".fileExplorer-header">
      <div className="w-[600px] h-[400px] bg-white border border-gray-300 shadow-lg absolute flex flex-col overflow-hidden">
        <div className="fileExplorer-header bg-[#0078d4] text-white p-2 flex justify-between items-center cursor-move">
          <div className="flex items-center">
            <img src={iconSrc} alt={`${title} icon`} className="w-4 h-4 mr-2" />
            <div className="text-sm font-bold">{title}</div>
          </div>
          <button onClick={onClose} className="bg-transparent border-none text-white text-lg cursor-pointer p-0 hover:text-[#ff5c5c]">
            ×
          </button>
        </div>
        <div className="p-2 h-full bg-[#f3f3f3] overflow-auto font-sans">
          {viewingFile ? (
            <div className="fileViewer flex justify-center items-center w-full h-full bg-black text-white relative">
              <button onClick={closeViewer} className="absolute top-2 right-2 bg-white border-none p-1 cursor-pointer">Close</button>
              {viewingFile.name.endsWith('.png') || viewingFile.name.endsWith('.jpg') ? (
                <img src={viewingFile.src} alt={viewingFile.name} className="max-w-[90%] max-h-[90%]" />
              ) : viewingFile.name.endsWith('.mp4') ? (
                <video controls className="max-w-[90%] max-h-[90%]">
                  <source src={viewingFile.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div>Unsupported file format</div>
              )}
            </div>
          ) : (
            <>
              <div className="breadcrumbs mb-2 text-sm text-gray-600">
                {currentPath.map((id, index) => {
                  const folder = findItemById(filesystem, id);
                  return (
                    <span key={id}>
                      {index > 0 && ' > '}
                      <button 
                        onClick={() => goToFolder(id)} 
                        className="text-blue-500 underline hover:no-underline"
                      >
                        {folder.name === '/' ? 'Root' : folder.name}
                      </button>
                    </span>
                  );
                })}
              </div>
              {currentFolder && currentFolder.contents ? (
                currentFolder.contents.map(item => (
                  <div 
                    key={item.id} 
                    onDoubleClick={() => updatePath(item.id)}
                    className="fileExplorerItem flex items-center p-2 cursor-pointer hover:bg-gray-100 mb-1 border border-gray-300 bg-white"
                  >
                    <span className="mr-2">
                      {item.type === 'folder' ? '📁' : item.name.endsWith('.exe') ? '💻' : '📄'}
                    </span>
                    {item.name}
                  </div>
                ))
              ) : (
                <div>No items</div>
              )}
            </>
          )}
        </div>
      </div>
    </Draggable>
  );
}

export default FileExplorer;
