import React, { useState, useCallback } from "react";
import { Rnd } from "react-rnd";

const SpotifyPlayer = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  const handleMinimize = useCallback(() => {
    console.log('Minimize clicked');
  }, []);

  const handleMaximizeToggle = useCallback(() => {
    setIsMaximized(prev => !prev);
  }, []);

  return (
    <Rnd
      default={{
        x: 1000,
        y: 45,
        width: 400,
        height: 225,
      }}
      minWidth={400}
      minHeight={225}
      bounds="parent"
      enableResizing={false}
    >
      <div className={`bg-white rounded-lg shadow-md border border-gray-200 w-full h-full flex flex-col window-container ${isClosing ? "closing" : ""}`}>
        <div className="bg-gray-200 text-gray-900 flex justify-between items-center rounded-t-lg cursor-move">
          <div className="flex-1 text-center text-sm font-semibold font-mono p-2">
            Spotify Playlist
          </div>
          <div className="flex h-full ml-auto">
            {/* Minimize Button */}
            <button
              onClick={handleMinimize}
              className="
                w-11 h-full flex items-center justify-center
                hover:bg-gray-300 transition-colors
                text-gray-700 text-xl font-light
              "
              aria-label="Minimize window"
              title="Minimize"
            >
              −
            </button>

            {/* Maximize/Restore Button */}
            <button
              onClick={handleMaximizeToggle}
              className="
                w-11 h-full flex items-center justify-center
                hover:bg-gray-300 transition-colors
                text-gray-700
              "
              aria-label={isMaximized ? "Restore window" : "Maximize window"}
              title={isMaximized ? "Restore" : "Maximize"}
            >
              {isMaximized ? '❐' : '☐'}
            </button>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="
                w-11 h-full flex items-center justify-center
                hover:bg-red-600 hover:text-white
                transition-colors text-gray-700
              "
              aria-label="Close window"
              title="Close"
            >
              ✕
            </button>
          </div>
        </div>
        <div className="p-4 flex-1">
          <iframe
            src="https://open.spotify.com/embed/playlist/0or34uqY4LUkkBxaBoCBjM?utm_source=generator"
            title="Spotify Playlist"
            width="100%"
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-lg"
          ></iframe>
        </div>
      </div>
    </Rnd>
  );
};

export default SpotifyPlayer;
