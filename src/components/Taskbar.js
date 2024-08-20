import React from 'react';
import styled from 'styled-components';
import startIcon from '../assets/icons/windows-icon.png'; // Path to your Start icon

const TaskbarItem = styled.div`
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 4px;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const TaskbarContainer = styled.div`
  height: 40px;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  padding: 0 10px;
  justify-content: space-between;
`;

const TaskbarLeft = styled.div`
  display: flex;
  align-items: center;
`;

const TaskbarRight = styled.div`
  display: flex;
  align-items: center;
`;



const StartButton = styled(TaskbarItem)`
  background: rgba(255, 255, 255, 0.2);
  padding: 5px;
  border-radius: 4px;
  margin-right: 10px;

  &:hover {
    background: rgba(255, 255, 255, 0.4);
  }

  img {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
`;

const TaskbarIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;



// Taskbar component code
function Taskbar({ windows }) {
  return (
    <TaskbarContainer>
      <TaskbarLeft>
        <StartButton>
          <img src={startIcon} alt="Start" />
          Start
        </StartButton>
        {windows.map((win) => (
          <TaskbarItem key={win.id}>
            <TaskbarIcon src={win.iconSrc} alt={`${win.title} icon`} />
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