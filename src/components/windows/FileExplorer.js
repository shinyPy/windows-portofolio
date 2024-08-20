// src/components/windows/FileExplorer.js
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
  Icon,
  BreadcrumbLink,
  FileViewer,
} from '../style/FileExplorerStyle';

function FileExplorer({ title, iconSrc, filesystem, windowId, onClose, findItemById }) {
  const [currentPath, setCurrentPath] = useState([windowId]);
  const [viewingFile, setViewingFile] = useState(null);

  const currentFolder = findItemById(filesystem, currentPath[currentPath.length - 1]);

  const getFullPath = () => {
    return currentPath.map((id) => findItemById(filesystem, id).name).join(' > ');
  };

  const updatePath = (id) => {
    const clickedItem = findItemById(filesystem, id);
    if (clickedItem.type === 'folder') {
      setCurrentPath([...currentPath, id]);
    } else if (clickedItem.type === 'file') {
      setViewingFile(clickedItem);
    }
  };

  const goToFolder = (id) => {
    setCurrentPath(currentPath.slice(0, currentPath.indexOf(id) + 1));
  };

  const closeViewer = () => {
    setViewingFile(null);
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
          {viewingFile ? (
            <FileViewer>
              <button onClick={closeViewer}>Close</button>
              {viewingFile.name.endsWith('.png') || viewingFile.name.endsWith('.jpg') ? (
                <img src={viewingFile.src} alt={viewingFile.name} />
              ) : viewingFile.name.endsWith('.mp4') ? (
                <video controls>
                  <source src={viewingFile.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div>Unsupported file format</div>
              )}
            </FileViewer>
          ) : (
            <>
              <Breadcrumbs>
                {currentPath.map((id, index) => {
                  const folder = findItemById(filesystem, id);
                  return (
                    <span key={id}>
                      {index > 0 && ' > '}
                      <BreadcrumbLink onClick={() => goToFolder(id)}>
                        {folder.name === '/' ? 'Root' : folder.name}
                      </BreadcrumbLink>
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
            </>
          )}
        </FileExplorerBody>
      </FileExplorerContainer>
    </Draggable>
  );
}

export default FileExplorer;
