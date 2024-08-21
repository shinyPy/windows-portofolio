import React from 'react';
import FileExplorer from './components/windows/FileExplorer';
import GlobalStyle from './globalStyle';
import { AppContainer, ContentWrapper, WarningContainer } from './components/style/ContainerStyle';
import { useAppHooks, getFullPath } from './hooks/appHooks';
import folderIconSrc from './assets/icons/folder.png';
import fileIconSrc from './assets/icons/file.png';
import initialFilesystem from './utils/filesystem/initialFilesystem';
import DesktopIconContainer from './components/container/DesktopIconContainer';
import WindowContainer from './components/container/WindowContainer';
import Taskbar from './components/Taskbar';

function App() {
  const { filesystem, windows, setWindows, isMobile, findItemById } = useAppHooks(initialFilesystem);

  const openWindow = (title, id, viewingFile = null, fullPath) => {
    const existingWindow = windows.find(win => win.windowId === id && win.viewingFile === viewingFile);
    if (existingWindow) {
      setWindows([...windows.filter(win => win.windowId !== id || win.viewingFile !== viewingFile), existingWindow]);
    } else {
      setWindows([...windows, {
        title,
        iconSrc: viewingFile ? fileIconSrc : folderIconSrc,
        Component: FileExplorer,
        id: Date.now(),
        windowId: id,
        viewingFile,
        fullPath,
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
        openWindow(clickedItem.name, id, clickedItem, fullPath);
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
          <DesktopIconContainer
            filesystem={initialFilesystem[0].contents[0].contents}
            onFileClick={onFileClick}
            openWindow={openWindow}
          />
          <WindowContainer windows={windows} closeWindow={closeWindow} filesystem={filesystem} findItemById={findItemById} />
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