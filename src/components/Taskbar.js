import React, { useContext } from "react";
import terminalIcon from "../assets/icons/exeIcon.png";
import { LanguageContext } from "../utils/LanguageContext"; // Import the LanguageContext

function Taskbar({ windows }) {
  const { language, setLanguage } = useContext(LanguageContext); // Get the current language and setter from context

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "id" : "en"); // Toggle between English and Indonesian
  };

  return (
    <div className="h-14 bg-white bg-opacity-80 backdrop-blur-md flex items-center px-4 shadow-lg fixed bottom-0 w-full z-50">
      <div className="flex items-center flex-grow justify-center overflow-x-auto font-mono space-x-4">
        <div className="bg-gray-200 bg-opacity-80 px-7 py-2 rounded-lg flex items-center cursor-pointer shadow-md hover:bg-gray-400 transition-all">
          <img src={terminalIcon} alt="Terminal" className="w-6 h-6 mr-2" />
          <span className="text-gray-800 text-sm font-medium">Terminal</span>
        </div>
        {windows.map((win) => (
          <div
            key={win.id}
            className="bg-gray-200 bg-opacity-80 px-7 py-2 rounded-lg flex items-center cursor-pointer shadow-md hover:bg-gray-400 transition-all"
          >
            <img
              src={win.iconSrc}
              alt={`${win.title} icon`}
              className="w-6 h-6 mr-2"
            />
            {win.title}
          </div>
        ))}
      </div>
      <div className="flex items-center">
        {/* Language Switcher Button */}
        <button
          onClick={toggleLanguage}
          className="text-gray-800 px-4 py-2 rounded-lg bg-gray-200 bg-opacity-80 hover:bg-gray-400 shadow-md transition-all duration-200"
        >
          {language === "en" ? "EN" : "ID"}
        </button>
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
