// FileExplorer.js
import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import Breadcrumb from '../../utils/breadcrumb';
import FileItem from '../../utils/fileitem';
import FileUtils from '../../utils/fileutils';

function FileExplorer({ title, iconSrc, filesystem, windowId, onClose, findItemById, viewingFile: externalViewingFile, fullPath = [] }) {
  const [currentPath, setCurrentPath] = useState(fullPath.length ? fullPath : [windowId]);
  const [viewingFile, setViewingFile] = useState(externalViewingFile || null);

  useEffect(() => {
    if (fullPath.length) {
      setCurrentPath(fullPath);
    }
  }, [fullPath]);

  const currentFolder = findItemById(filesystem, currentPath[currentPath.length - 1]);

  const updatePath = (id) => {
    const clickedItem = findItemById(filesystem, id);
    if (clickedItem.type === 'folder') {
      setCurrentPath([...currentPath, id]);
      setViewingFile(null); // Reset viewing file
    } else if (clickedItem.type === 'file') {
      setViewingFile(clickedItem); // Set the file to be viewed
    }
  };

  const goToFolder = (id) => {
    setCurrentPath(currentPath.slice(0, currentPath.indexOf(id) + 1));
    setViewingFile(null); // Reset viewing file
  };

  const goBack = () => {
    if (viewingFile) {
      setViewingFile(null);
    } else if (currentPath.length > 1) {
      setCurrentPath(currentPath.slice(0, currentPath.length - 1));
    }
  };

  const closeViewer = () => {
    setViewingFile(null);
    setCurrentPath(currentPath.slice(0, -1)); // Go back to the parent folder
  };

  return (
    <Draggable handle=".fileExplorer-header">
      <div className="w-[600px] h-[400px] bg-white border border-gray-300 rounded-xl shadow-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col overflow-hidden font-mono">
        <div className="fileExplorer-header bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 flex justify-between items-center rounded-t-xl cursor-move">
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
        <div className="p-3 h-full bg-gray-50 overflow-auto">
          {viewingFile ? (
            <FileUtils viewingFile={viewingFile} closeViewer={closeViewer} />
          ) : (
            <>
              <Breadcrumb
                currentPath={currentPath}
                goToFolder={goToFolder}
                goBack={goBack}
                findItemById={findItemById}
                filesystem={filesystem}
              />
              {currentFolder && currentFolder.contents ? (
                <div className="grid grid-cols-2 gap-4">
                  {currentFolder.contents.map((item) => (
                    <FileItem key={item.id} item={item} updatePath={updatePath} />
                  ))}
                </div>
              ) : (
                <div className="text-gray-600 text-center">No items</div>
              )}
            </>
          )}
        </div>
      </div>
    </Draggable>
  );
}

export default FileExplorer;
