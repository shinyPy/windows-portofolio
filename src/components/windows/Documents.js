// src/components/windows/Documents.js
import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { 
  ExplorerContainer, 
  ExplorerHeader, 
  ExplorerBody, 
  ExplorerTitle, 
  Breadcrumbs, 
  CloseButton, 
  ExplorerItem,
  BreadcrumbLink,
  FileViewer, 
} from '../style/DocumentsStyle';



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
    <Draggable handle=".explorer-header">
      <ExplorerContainer>
        <ExplorerHeader className="explorer-header">
          <ExplorerTitle>{title}</ExplorerTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ExplorerHeader>
        <ExplorerBody>
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
              <ExplorerItem key={item.id} onDoubleClick={() => updatePath(item.id)}>
                {item.type === 'folder' ? '📁' : '📄'} {item.name}
              </ExplorerItem>
            ))
          ) : (
            <div>No items</div>
          )}
        </ExplorerBody>
      </ExplorerContainer>
    </Draggable>
  );
}

export default Documents;
