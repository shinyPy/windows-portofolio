import React from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';

const MypcContainer = styled.div`
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

const MypcTitle = styled.div`
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

const MypcBody = styled.div`
  padding: 10px;
  height: 100%;
  background: #f3f3f3;
  overflow: auto;
  font-family: Arial, sans-serif;
`;

const MypcHeader = styled.div`
  background: #0078d4;
  color: white;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: move;
`;

const MypcIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 8px;
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

function Mypc({ title, iconSrc, onClose, filesystem, onFileClick }) {
  return (
    <Draggable handle=".mypc-header">
      <MypcContainer>
        <MypcHeader className="mypc-header">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <MypcIcon src={iconSrc} alt={`${title} icon`} />
            <MypcTitle>{title}</MypcTitle>
          </div>
          <CloseButton onClick={onClose}>×</CloseButton>
        </MypcHeader>
        <MypcBody>
          {filesystem && filesystem.map(item => (
            <FileExplorerItem key={item.id} onDoubleClick={() => onFileClick(item.id)}>
              {item.type === 'folder' ? '📁' : '📄'} {item.name}
            </FileExplorerItem>
          ))}
        </MypcBody>
      </MypcContainer>
    </Draggable>
  );
}

export default Mypc;