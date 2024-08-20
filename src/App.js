import React, { useState } from 'react';
import styled from 'styled-components';

import DesktopIcon from './components/icon/DesktopIcon';
import Taskbar from './components/Taskbar';
import MyPC from './components/windows/MyPC';
import FileExplorer from './components/windows/FileExplorer';
import { useFilesystem } from './utils/filesystem'; // Import the filesystem hook

import backgroundImage from './assets/images/rawr.jpg';
import mypcIcon from './assets/icons/mypc.png';
import folderIconSrc from './assets/icons/folder.png';

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

  const openWindow = (title, iconSrc, id) => {
    setWindows([...windows, { title, iconSrc, id: Date.now(), windowId: id }]);
  };

  const onFileClick = (id) => {
    const clickedItem = findItemById(filesystem, id);
    if (clickedItem && clickedItem.type === 'folder') {
      openWindow(clickedItem.name, folderIconSrc, id);
    }
  };

  const closeWindow = (id) => {
    setWindows(windows.filter(win => win.id !== id));
  };

  return (
    <AppContainer>
      <div className="desktop">
        <DesktopIcon
          name="My Computer"
          iconSrc={mypcIcon}
          onDoubleClick={() => openWindow('My Computer', mypcIcon)}
        />
        <DesktopIcon
          name="File Explorer"
          iconSrc={folderIconSrc}
          onDoubleClick={() => onFileClick(1)} // 'Documents' folder id
        />
        {/* Additional desktop icons */}
      </div>
      {windows.map((win) => (
        win.title === 'My Computer' ? (
          <MyPC
            key={win.id}
            title={win.title}
            iconSrc={win.iconSrc}
            onClose={() => closeWindow(win.id)}
            filesystem={filesystem} // Pass filesystem to MyPC
            onFileClick={onFileClick} // Pass onFileClick if necessary
          />
        ) : (
          <FileExplorer
            key={win.id}
            title={win.title}
            filesystem={filesystem}
            windowId={win.windowId}
            onClose={() => closeWindow(win.id)}
            onFileClick={onFileClick}
            addFileOrFolder={addFileOrFolder}
            deleteItem={deleteItem}
          />
        )
      ))}
      <Taskbar windows={windows} />
    </AppContainer>
  );
}

export default App;