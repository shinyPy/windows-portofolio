import React, { useState, useEffect } from 'react';
import FileExplorer from '../windows/FileExplorer';
import '../../assets/css/animations.css'; // Import CSS for animations

const WindowContainer = ({ windows, closeWindow, filesystem, findItemById, onExeClick }) => {
  const [closingWindows, setClosingWindows] = useState([]);

  const handleClose = (id) => {
    setClosingWindows([...closingWindows, id]);
    setTimeout(() => closeWindow(id), 200); // Delay closing the window to allow animation
  };

  useEffect(() => {
    // Remove closing windows from the list after they are closed
    if (closingWindows.length > 0) {
      setClosingWindows(closingWindows.filter(id => !windows.find(win => win.id === id)));
    }
  }, [windows, closingWindows]);

  return (
    <>
      {windows.map(win => (
        <div
          key={win.id}
          className={`window-container ${closingWindows.includes(win.id) ? 'closing' : ''}`}
        >
          <div className="window-content">
            <FileExplorer
              isExeWindow={window.type === 'exe'}
              onExeClick={onExeClick}
              {...win}
              onClose={() => handleClose(win.id)}
              filesystem={filesystem}
              findItemById={findItemById}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default WindowContainer;
