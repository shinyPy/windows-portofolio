import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Rnd } from "react-rnd";
import Breadcrumb from "../../utils/breadcrumb";
import FileItem from "../../utils/filesystem/fileitem";
import FileUtils from "../../utils/filesystem/fileutils";

/**
 * FileExplorer component that displays filesystem contents
 * @param {Object} props - Component props
 * @param {Function} props.onExeClick - Handler for executable files
 * @param {boolean} [props.isExeWindow=false] - Whether this window is an executable window
 * @param {string} props.title - Window title
 * @param {Array} props.filesystem - The entire filesystem data
 * @param {Function} props.onClose - Window close handler
 * @param {Function} props.findItemById - Function to find an item by ID
 * @param {Object} [props.viewingFile] - Currently viewing file object
 * @param {Array} [props.fullPath=[]] - Current file path
 * @param {boolean} [props.showCloseButton=true] - Whether to show close button
 */
function FileExplorer({
  onExeClick,
  isExeWindow = false,
  title,
  filesystem,
  onClose,
  findItemById,
  viewingFile: externalViewingFile,
  fullPath = [],
  showCloseButton = true,
}) {
  // Use the fullPath directly if it's provided and not empty
  const initialPath = useMemo(() => {
    // If fullPath is valid (non-empty array), use it directly
    if (Array.isArray(fullPath) && fullPath.length > 0) {
      return fullPath;
    }

    // Otherwise, fall back to root folder
    const rootId = filesystem.find(item => item.type === 'folder')?.id;
    return rootId ? [rootId] : [];
  }, [filesystem, fullPath]);

  const [currentPath, setCurrentPath] = useState(initialPath);
  const [viewingFile, setViewingFile] = useState(externalViewingFile || null);
  const [isClosing, setIsClosing] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  // Update current path when external fullPath changes
  useEffect(() => {
    if (Array.isArray(fullPath) && fullPath.length > 0) {
      setCurrentPath(fullPath);
    }
  }, [fullPath]);

  // Get current folder based on path
  const currentFolder = useMemo(() => {
    return currentPath.length > 0
      ? findItemById(filesystem, currentPath[currentPath.length - 1])
      : null;
  }, [currentPath, findItemById, filesystem]);

  /**
   * Close the window with animation
   */
  const closeWindow = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  /**
   * Minimize window (placeholder for future implementation)
   */
  const handleMinimize = useCallback(() => {
    // Future: minimize to taskbar
    console.log('Minimize clicked');
  }, []);

  /**
   * Toggle maximize/restore window
   */
  const handleMaximizeToggle = useCallback(() => {
    setIsMaximized(prev => !prev);
  }, []);

  /**
   * Updates path when an item is clicked
   * @param {string|number} id - Item ID
   */
  const updatePath = useCallback((id) => {
    const clickedItem = findItemById(filesystem, id);
    if (!clickedItem) return;

    if (clickedItem.type === "folder") {
      setCurrentPath(prevPath => [...prevPath, id]);
      setViewingFile(null);
    } else if (clickedItem.type === "file") {
      if (clickedItem.name.endsWith('.exe')) {
        onExeClick?.(clickedItem.name);
        if (isExeWindow) {
          closeWindow();
        }
      } else {
        setViewingFile(clickedItem);
      }
    }
  }, [findItemById, filesystem, onExeClick, isExeWindow, closeWindow]);

  /**
   * Navigate to a specific folder
   * @param {string|number} id - Folder ID
   */
  const goToFolder = useCallback((id) => {
    setCurrentPath(prevPath => {
      const folderIndex = prevPath.indexOf(id);
      return folderIndex >= 0 ? prevPath.slice(0, folderIndex + 1) : prevPath;
    });
    setViewingFile(null);
  }, []);

  /**
   * Go back to previous folder or close viewer
   */
  const goBack = useCallback(() => {
    if (viewingFile) {
      setViewingFile(null);
    } else if (currentPath.length > 1) {
      setCurrentPath(prevPath => prevPath.slice(0, prevPath.length - 1));
    }
  }, [viewingFile, currentPath.length]);

  /**
   * Close the file viewer without changing the path
   */
  const closeViewer = useCallback(() => {
    setViewingFile(null);
  }, []);

  // Position window in center of screen initially
  const initialPosition = useMemo(() => {
    return {
      x: Math.round(window.innerWidth / 2 - 355),
      y: Math.round(window.innerHeight / 2 - 1000),
    };
  }, []);

  return (
    <Rnd
      default={{
        x: initialPosition.x,
        y: initialPosition.y,
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
        <div className="fileExplorer-header bg-gray-200 text-gray-900 flex justify-between items-center rounded-t-lg cursor-move">
          <div className="flex-1 text-center text-sm font-semibold p-2">
            {title}
          </div>
          <div className="flex h-full ml-auto">
            {/* Minimize Button */}
            <button
              onClick={handleMinimize}
              className="
                w-11 h-full flex items-center justify-center
                hover:bg-gray-300 transition-colors
                text-gray-700 text-xl font-light
              "
              aria-label="Minimize window"
              title="Minimize"
            >
              −
            </button>

            {/* Maximize/Restore Button */}
            <button
              onClick={handleMaximizeToggle}
              className="
                w-11 h-full flex items-center justify-center
                hover:bg-gray-300 transition-colors
                text-gray-700
              "
              aria-label={isMaximized ? "Restore window" : "Maximize window"}
              title={isMaximized ? "Restore" : "Maximize"}
            >
              {isMaximized ? '❐' : '☐'}
            </button>

            {/* Close Button */}
            <button
              onClick={closeWindow}
              className="
                w-11 h-full flex items-center justify-center
                hover:bg-red-600 hover:text-white
                transition-colors text-gray-700
              "
              aria-label="Close window"
              title="Close"
            >
              ✕
            </button>
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
                <div className="text-gray-600 text-center mt-10">
                  {currentFolder ? "This folder is empty" : "Folder not found"}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Rnd>
  );
}

export default React.memo(FileExplorer);
