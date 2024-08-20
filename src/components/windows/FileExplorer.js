import React from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';

const FileExplorerContainer = styled.div`
  width: 600px;
  height: 400px;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  position: absolute;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const FileExplorerHeader = styled.div`
  background: #0078d4;
  color: white;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: move; /* Add this cursor style to indicate it's draggable */
`;

const FileExplorerBody = styled.div`
  padding: 10px;
  height: 100%;
  background: #f3f3f3;
  overflow: auto;
  font-family: Arial, sans-serif;
`;

const FileExplorerTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding: 0 5px;
  &:hover {
    color: #ff5c5c;
  }
`;

const FileExplorerItem = styled.div`
  margin: 5px 0;
  padding: 5px;
  background: #fff;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;

function FileExplorer({ title, filesystem, windowId, onClose, onFileClick, addFileOrFolder, deleteItem }) {
  const currentFolder = filesystem.find(item => item.id === windowId);

  return (
    <Draggable handle=".fileExplorer-header">
      <FileExplorerContainer>
        <FileExplorerHeader className="fileExplorer-header">
          <FileExplorerTitle>{title}</FileExplorerTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </FileExplorerHeader>
        <FileExplorerBody>
          {currentFolder && currentFolder.contents ? (
            currentFolder.contents.map(item => (
              <FileExplorerItem key={item.id} onDoubleClick={() => onFileClick(item.id)}>
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