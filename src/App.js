// src/App.js
import React, { useState } from 'react';
import styled from 'styled-components';
import DesktopIcon from './components/icon/DesktopIcon';
import Taskbar from './components/Taskbar';
import FileExplorer from './components/windows/FileExplorer';
import initialFilesystem, { useFilesystem } from './utils/filesystem';

import backgroundImage from './assets/images/windows.jpg';
import folderIconSrc from './assets/icons/folder.png';
import FileExplorerIcon from './assets/icons/file-explorer.png';
import fileIconSrc from './assets/icons/file.png';
import exeIconSrc from './assets/icons/exeIcon.png';

import GlobalStyle from './globalStyle';
import PictureViewer from './components/windows/PictureViewer';
import VideoViewer from './components/windows/VideoViewer';

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
          setWindows([...windows.filter(win => win.windowId !== id), existingWindow]);
        } else {
          openWindow(clickedItem.name, folderIconSrc, FileExplorer, id);
        }
      } else if (clickedItem.type === 'file') {
        if (clickedItem.name.endsWith('.png') || clickedItem.name.endsWith('.jpg')) {
          openWindow(clickedItem.name, fileIconSrc, PictureViewer, id, clickedItem.src);
        } else if (clickedItem.name.endsWith('.mp4')) {
          openWindow(clickedItem.name, fileIconSrc, VideoViewer, id, clickedItem.src);
        } else {
          alert(`Opened file: ${clickedItem.name}`); // Replace with actual file handling
        }
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
      <GlobalStyle /> {/* Apply global styles */}
      <AppContainer>
        <DesktopContainer className="desktop">
          <DesktopIcon
            className="desktop-icon"
            name="File Explorer"
            iconSrc={FileExplorerIcon}
            onDoubleClick={() => openWindow('File Explorer', folderIconSrc, FileExplorer, 1)}
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
    </>
  );
}

export default App;
