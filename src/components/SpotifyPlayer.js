import React from "react";
import { Rnd } from "react-rnd";

const SpotifyPlayer = ({ onClose }) => {
  return (
    <Rnd
      default={{
        x: 1500,
        y: 45,
        width: 400,
        height: 225,
      }}
      minWidth={400}
      minHeight={225}
      bounds="parent"
      className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
      enableResizing={false}
    >
      <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-2">
        <h3 className="text-gray-800 text-lg font-semibold font-mono">Spotify Playlist</h3>
        <div className="flex space-x-2">
        <span className="block w-3 h-3 bg-yellow-500 rounded-full cursor-pointer"></span>
          <span className="block w-3 h-3 bg-red-500 rounded-full cursor-pointer" onClick={onClose}></span>
        </div>
      </div>
      <iframe
        src="https://open.spotify.com/embed/playlist/0TrcprHEGEVzpNzZO3tGfO?utm_source=generator"
        title="Spotify Playlist"
        width="100%"
        height="152"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="rounded-lg"
      ></iframe>
    </Rnd>
  );
};

export default SpotifyPlayer;
