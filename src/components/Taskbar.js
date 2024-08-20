import React from 'react';
import styled from 'styled-components';
import startIcon from '../assets/icons/windows-icon.png'; // Path to your Start icon

const TaskbarContainer = styled.div`
  height: 40px;
  background: #1c1c1c;
  display: flex;
  align-items: center;
  padding: 0 10px;
  justify-content: space-between;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.5);
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const TaskbarLeft = styled.div`
  display: flex;
  align-items: center;
`;

const TaskbarRight = styled.div`
  display: flex;
  align-items: center;
`;

const StartButton = styled.div`
  background: #2d2d2d;
  padding: 5px 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);

  &:hover {
    background: #444444;
  }

  img {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }

  span {
    color: white;
    font-size: 14px;
    font-weight: 500;
  }
`;

const TaskbarItem = styled.div`
  color: white;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  background: #2d2d2d;
  border-radius: 4px;
  margin-right: 5px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
  min-width: 120px;
  cursor: pointer;

  &:hover {
    background: #444444;
  }

  img {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
`;

function Taskbar({ windows }) {
  return (
    <TaskbarContainer>
      <TaskbarLeft>
        <StartButton>
          <img src={startIcon} alt="Start" />
          <span>Start</span>
        </StartButton>
        {windows.map((win) => (
          <TaskbarItem key={win.id}>
            <img src={win.iconSrc} alt={`${win.title} icon`} />
            {win.title}
          </TaskbarItem>
        ))}
      </TaskbarLeft>
      <TaskbarRight>
        {/* Add system tray icons here */}
      </TaskbarRight>
    </TaskbarContainer>
  );
}

export default Taskbar;
