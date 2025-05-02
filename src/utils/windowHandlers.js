import { TerminalEmulator } from '../components/windows/TerminalEmulator';
import exeIconSrc from '../assets/icons/exeIcon.png';

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
  const fullPath = getFullPath(id, filesystem);

  if (clickedItem) {
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

const getFullPath = (id, filesystem) => {
  const path = [];
  let current = findItemById(filesystem, id);

  while (current) {
    path.unshift(current.name);
    current = findItemById(filesystem, current.parentId);
  }

  return '/' + path.join('/');
};

const findItemById = (items, id) => {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.contents) {
      const found = findItemById(item.contents, id);
      if (found) return found;
    }
  }
  return null;
};
