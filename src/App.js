import React, { useState } from 'react';
import styled from 'styled-components';
import DesktopIcon from './components/icon/DesktopIcon';
import Taskbar from './components/Taskbar';
// import MyPC from './components/windows/MyPC';
import FileExplorer from './components/windows/FileExplorer';
import { useFilesystem } from './utils/filesystem';
import backgroundImage from './assets/images/windows.jpg';
// import mypcIcon from './assets/icons/mypc.png';
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

function App() {
  const { filesystem, addFileOrFolder, deleteItem, findItemById } = useFilesystem();
  const [windows, setWindows] = useState([]);

  const openWindow = (title, iconSrc, Component, id) => {
    setWindows([...windows, { title, iconSrc, Component, id: Date.now(), windowId: id }]);
  };

  const onFileClick = (id) => {
    const clickedItem = findItemById(filesystem, id);
    if (clickedItem && clickedItem.type === 'folder') {
      const existingWindow = windows.find(win => win.windowId === id);
      if (existingWindow) {
        // Bring the existing window to the front
        setWindows([...windows.filter(win => win.windowId !== id), existingWindow]);
      } else {
        openWindow(clickedItem.name, folderIconSrc, FileExplorer, id);
      }
    }
  };

  const closeWindow = (id) => {
    setWindows(windows.filter(win => win.id !== id));
  };

  return (
    <AppContainer>
      <div className="desktop">
      {/* <DesktopIcon
          name="My Computer"
          iconSrc={mypcIcon}
          onDoubleClick={() => openWindow('My Computer', mypcIcon, MyPC, 11)}
        /> */}
          <DesktopIcon
          name="File Explorer"
          iconSrc={FileExplorerIcon}
          onDoubleClick={() => openWindow('File Explorer', folderIconSrc, FileExplorer, 1)}
        />
        <DesktopIcon
          name="Documents"
          iconSrc={folderIconSrc}
          onDoubleClick={() => openWindow('Documents', folderIconSrc, Documents, 7)}
        />
        {/* Additional desktop icons */}
      </div>
      {windows.map((win) => (
        <win.Component
          key={win.id}
          title={win.title}
          iconSrc={win.iconSrc}
          onClose={() => closeWindow(win.id)}
          filesystem={filesystem}
          windowId={win.windowId}
          findItemById={findItemById}
        />
      ))}
      <Taskbar windows={windows} />
    </AppContainer>
  );
}

export default App;