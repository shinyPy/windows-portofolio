import { TerminalEmulator } from '../components/windows/TerminalEmulator';
import exeIconSrc from '../assets/icons/exeIcon.png';
import { findItemById } from './filesystem/filesystemUtils';

export const handleFileClick = ({
  id,
  filesystem,
  exeApplications,
  setWindows,
  findItemById,
  openWindow,
  initialFilesystem
}) => {
  const clickedItem = findItemById(filesystem, id);

  if (clickedItem) {
    // Build the correct path for the clicked item
    const fullPath = buildPath(id, initialFilesystem);

    if (clickedItem.name === "terminal.exe") {
      setWindows(windows => [
        ...windows,
        {
          title: "Terminal",
          iconSrc: exeIconSrc,
          Component: TerminalEmulator,
          props: { filesystem: initialFilesystem },
          id: Date.now(),
          windowId: id,
        },
      ]);
    } else if (clickedItem.name.endsWith('.exe')) {
      const exeApp = exeApplications[clickedItem.name];
      if (exeApp) {
        setWindows(windows => [
          ...windows,
          {
            title: clickedItem.name,
            iconSrc: exeIconSrc,
            Component: exeApp.Component,
            id: Date.now(),
            windowId: id,
            defaultSize: exeApp.defaultSize
          }
        ]);
      }
    } else if (clickedItem.type === "folder") {
      openWindow("Thunar", id, null, fullPath);
    } else if (clickedItem.type === "file") {
      openWindow(clickedItem.name, id, clickedItem, fullPath, false);
    } else if (clickedItem.type === "link") {
      window.open(clickedItem.url, "_blank", "noopener,noreferrer");
    }
  }
};

/**
 * Builds the correct path array for an item by traversing the filesystem
 * @param {number|string} id - The ID of the item
 * @param {Array} filesystem - The filesystem array
 * @returns {Array} Array of IDs representing the path
 */
export const buildPath = (targetId, filesystem) => {
  const path = [];

  const findPath = (currentItems, parentIds = []) => {
    for (const item of currentItems) {
      // Current path is parent IDs plus current item
      const currentPath = [...parentIds, item.id];

      // If this is the target ID, we found the path
      if (item.id === targetId) {
        path.push(...currentPath);
        return true;
      }

      // If this item has contents (it's a folder), search within it
      if (item.contents && item.contents.length > 0) {
        const found = findPath(item.contents, currentPath);
        if (found) return true;
      }
    }

    return false;
  };

  findPath(filesystem);
  return path;
};
