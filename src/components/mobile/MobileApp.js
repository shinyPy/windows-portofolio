import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MobileHomeScreen from './MobileHomeScreen';
import MobileProjects from './MobileProjects';
import MobileSkills from './MobileSkills';
import MobileAbout from './MobileAbout';
import MobileFileManager from './MobileFileManager';
import MobileTerminal from './MobileTerminal';
import MobileSpotifyPlayer from './MobileSpotifyPlayer';
import MobileControlCenter from './MobileControlCenter';
import MobileNavigation from './MobileNavigation';

const MobileApp = ({
  filesystem,
  findItemById,
  isSpotifyOpen,
  closeSpotifyPlayer,
  initialFilesystem
}) => {
  const [activeTab, setActiveTab] = useState('home');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
  const [openedApp, setOpenedApp] = useState(null);

  // For swipe down gesture (optional, basic implementation)
  React.useEffect(() => {
    let startY = null;
    const handleTouchStart = (e) => {
      if (e.touches && e.touches.length === 1) {
        startY = e.touches[0].clientY;
      }
    };
    const handleTouchEnd = (e) => {
      if (startY !== null && e.changedTouches && e.changedTouches.length === 1) {
        const endY = e.changedTouches[0].clientY;
        if (startY < 60 && endY - startY > 40) {
          setIsControlCenterOpen(true);
        }
      }
      startY = null;
    };
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const handleAppOpen = (appName) => {
    setOpenedApp(appName);
  };

  const handleAppClose = () => {
    setOpenedApp(null);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return (
          <MobileHomeScreen
            filesystem={filesystem}
            findItemById={findItemById}
            onAppOpen={handleAppOpen}
            onOpenTerminal={() => setIsTerminalOpen(true)}
          />
        );
      case 'projects':
        return (
          <MobileProjects
            filesystem={filesystem}
            findItemById={findItemById}
            initialFilesystem={initialFilesystem}
            onBack={handleAppClose}
          />
        );
      case 'skills':
        return (
          <MobileSkills
            filesystem={filesystem}
            findItemById={findItemById}
            onBack={handleAppClose}
          />
        );
      case 'about':
        return (
          <MobileAbout
            filesystem={filesystem}
            findItemById={findItemById}
            onBack={handleAppClose}
          />
        );
      default:
        return (
          <MobileHomeScreen
            filesystem={filesystem}
            findItemById={findItemById}
            onAppOpen={handleAppOpen}
            onOpenTerminal={() => setIsTerminalOpen(true)}
          />
        );
    }
  };

  const renderOpenedApp = () => {
    if (!openedApp) return null;

    switch (openedApp) {
      case 'filemanager':
        return (
          <MobileFileManager
            filesystem={filesystem}
            findItemById={findItemById}
            onBack={handleAppClose}
          />
        );
      // Add other apps here if they can be opened from the home screen
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black">
      {/* iOS Status Bar */}
      <div
        className="ios-status-bar bg-black text-white cursor-pointer select-none safe-area-inset-top"
        onClick={() => setIsControlCenterOpen(true)}
        style={{ touchAction: 'manipulation' }}
      >
        <div className="flex items-center">
          <span className="text-sm font-semibold tracking-tight">9:41</span>
        </div>
        <div className="flex items-center space-x-1">
          {/* Cellular Signal */}
          <div className="flex space-x-0.5">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1.5 bg-white rounded-full"></div>
            <div className="w-1 h-2 bg-white rounded-full"></div>
            <div className="w-1 h-2.5 bg-white rounded-full"></div>
          </div>
          {/* 5G */}
          <span className="text-xs font-semibold">5G</span>
          {/* WiFi icon */}
          <div className="text-sm">📶</div>
          {/* Battery */}
          <div className="flex items-center space-x-1">
            <span className="text-xs font-semibold">100%</span>
            <div className="w-6 h-3 border border-white rounded-sm flex items-center justify-end pr-0.5">
              <div className="w-5 h-2 bg-green-500 rounded-xs"></div>
            </div>
          </div>
        </div>
      </div>
      {/* Control Center */}
      <MobileControlCenter
        isOpen={isControlCenterOpen}
        onClose={() => setIsControlCenterOpen(false)}
        onOpenSpotify={() => {
          setIsControlCenterOpen(false);
          if (!isSpotifyOpen && typeof closeSpotifyPlayer === 'function') {
            closeSpotifyPlayer(false); // ensure it's closed before opening
          }
          // Open the Spotify player (simulate as if user tapped the music app)
          if (typeof window !== 'undefined') {
            setTimeout(() => {
              if (typeof window.openSpotifyPlayer === 'function') {
                window.openSpotifyPlayer();
              }
            }, 100);
          }
        }}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="out-in">
          {openedApp ? (
            <motion.div
              key={openedApp}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute inset-0 bg-black"
            >
              {renderOpenedApp()}
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderActiveTab()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      {!openedApp && (
        <MobileNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />
      )}

      {/* Terminal Modal */}
      {isTerminalOpen && (
        <MobileTerminal onClose={() => setIsTerminalOpen(false)} />
      )}

      {/* Spotify Player */}
      {isSpotifyOpen && (
        <MobileSpotifyPlayer onClose={closeSpotifyPlayer} />
      )}
    </div>
  );
};

export default MobileApp;
