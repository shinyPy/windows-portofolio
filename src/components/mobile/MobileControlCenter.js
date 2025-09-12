import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoAirplane, IoWifi, IoBluetooth, IoCellular, IoSunny, IoVolumeHigh, IoFlashlight, IoTimer, IoCalculator, IoCamera } from 'react-icons/io5';

const MobileControlCenter = ({ isOpen, onClose, onOpenSpotify }) => {
  const [isWifiOn, setIsWifiOn] = useState(true);
  const [isBluetoothOn, setIsBluetoothOn] = useState(true);
  const [brightness, setBrightness] = useState(75);
  const [volume, setVolume] = useState(66);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'id' : 'en');
  };

  const controlCenterVariants = {
    hidden: { y: '-100%', opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          <motion.div
            variants={controlCenterVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 right-0 z-50 p-4 pt-12"
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl p-4 space-y-4">

              {/* Connectivity & Music */}
              <div className="grid grid-cols-2 gap-4">
                {/* Connectivity */}
                <div className="bg-white/50 dark:bg-gray-700/50 rounded-2xl p-4 flex flex-wrap justify-center items-center gap-4">
                  <button className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-800 dark:text-white opacity-50"><IoAirplane size={24} /></button>
                  <button onClick={() => setIsWifiOn(!isWifiOn)} className={`w-12 h-12 rounded-full flex items-center justify-center ${isWifiOn ? 'bg-blue-500 text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white'}`}><IoWifi size={24} /></button>
                  <button onClick={() => setIsBluetoothOn(!isBluetoothOn)} className={`w-12 h-12 rounded-full flex items-center justify-center ${isBluetoothOn ? 'bg-blue-500 text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white'}`}><IoBluetooth size={24} /></button>
                  <button className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white"><IoCellular size={24} /></button>
                </div>

                {/* Music Player */}
                <div className="bg-white/50 dark:bg-gray-700/50 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Music</span>
                    <button onClick={onOpenSpotify} className="text-xs text-blue-500 dark:text-blue-400">Open</button>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">♪</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">Not Playing</h4>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sliders */}
              <div className="grid grid-cols-2 gap-4">
                {/* Brightness */}
                <div className="bg-white/50 dark:bg-gray-700/50 rounded-2xl p-4 flex items-center space-x-2">
                  <IoSunny className="text-gray-600 dark:text-gray-300" />
                  <input type="range" min="0" max="100" value={brightness} onChange={(e) => setBrightness(e.target.value)} className="w-full" />
                </div>
                {/* Volume */}
                <div className="bg-white/50 dark:bg-gray-700/50 rounded-2xl p-4 flex items-center space-x-2">
                  <IoVolumeHigh className="text-gray-600 dark:text-gray-300" />
                  <input type="range" min="0" max="100" value={volume} onChange={(e) => setVolume(e.target.value)} className="w-full" />
                </div>
              </div>

              {/* Utilities */}
              <div className="grid grid-cols-4 gap-4">
                <button className="aspect-square bg-white/50 dark:bg-gray-700/50 rounded-2xl flex flex-col items-center justify-center p-2 opacity-50">
                  <IoFlashlight size={24} className="text-gray-800 dark:text-white mb-1" />
                  <span className="text-xs text-gray-700 dark:text-gray-200">Flashlight</span>
                </button>
                <button className="aspect-square bg-white/50 dark:bg-gray-700/50 rounded-2xl flex flex-col items-center justify-center p-2 opacity-50">
                  <IoTimer size={24} className="text-gray-800 dark:text-white mb-1" />
                  <span className="text-xs text-gray-700 dark:text-gray-200">Timer</span>
                </button>
                <button className="aspect-square bg-white/50 dark:bg-gray-700/50 rounded-2xl flex flex-col items-center justify-center p-2 opacity-50">
                  <IoCalculator size={24} className="text-gray-800 dark:text-white mb-1" />
                  <span className="text-xs text-gray-700 dark:text-gray-200">Calculator</span>
                </button>
                <button className="aspect-square bg-white/50 dark:bg-gray-700/50 rounded-2xl flex flex-col items-center justify-center p-2 opacity-50">
                  <IoCamera size={24} className="text-gray-800 dark:text-white mb-1" />
                  <span className="text-xs text-gray-700 dark:text-gray-200">Camera</span>
                </button>
              </div>
            </div>
            <div className="flex justify-center pt-4">
                <button onClick={onClose} className="w-10 h-1 bg-gray-400 dark:bg-gray-600 rounded-full"></button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileControlCenter;
