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

  const goBack = () => {
    if (currentPath.length > 1) {
      setCurrentPath(currentPath.slice(0, currentPath.length - 1));
    }
  };

  const closeViewer = () => {
    setViewingFile(null);
  };

  return (
    <Draggable handle=".fileExplorer-header">
      <div className="w-[600px] h-[400px] bg-white border border-gray-300 shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col overflow-hidden">
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
              <button onClick={closeViewer} className="absolute top-2 right-2 bg-[#0078d4] text-white font-semibold border-none p-1 cursor-pointer rounded hover:bg-[#005a9e]">Close</button>
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
              <nav className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-white mb-2" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                  {currentPath.length > 1 && (
                    <li className="inline-flex items-center">
                      <button 
                        onClick={goBack} 
                        className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
                      >
                        <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                          <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                        </svg>
                        Back
                      </button>
                    </li>
                  )}
                  {currentPath.map((id, index) => {
                    const folder = findItemById(filesystem, id);
                    return (
                      <li key={id} className={`inline-flex items-center ${index > 0 ? 'mx-2 text-gray-700' : ''}`}>
                        {index > 0 && (
                          <svg className="w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                          </svg>
                        )}
                        <span className="text-sm font-medium text-gray-700">
                          {folder.name === '/' ? 'root' : folder.name}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </nav>
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
