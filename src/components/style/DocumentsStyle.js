// src/components/windows/DocumentsStyledComponents.js
import styled from 'styled-components';

export const ExplorerContainer = styled.div`
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

export const ExplorerHeader = styled.div`
  background: #0078d4;
  color: white;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: move;
`;

export const ExplorerBody = styled.div`
  padding: 10px;
  height: 100%;
  background: #f3f3f3;
  overflow: auto;
  font-family: Arial, sans-serif;
`;

export const ExplorerTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

export const Breadcrumbs = styled.div`
  margin-bottom: 10px;
  font-size: 14px;
  a {
    margin-right: 5px;
    color: #0078d4;
    cursor: pointer;
  }
  a:last-child {
    color: black;
    cursor: default;
  }
`;

export const CloseButton = styled.button`
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

export const ExplorerItem = styled.div`
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
