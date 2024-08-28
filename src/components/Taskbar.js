import React, { useContext } from "react";
import terminalIcon from "../assets/icons/exeIcon.png";
import { LanguageContext } from "../utils/LanguageContext";
import DateTimeDisplay from "./DateTimeDisplay";

function Taskbar({ windows }) {
  const { language, setLanguage } = useContext(LanguageContext); // Get the current language and setter from context

  // Function to toggle language
  const toggleLanguage = () => {
    setLanguage(language === "en" ? "id" : "en");
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
      <div className="flex items-center space-x-4">
        {/* Language Switcher Button */}
        <button
          onClick={toggleLanguage}
          className="text-gray-800 px-4 py-2 rounded-lg bg-gray-200 bg-opacity-80 hover:bg-gray-400 shadow-md transition-all duration-200"
        >
          {language === "en" ? "EN" : "ID"}
        </button>
        {/* Date and Time Display */}
        <DateTimeDisplay /> {/* Include the DateTimeDisplay component */}
      </div>
    </div>
  );
}

export default Taskbar;
