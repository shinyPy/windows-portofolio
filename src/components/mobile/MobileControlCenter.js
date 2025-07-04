import React from 'react';
import { useLanguage } from '../../utils/LanguageContext';

const MobileControlCenter = ({ isOpen, onClose, onOpenSpotify }) => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'id' : 'en');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Control Center */}
      <div className="fixed top-0 left-0 right-0 z-50 transform transition-transform duration-300 ease-out">
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 mx-4 mt-16 rounded-2xl shadow-2xl">

          {/* Control Center Header */}
          <div className="p-4 border-b border-gray-200/30 dark:border-gray-700/30">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Control Center</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-200/80 dark:bg-gray-700/80 flex items-center justify-center"
              >
                <span className="text-gray-600 dark:text-gray-300 text-sm">×</span>
              </button>
            </div>
          </div>

          {/* Controls Grid */}
          <div className="p-4 space-y-4">

            {/* Connectivity & Settings Row */}
            <div className="grid grid-cols-4 gap-3">
              {/* Airplane Mode */}
              <button className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-2xl flex flex-col items-center justify-center p-3 opacity-50">
                <span className="text-2xl mb-1">✈️</span>
                <span className="text-xs text-gray-600 dark:text-gray-400">Airplane</span>
              </button>

              {/* Wi-Fi */}
              <button className="aspect-square bg-blue-500 rounded-2xl flex flex-col items-center justify-center p-3">
                <span className="text-white text-2xl mb-1">📶</span>
                <span className="text-xs text-white">Wi-Fi</span>
              </button>

              {/* Bluetooth */}
              <button className="aspect-square bg-blue-500 rounded-2xl flex flex-col items-center justify-center p-3">
                <span className="text-white text-2xl mb-1">📘</span>
                <span className="text-xs text-white">Bluetooth</span>
              </button>

              {/* Cellular */}
              <button className="aspect-square bg-green-500 rounded-2xl flex flex-col items-center justify-center p-3">
                <span className="text-white text-2xl mb-1">📱</span>
                <span className="text-xs text-white">Cellular</span>
              </button>
            </div>

            {/* Music Player */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-900 dark:text-white">Now Playing</span>
                <button
                  onClick={onOpenSpotify}
                  className="text-xs text-blue-500 dark:text-blue-400"
                >
                  Open
                </button>
              </div>

              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-lg">♪</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">No music playing</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Connect to Spotify</p>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-6">
                <button className="text-gray-400 text-lg">⏮</button>
                <button className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 dark:text-gray-300">▶</span>
                </button>
                <button className="text-gray-400 text-lg">⏭</button>
              </div>
            </div>

            {/* Utilities Row */}
            <div className="grid grid-cols-4 gap-3">
              {/* Flashlight */}
              <button className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-2xl flex flex-col items-center justify-center p-3 opacity-50">
                <span className="text-2xl mb-1">🔦</span>
                <span className="text-xs text-gray-600 dark:text-gray-400">Flashlight</span>
              </button>

              {/* Timer */}
              <button className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-2xl flex flex-col items-center justify-center p-3 opacity-50">
                <span className="text-2xl mb-1">⏰</span>
                <span className="text-xs text-gray-600 dark:text-gray-400">Timer</span>
              </button>

              {/* Calculator */}
              <button className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-2xl flex flex-col items-center justify-center p-3 opacity-50">
                <span className="text-2xl mb-1">🔢</span>
                <span className="text-xs text-gray-600 dark:text-gray-400">Calculator</span>
              </button>

              {/* Language Switch */}
              <button
                onClick={toggleLanguage}
                className="aspect-square bg-indigo-500 rounded-2xl flex flex-col items-center justify-center p-3"
              >
                <span className="text-white text-2xl mb-1">🌐</span>
                <span className="text-xs text-white">{language === 'en' ? 'EN' : 'ID'}</span>
              </button>
            </div>

            {/* Brightness & Volume Sliders */}
            <div className="space-y-3">
              {/* Brightness */}
              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">☀️</span>
                  <div className="flex-1 bg-gray-300 dark:bg-gray-600 rounded-full h-2">
                    <div className="bg-white w-3/4 h-2 rounded-full"></div>
                  </div>
                  <span className="text-lg">☀️</span>
                </div>
              </div>

              {/* Volume */}
              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">🔈</span>
                  <div className="flex-1 bg-gray-300 dark:bg-gray-600 rounded-full h-2">
                    <div className="bg-white w-2/3 h-2 rounded-full"></div>
                  </div>
                  <span className="text-lg">🔊</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileControlCenter;
