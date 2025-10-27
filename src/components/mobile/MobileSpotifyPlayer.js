import React from 'react';

const MobileSpotifyPlayer = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col animate-slide-up-screen">
      {/* Header */}
      <div className="bg-gray-800 px-4 h-14 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center flex-1">
          <span className="text-green-500 text-xl mr-3">🎵</span>
          <span className="text-white text-lg font-semibold font-mono">Spotify</span>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
          aria-label="Close Spotify player"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Spotify Embed */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <iframe
              src="https://open.spotify.com/embed/playlist/0or34uqY4LUkkBxaBoCBjM?utm_source=generator"
              title="Spotify Playlist"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded"
            ></iframe>
          </div>

          {/* Info Card */}
          <div className="bg-gray-800 rounded-lg p-5 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
              ♪
            </div>
            <h3 className="text-white text-lg font-bold mb-2">My Playlist</h3>
            <p className="text-gray-400 text-sm">
              Listen to my favorite tracks and discover my music taste
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSpotifyPlayer;
