// src/components/windows/Documents.js
import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { 
  WindowContainer, 
  WindowHeader, 
  WindowBody, 
  WindowTitle, 
  Breadcrumbs, 
  CloseButton, 
  WindowItem,
  BreadcrumbLink,
  // FileViewer, 
} from '../style/WindowStyle';



function Documents({ title, filesystem, windowId, onClose, findItemById }) {
  const [currentPath, setCurrentPath] = useState([windowId]);

  const currentFolder = findItemById(filesystem, currentPath[currentPath.length - 1]);

  const updatePath = (id) => {
    setCurrentPath([...currentPath, id]);
  };

  const goToFolder = (id) => {
    setCurrentPath(currentPath.slice(0, currentPath.indexOf(id) + 1));
  };

  return (
    <Draggable handle=".window-header">
      <WindowContainer>
        <WindowHeader className="window-header">
          <WindowTitle>{title}</WindowTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </WindowHeader>
        <WindowBody>
        <Breadcrumbs>
          {currentPath.map((id, index) => (
            <span key={id}>
              {index > 0 && ' > '}
              <BreadcrumbLink onClick={() => goToFolder(id)}>
                {findItemById(filesystem, id).name}
              </BreadcrumbLink>
            </span>
          ))}
        </Breadcrumbs>
          {currentFolder && currentFolder.contents ? (
            currentFolder.contents.map(item => (
              <WindowItem key={item.id} onDoubleClick={() => updatePath(item.id)}>
                {item.type === 'folder' ? '📁' : '📄'} {item.name}
              </WindowItem>
            ))
          ) : (
            <div>No items</div>
          )}
        </WindowBody>
      </WindowContainer>
    </Draggable>
  );
}

export default Documents;
