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
  // Validate path exists in filesystem
  const isValidPath = useCallback((path) => {
    return Array.isArray(path) && path.every(id =>
      filesystem.some(item => item.id === id)
    );
  }, [filesystem]);

  // Get initial path - use provided fullPath if valid, fallback to root
  const getInitialPath = useMemo(() => {
    const rootId = filesystem.find(item => item.type === 'folder')?.id;
    return isValidPath(fullPath) ? fullPath : rootId ? [rootId] : [];
  }, [filesystem, fullPath, isValidPath]);

  const [currentPath, setCurrentPath] = useState(getInitialPath);
  const [viewingFile, setViewingFile] = useState(externalViewingFile || null);
  const [isClosing, setIsClosing] = useState(false);

  // Update path when external fullPath changes
  useEffect(() => {
    if (isValidPath(fullPath)) {
      setCurrentPath(fullPath);
    }
  }, [fullPath, isValidPath]);

  // Get current folder based on path
  const currentFolder = useMemo(() => {
    return currentPath.length > 0
      ? findItemById(filesystem, currentPath[currentPath.length - 1])
      : null;
  }, [currentPath, findItemById, filesystem]);

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
  }, [findItemById, filesystem, onExeClick, isExeWindow]);

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

  /**
   * Close the window with animation
   */
  const closeWindow = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 200);
  }, [onClose]);

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
        <div className="fileExplorer-header bg-gray-200 text-gray-900 p-2 flex justify-between items-center rounded-t-lg cursor-move">
          <div className="flex-1 text-center text-sm font-semibold">
            {title}
          </div>
          <div className="flex space-x-1 ml-auto">
            <span className="block w-3 h-3 bg-yellow-500 rounded-full"></span>
            <span
              onClick={closeWindow}
              className="block w-3 h-3 bg-red-500 rounded-full cursor-pointer"
              aria-label="Close window"
              role="button"
              tabIndex={0}
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
