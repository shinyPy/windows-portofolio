import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import Breadcrumb from "../../utils/breadcrumb";
import FileItem from "../../utils/filesystem/fileitem";
import FileUtils from "../../utils/filesystem/fileutils";

function FileExplorer({
  title,
  iconSrc,
  filesystem,
  windowId,
  onClose,
  findItemById,
  viewingFile: externalViewingFile,
  fullPath = [],
  showCloseButton = true,
}) {
  const [currentPath, setCurrentPath] = useState(
    fullPath.length ? fullPath : [windowId],
  );
  const [viewingFile, setViewingFile] = useState(externalViewingFile || null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (fullPath.length) {
      setCurrentPath(fullPath);
    }
  }, [fullPath]);

  const currentFolder = findItemById(
    filesystem,
    currentPath[currentPath.length - 1],
  );

  const updatePath = (id) => {
    const clickedItem = findItemById(filesystem, id);
    if (clickedItem.type === "folder") {
      setCurrentPath([...currentPath, id]);
      setViewingFile(null); // Reset viewing file
    } else if (clickedItem.type === "file") {
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
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-2">
                  {currentFolder.contents.map((item) => (
                    <FileItem
                      key={item.id}
                      item={item}
                      updatePath={updatePath}
                      className="macos-file-item"
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
