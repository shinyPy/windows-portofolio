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
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-2xl border-t border-gray-200 dark:border-gray-700 z-40 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-lg">🎵</span>
            </div>
            <span className="text-gray-900 dark:text-white font-semibold text-lg">Spotify Player</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Track Info Card */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
              <span className="text-white text-xl">♪</span>
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 dark:text-white font-semibold text-sm">{currentTrack.name}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-xs">{currentTrack.artist}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="h-2 bg-green-500 rounded-full transition-all duration-300"
                style={{ width: `${(currentTrack.progress / currentTrack.duration) * 100 || 0}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
              <span>{formatTime(currentTrack.progress)}</span>
              <span>{formatTime(currentTrack.duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-8">
            <button className="w-10 h-10 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 transition-colors">
              ⏮
            </button>
            <button
              onClick={togglePlay}
              className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white text-xl transition-colors shadow-lg"
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button className="w-10 h-10 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 transition-colors">
              ⏭
            </button>
          </div>
        </div>

        {/* Connection Status Card */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-200 dark:border-red-800">
          <div className="flex items-center justify-center mb-3">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            <span className="text-red-700 dark:text-red-400 text-sm font-medium">Not connected to Spotify</span>
          </div>
          <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl transition-colors text-sm font-medium shadow-lg">
            Connect to Spotify
          </button>

          {/* Instructions */}
          <div className="mt-3 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-xs">
              Connect your Spotify account to control playback
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSpotifyPlayer;
