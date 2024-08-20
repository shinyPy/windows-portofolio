// src/App.js
import React, { useState } from 'react';
import styled from 'styled-components';
import DesktopIcon from './components/icon/DesktopIcon';
import Taskbar from './components/Taskbar';
import FileExplorer from './components/windows/FileExplorer';
import initialFilesystem, { useFilesystem } from './utils/filesystem';

import backgroundImage from './assets/images/windows.jpg';
import folderIconSrc from './assets/icons/folder.png';
import Documents from './components/windows/Documents';
import FileExplorerIcon from './assets/icons/file-explorer.png';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${backgroundImage}) no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const DesktopContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  .desktop-icon {
    margin: 10px;
  }
`;

function App() {
  const { filesystem, findItemById } = useFilesystem(initialFilesystem);
  const [windows, setWindows] = useState([]);

  const openWindow = (title, iconSrc, Component, id, src = null) => {
    setWindows([...windows, { title, iconSrc, Component, id: Date.now(), windowId: id, src }]);
  };

  const onFileClick = (id) => {
    const clickedItem = findItemById(filesystem, id);
    if (clickedItem) {
      if (clickedItem.type === 'folder') {
        const existingWindow = windows.find(win => win.windowId === id);
        if (existingWindow) {
          // Bring the existing window to the front
          setWindows([...windows.filter(win => win.windowId !== id), existingWindow]);
        } else {
          openWindow(clickedItem.name, folderIconSrc, FileExplorer, id);
        }
      }
    }
  };

  const closeWindow = (id) => {
    setWindows(windows.filter(win => win.id !== id));
  };

  return (
    <AppContainer>
      <DesktopContainer className="desktop">
        <DesktopIcon
          className="desktop-icon"
          name="File Explorer"
          iconSrc={FileExplorerIcon}
          onDoubleClick={() => openWindow('File Explorer', folderIconSrc, FileExplorer, 1)}
        />
        <DesktopIcon
          className="desktop-icon"
          name="Documents"
          iconSrc={folderIconSrc}
          onDoubleClick={() => openWindow('Documents', folderIconSrc, Documents, 7)}
        />
        {/* Additional desktop icons */}
      </DesktopContainer>
      {windows.map((win) => (
        <win.Component
          key={win.id}
          title={win.title}
          iconSrc={win.iconSrc}
          onClose={() => closeWindow(win.id)}
          filesystem={filesystem}
          windowId={win.windowId}
          findItemById={findItemById}
          onFileClick={onFileClick}
          src={win.src} // Pass the src to the component
        />
      ))}
      <Taskbar windows={windows} />
    </AppContainer>
  );
}

export default App;