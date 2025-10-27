import React, { useState, useContext } from 'react';
import MobileHeader from './MobileHeader';
import MobileTileHome from './MobileTileHome';
import MobileProjects from './MobileProjects';
import MobileSkills from './MobileSkills';
import MobileAbout from './MobileAbout';
import MobileFileManager from './MobileFileManager';
import MobileTerminal from './MobileTerminal';
import MobileSpotifyPlayer from './MobileSpotifyPlayer';
import MobileBottomNav from './MobileBottomNav';
import { LanguageContext } from '../../utils/LanguageContext';

const MobileApp = ({
  filesystem,
  findItemById,
  isSpotifyOpen,
  closeSpotifyPlayer,
  initialFilesystem
}) => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);

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
    setCurrentScreen(appName);
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <MobileHomeScreen
            filesystem={filesystem}
            findItemById={findItemById}
            onAppOpen={handleAppOpen}
            onOpenTerminal={() => setIsTerminalOpen(true)}
          />
        );
      case 'filemanager':
        return (
          <MobileFileManager
            filesystem={filesystem}
            findItemById={findItemById}
            onBack={handleBackToHome}
          />
        );
      case 'projects':
        return (
          <MobileProjects
            filesystem={filesystem}
            findItemById={findItemById}
            initialFilesystem={initialFilesystem}
            onBack={handleBackToHome}
          />
        );
      case 'skills':
        return (
          <MobileSkills
            filesystem={filesystem}
            findItemById={findItemById}
            onBack={handleBackToHome}
          />
        );
      case 'about':
        return (
          <MobileAbout
            filesystem={filesystem}
            findItemById={findItemById}
            onBack={handleBackToHome}
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
      <div className="flex-1 overflow-hidden">
        {renderCurrentScreen()}
      </div>

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
