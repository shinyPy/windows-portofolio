import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { 
  MypcContainer, 
  MypcTitle, 
  CloseButton, 
  MypcBody, 
  MypcHeader, 
  Breadcrumbs, 
  Icon, 
  FileExplorerItem 
} from '../style/MyPC';

function Mypc({ title, iconSrc, onClose, filesystem, findItemById, onFileClick }) {
  const [currentPath, setCurrentPath] = useState([1]); // Start with root folder id

  const currentFolder = findItemById(filesystem, currentPath[currentPath.length - 1]);

  const updatePath = (id) => {
    setCurrentPath([...currentPath, id]);
  };

  const goToFolder = (id) => {
    setCurrentPath(currentPath.slice(0, currentPath.indexOf(id) + 1));
  };

  return (
    <Draggable handle=".mypc-header">
      <MypcContainer>
        <MypcHeader className="mypc-header">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Icon src={iconSrc} alt={`${title} icon`} />
            <MypcTitle>{title}</MypcTitle>
          </div>
          <CloseButton onClick={onClose}>×</CloseButton>
        </MypcHeader>
        <MypcBody>
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
        </MypcBody>
      </MypcContainer>
    </Draggable>
  );
}

export default Mypc;
