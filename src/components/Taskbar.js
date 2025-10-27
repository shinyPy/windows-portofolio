import React, { useContext, useCallback, memo, useState } from "react";
import PropTypes from "prop-types";
import spotifyIcon from "../assets/icons/SpotifyIcon.png";
import { LanguageContext } from "../utils/LanguageContext";
import DateTimeDisplay from "./DateTimeDisplay";

/**
 * Taskbar component displays running applications and system controls
 * @param {Object} props - Component props
 * @param {Array} props.windows - Open windows
 * @param {boolean} props.isSpotifyOpen - Whether Spotify is open
 */
function Taskbar({ windows, isSpotifyOpen }) {
  const { language, setLanguage } = useContext(LanguageContext);

  /**
   * Toggle between available languages
   */
  const toggleLanguage = useCallback(() => {
    setLanguage(language === "en" ? "id" : "en");
  }, [language, setLanguage]);

  return (
    <div className="h-14 bg-gray-800 bg-opacity-90 backdrop-blur-md flex items-center px-4 shadow-lg fixed bottom-0 w-full z-50" role="navigation" aria-label="Application taskbar">
      <div className="flex items-center flex-grow justify-center overflow-x-auto font-mono space-x-4">
        {windows.map((win) => (
          <TaskbarItem
            key={win.id}
            title={win.title}
            iconSrc={win.iconSrc}
          />
        ))}

        {isSpotifyOpen && (
          <TaskbarItem
            title="Spotify"
            iconSrc={spotifyIcon}
          />
        )}
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={toggleLanguage}
          className="text-white px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 shadow-md transition-all duration-200 hover:scale-105"
          aria-label={`Switch to ${language === "en" ? "Indonesian" : "English"} language`}
        >
          {language === "en" ? "EN" : "ID"}
        </button>
        <DateTimeDisplay />
      </div>
    </div>
  );
}

/**
 * Individual item in the taskbar
 */
const TaskbarItem = memo(({ title, iconSrc }) => (
  <div
    className="bg-gray-200 bg-opacity-80 px-7 py-2 rounded-lg flex items-center cursor-pointer shadow-md hover:bg-gray-400 transition-all"
    role="button"
    tabIndex="0"
    aria-label={`Switch to ${title}`}
  >
    <img
      src={iconSrc}
      alt={`${title} icon`}
      className="w-6 h-6 mr-2"
    />
    {title}
  </div>
));

TaskbarItem.propTypes = {
  title: PropTypes.string.isRequired,
  iconSrc: PropTypes.string.isRequired,
};

Taskbar.propTypes = {
  windows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      iconSrc: PropTypes.string.isRequired,
    })
  ).isRequired,
  isSpotifyOpen: PropTypes.bool,
};

Taskbar.defaultProps = {
  isSpotifyOpen: false,
};

export default memo(Taskbar);
