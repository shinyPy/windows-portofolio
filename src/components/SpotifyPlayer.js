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
      className="bg-gray-200 rounded-2xl shadow-lg p-4"
      enableResizing={false}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-black font-mono text-lg m-0">Spotify Playlist</h3>
        <div className="flex space-x-1 ml-auto">
          <span className="block w-3 h-3 bg-yellow-500 rounded-full"></span>

          <span
            onClick={onClose}
            className="block w-3 h-3 bg-red-500 rounded-full cursor-pointer"
          ></span>
        </div>
      </div>
      <iframe
        src="https://open.spotify.com/embed/playlist/0TrcprHEGEVzpNzZO3tGfO?utm_source=generator"
        title="Spotify Playlist"
        width="100%"
        height="152"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="rounded-lg mt-2"
      ></iframe>
    </Rnd>
  );
};

export default SpotifyPlayer;
