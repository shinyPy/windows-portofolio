import React, { useState, useEffect, useCallback } from "react";
import { Rnd } from "react-rnd";
import Breadcrumb from "../../utils/breadcrumb";
import FileItem from "../../utils/filesystem/fileitem";
import FileUtils from "../../utils/filesystem/fileutils";

function FileExplorer({ onExeClick, isExeWindow = false, ...other }) {
  const {
    title,
    filesystem,
    onClose,
    findItemById,
    viewingFile: externalViewingFile,
    fullPath = [],
    showCloseButton = true,
  } = other;

  // Validate path exists in filesystem
  const isValidPath = useCallback((path) => {
    return Array.isArray(path) && path.every(id =>
      filesystem.some(item => item.id === id)
    );
  }, [filesystem]);

  const [currentPath, setCurrentPath] = useState(() => {
    // Get root folder ID (first folder in filesystem)
    const rootId = filesystem.find(item => item.type === 'folder')?.id;
    return isValidPath(fullPath) ? fullPath : rootId ? [rootId] : [];
  });
  const [viewingFile, setViewingFile] = useState(externalViewingFile || null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isValidPath(fullPath)) {
      setCurrentPath(fullPath);
    }
  }, [fullPath, isValidPath]);

  const currentFolder = findItemById(
    filesystem,
    currentPath[currentPath.length - 1]
  );

  const updatePath = (id) => {
    const clickedItem = findItemById(filesystem, id);
    if (!clickedItem) return; // Prevent invalid IDs from being added
    if (clickedItem.type === "folder") {
      setCurrentPath([...currentPath, id]);
      setViewingFile(null); // Reset viewing file
    } else if (clickedItem.type === "file") {
      if (clickedItem.name.endsWith('.exe')) {
        onExeClick?.(clickedItem.name); // Call onExeClick for .exe files
        // Only close if this is an exe-specific window
        if (isExeWindow) {
          closeWindow();
        }
      } else {
        setViewingFile(clickedItem); // Set the file to be viewed
      }
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
    setViewingFile(null); // Reset viewing file without changing the path
  };

  const closeWindow = () => {
    setIsClosing(true); // Trigger closing animation
    setTimeout(() => {
      onClose(); // Call the close function after animation
    }, 200); // Match the duration of the closing animation
  };

  const initialX = Math.round(window.innerWidth / 2 - 355); // Horizontal center
  const initialY = Math.round(window.innerHeight / 2 - 950); // Vertical center

  return (
    <Rnd
      default={{
        x: initialX,
        y: initialY,
        width: 800,
        height: 600,
      }}
      minWidth={600}
      minHeight={300}
      bounds="window"
    >
      <div
        className={`w-full h-full bg-white border border-gray-200 rounded-lg shadow-lg flex flex-col overflow-hidden font-mono window-container ${
          isClosing ? "closing" : ""
        }`}
      >
        <div className="fileExplorer-header bg-gray-200 text-gray-900 p-2 flex justify-between items-center rounded-t-lg cursor-move">
          <div className="flex-1 text-center text-sm font-semibold">
            {title}
          </div>
          <div className="flex space-x-1 ml-auto">
            <span className="block w-3 h-3 bg-yellow-500 rounded-full"></span>
            <span
              onClick={closeWindow}
              className="block w-3 h-3 bg-red-500 rounded-full cursor-pointer"
            ></span>
          </div>
        </div>
        <div className="p-3 h-full bg-gray-100 overflow-auto">
          {viewingFile ? (
            <FileUtils
              viewingFile={viewingFile}
              closeViewer={closeViewer}
              showCloseButton={showCloseButton}
            />
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
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4">
                  {currentFolder.contents.map((item) => (
                    <FileItem
                      key={item.id}
                      item={item}
                      updatePath={updatePath}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-gray-600 text-center mt-10">No items</div>
              )}
            </>
          )}
        </div>
      </div>
    </Rnd>
  );
}

export default FileExplorer;
