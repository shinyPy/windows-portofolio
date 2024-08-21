import React from 'react';
import terminalIcon from '../assets/icons/exeIcon.png'; 

function Taskbar({ windows }) {
  return (
    <div className="h-10 bg-[#1c1c1c] flex items-center px-2.5 overflow-x-scroll justify-between shadow-md fixed bottom-0 w-full z-50">
      <div className="flex items-center flex-grow justify-center overflow-x-scroll scrollbar-hide font-mono">
        <div className="bg-[#2d2d2d] px-2 py-1 rounded flex items-center cursor-pointer mr-2.5 shadow-inner hover:bg-[#444444]">
          <img src={terminalIcon} alt="Terminal" className="w-5 h-5 mr-2" />
          <span className="text-white text-sm font-medium">Terminal</span>
        </div>
        {windows.map((win) => (
          <div
            key={win.id}
            className="bg-[#2d2d2d] text-white text-sm font-medium px-2 py-1 rounded overflow-x-scroll flex items-center cursor-pointer mr-2.5 shadow-inner hover:bg-[#444444]"
          >
            <img src={win.iconSrc} alt={`${win.title} icon`} className="w-4 h-4 mr-2" />
            {win.title}
          </div>
        ))}
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