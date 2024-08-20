import React from 'react';
import startIcon from '../assets/icons/windows-icon.png'; // Path to your Start icon

function Taskbar({ windows }) {
  return (
    <div className="h-10 bg-[#1c1c1c] flex items-center px-2.5 justify-between shadow-md absolute bottom-0 w-full">
      <div className="flex items-center">
        <div className="bg-[#2d2d2d] px-2 py-1 rounded flex items-center cursor-pointer mr-2.5 shadow-inner hover:bg-[#444444]">
          <img src={startIcon} alt="Start" className="w-5 h-5 mr-2" />
          <span className="text-white text-sm font-medium">Start</span>
        </div>
        {windows.map((win) => (
          <div
            key={win.id}
            className="text-white px-2.5 py-1 flex items-center bg-[#2d2d2d] rounded mr-1.25 shadow-inner cursor-pointer hover:bg-[#444444]"
          >
            <img src={win.iconSrc} alt={`${win.title} icon`} className="w-4 h-4 mr-2" />
            {win.title}
          </div>
        ))}
      </div>
      <div className="flex items-center">
        {/* Add system tray icons here */}
      </div>
    </div>
  );
}

export default Taskbar;

// const TaskbarContainer = styled.div`
//   height: 40px;
//   background: #1c1c1c;
//   display: flex;
//   align-items: center;
//   padding: 0 10px;
//   justify-content: space-between;
//   box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.5);
//   position: absolute;
//   bottom: 0;
//   width: 100%;
// `;

// const TaskbarLeft = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const TaskbarRight = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const StartButton = styled.div`
//   background: #2d2d2d;
//   padding: 5px 8px;
//   border-radius: 4px;
//   display: flex;
//   align-items: center;
//   cursor: pointer;
//   margin-right: 10px;
//   box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);

//   &:hover {
//     background: #444444;
//   }

//   img {
//     width: 20px;
//     height: 20px;
//     margin-right: 8px;
//   }

//   span {
//     color: white;
//     font-size: 14px;
//     font-weight: 500;
//   }
// `;

// const TaskbarItem = styled.div`
//   color: white;
//   padding: 5px 10px;
//   display: flex;
//   align-items: center;
//   background: #2d2d2d;
//   border-radius: 4px;
//   margin-right: 5px;
//   box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
//   min-width: 120px;
//   cursor: pointer;

//   &:hover {
//     background: #444444;
//   }

//   img {
//     width: 16px;
//     height: 16px;
//     margin-right: 8px;
//   }
// `;