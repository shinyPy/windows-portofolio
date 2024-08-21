// App.js
import React from 'react';
import DesktopIcon from './components/icon/DesktopIcon';
import Taskbar from './components/Taskbar';
import FileExplorer from './components/windows/FileExplorer';
import initialFilesystem from './utils/filesystem';
import GlobalStyle from './globalStyle';
import { AppContainer, ContentWrapper, DesktopContainer, WarningContainer } from './components/style/ContainerStyle';
import { useAppHooks } from './hooks/appHooks';

import folderIconSrc from './assets/icons/folder.png';
import FileExplorerIcon from './assets/icons/file-explorer.png';
import fileIconSrc from './assets/icons/file.png';
import exeIconSrc from './assets/icons/exeIcon.png';

function App() {
  const { filesystem, windows, setWindows, isMobile, findItemById } = useAppHooks(initialFilesystem);

  const getFullPath = (id, fs, path = []) => {
    for (const item of fs) {
      if (item.id === id) {
        return [...path, id];
      }
      if (item.contents) {
        const result = getFullPath(id, item.contents, [...path, item.id]);
        if (result) return result;
      }
    }
    return null;
  };

  const openWindow = (title, id, viewingFile = null, fullPath) => {
    const existingWindow = windows.find(win => win.windowId === id && win.viewingFile === viewingFile);
    if (existingWindow) {
      setWindows([...windows.filter(win => win.windowId !== id || win.viewingFile !== viewingFile), existingWindow]);
    } else {
      setWindows([...windows, {
        title,
        iconSrc: viewingFile ? fileIconSrc : folderIconSrc, // Differentiate icon
        Component: FileExplorer,
        id: Date.now(),
        windowId: id,
        viewingFile,
        fullPath, // Add fullPath here
      }]);
    }
  };

  const onFileClick = (id) => {
    const clickedItem = findItemById(filesystem, id);
    const fullPath = getFullPath(id, filesystem);
  
    if (clickedItem) {
      if (clickedItem.type === 'folder') {
        openWindow(clickedItem.name, id, null, fullPath);
      } else if (clickedItem.type === 'file') {
        openWindow(clickedItem.name, id, clickedItem, fullPath); // Pass the file info here
      } else if (clickedItem.type === 'link') {
        window.open(clickedItem.url, '_blank');
      }
    }
  };

  const closeWindow = (id) => {
    setWindows(windows.filter(win => win.id !== id));
  };

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <ContentWrapper isMobile={isMobile}>
        <DesktopContainer className="desktop">
          <DesktopIcon
            className="desktop-icon"
            name="File Explorer"
            iconSrc={FileExplorerIcon}
            onDoubleClick={() => openWindow('File Explorer', 1)}
          />
          {initialFilesystem[0].contents[0].contents.map(item => (
            <DesktopIcon
              key={item.id}
              className="desktop-icon"
              name={item.name}
              iconSrc={
                item.type === 'folder'
                  ? folderIconSrc
                  : item.name.endsWith('.exe')
                  ? exeIconSrc 
                  : fileIconSrc
              }
              onDoubleClick={() => onFileClick(item.id)}
            />
          ))}
        </DesktopContainer>
          {windows.map((win) => (
            <FileExplorer
              key={win.id}
              title={win.title}
              iconSrc={win.iconSrc}
              onClose={() => closeWindow(win.id)}
              filesystem={filesystem}
              windowId={win.windowId}
              findItemById={findItemById}
              viewingFile={win.viewingFile}  // Pass the viewingFile prop
              fullPath={win.fullPath}  // Pass the fullPath prop
            />
          ))}
        </ContentWrapper>
        <Taskbar windows={windows} />
        <WarningContainer isMobile={isMobile}>
          <div className="warning-message">Message from Shiniya: pake pc woi</div>
        </WarningContainer>
      </AppContainer>
    </>
  );
}

export default App;