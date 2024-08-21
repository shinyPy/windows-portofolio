import React from 'react';
import folderIconSrc from '../../assets/icons/folder.png';
import fileIconSrc from '../../assets/icons/file.png';
import exeIconSrc from '../../assets/icons/exeIcon.png';
import FileExplorerIcon from '../../assets/icons/file-explorer.png';
import DesktopIcon from '../icon/DesktopIcon';

const DesktopIconContainer = ({ filesystem, onFileClick, openWindow }) => {
  return (
    <div className="desktop">
      <DesktopIcon
            className="desktop-icon"
            name="File Explorer"
            iconSrc={FileExplorerIcon}
            onDoubleClick={() => openWindow('File Explorer', 1)}
          />
      {filesystem.map(item => (
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
    </div>
  );
};

export default DesktopIconContainer;