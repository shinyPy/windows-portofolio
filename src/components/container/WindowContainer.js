// src/components/WindowContainer.js
import React from 'react';
import FileExplorer from '../windows/FileExplorer';

const WindowContainer = ({ windows, closeWindow, filesystem, findItemById }) => {
  return (
    <>
      {windows.map(win => (
        <FileExplorer
          key={win.id}
          title={win.title}
          iconSrc={win.iconSrc}
          onClose={() => closeWindow(win.id)}
          filesystem={filesystem}
          windowId={win.windowId}
          findItemById={findItemById}
          viewingFile={win.viewingFile}
          fullPath={win.fullPath}
          showCloseButton={win.showCloseButton} // Pass the showCloseButton prop
        />
      ))}
    </>
  );
};


export default WindowContainer;