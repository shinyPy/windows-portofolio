import React, { useState } from 'react';

const MobileSpotifyPlayer = ({ onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({
    name: 'No track playing',
    artist: 'Connect to Spotify',
    album: '',
    progress: 0,
    duration: 0
  });

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-white/20 z-40 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="text-green-400 text-lg mr-2">🎵</span>
            <span className="text-white font-semibold">Spotify Player</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl"
          >
            ×
          </button>
        </div>

        {/* Track Info */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4 border border-white/20">
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white text-xl">♪</span>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold text-sm">{currentTrack.name}</h3>
              <p className="text-white/60 text-xs">{currentTrack.artist}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-3">
            <div className="w-full bg-white/20 rounded-full h-1">
              <div
                className="h-1 bg-green-500 rounded-full transition-all duration-300"
                style={{ width: `${(currentTrack.progress / currentTrack.duration) * 100 || 0}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-white/60 mt-1">
              <span>{formatTime(currentTrack.progress)}</span>
              <span>{formatTime(currentTrack.duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-6">
            <button className="text-white/60 hover:text-white text-xl">
              ⏮
            </button>
            <button
              onClick={togglePlay}
              className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white text-xl transition-colors"
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button className="text-white/60 hover:text-white text-xl">
              ⏭
            </button>
          </div>
        </div>

        {/* Connection Status */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
          <div className="flex items-center justify-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            <span className="text-white/80 text-sm">Not connected to Spotify</span>
          </div>
          <button className="w-full mt-3 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors text-sm">
            Connect to Spotify
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-4 text-center">
          <p className="text-white/60 text-xs">
            Connect your Spotify account to control playback
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileSpotifyPlayer;
