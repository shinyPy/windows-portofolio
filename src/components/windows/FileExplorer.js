import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { 
  FileExplorerContainer, 
  FileExplorerHeader, 
  FileExplorerBody, 
  FileExplorerTitle, 
  Breadcrumbs, 
  CloseButton, 
  FileExplorerItem, 
  Icon 
} from '../style/FileExplorerStyle';

function FileExplorer({ title, iconSrc, filesystem, windowId, onClose, findItemById }) {
  const [currentPath, setCurrentPath] = useState([windowId]);

  const currentFolder = findItemById(filesystem, currentPath[currentPath.length - 1]);

  const updatePath = (id) => {
    setCurrentPath([...currentPath, id]);
  };

  const goToFolder = (id) => {
    setCurrentPath(currentPath.slice(0, currentPath.indexOf(id) + 1));
  };

  return (
    <Draggable handle=".fileExplorer-header">
      <FileExplorerContainer>
        <FileExplorerHeader className="fileExplorer-header">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Icon src={iconSrc} alt={`${title} icon`} />
            <FileExplorerTitle>{title}</FileExplorerTitle>
          </div>
          <CloseButton onClick={onClose}>×</CloseButton>
        </FileExplorerHeader>
        <FileExplorerBody>
          <Breadcrumbs>
            {currentPath.map((id, index) => {
              const folder = findItemById(filesystem, id);
              return (
                <span key={id}>
                  {index > 0 && ' > '}
                  <a onClick={() => goToFolder(id)}>{folder.name}</a>
                </span>
              );
            })}
          </Breadcrumbs>
          {currentFolder && currentFolder.contents ? (
            currentFolder.contents.map(item => (
              <FileExplorerItem key={item.id} onDoubleClick={() => updatePath(item.id)}>
                {item.type === 'folder' ? '📁' : '📄'} {item.name}
              </FileExplorerItem>
            ))
          ) : (
            <div>No items</div>
          )}
        </FileExplorerBody>
      </FileExplorerContainer>
    </Draggable>
  );
}

export default FileExplorer;
