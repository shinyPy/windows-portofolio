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
  const [activeScreen, setActiveScreen] = useState('home');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isSpotifyPlayerOpen, setIsSpotifyPlayerOpen] = useState(false);
  const { language, setLanguage } = useContext(LanguageContext);

  const handleTileClick = (screenId) => {
    if (screenId === 'terminal') {
      setIsTerminalOpen(true);
    } else if (screenId === 'spotify') {
      setIsSpotifyPlayerOpen(true);
    } else if (screenId === 'files') {
      setActiveScreen('filemanager');
    } else {
      setActiveScreen(screenId);
    }
  };

  const handleBackToHome = () => {
    setActiveScreen('home');
  };

  const handleNavigate = (screenId) => {
    setActiveScreen(screenId);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'id' : 'en');
  };

  const renderContent = () => {
    if (activeScreen === 'home') {
      return (
        <MobileTileHome
          onTileClick={handleTileClick}
          language={language}
          filesystemCount={filesystem.length}
        />
      );
    }

    // Full-screen overlays with slide-up animation
    return (
      <div className="fixed inset-0 bg-gray-900 z-40 animate-slide-up-screen overflow-y-auto">
        <div className="pt-14 pb-20">
          {activeScreen === 'about' && (
            <MobileAbout
              filesystem={filesystem}
              findItemById={findItemById}
              onBack={handleBackToHome}
            />
          )}
          {activeScreen === 'projects' && (
            <MobileProjects
              filesystem={filesystem}
              findItemById={findItemById}
              initialFilesystem={initialFilesystem}
              onBack={handleBackToHome}
            />
          )}
          {activeScreen === 'skills' && (
            <MobileSkills
              filesystem={filesystem}
              findItemById={findItemById}
              onBack={handleBackToHome}
            />
          )}
          {activeScreen === 'filemanager' && (
            <MobileFileManager
              filesystem={filesystem}
              findItemById={findItemById}
              onBack={handleBackToHome}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 overflow-hidden">
      {/* Windows Metro Header */}
      <MobileHeader
        activeScreen={activeScreen}
        onBack={handleBackToHome}
        language={language}
        onLanguageToggle={toggleLanguage}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden relative">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <MobileBottomNav
        activeScreen={activeScreen}
        onNavigate={handleNavigate}
      />

      {/* Terminal Full-Screen Overlay */}
      {isTerminalOpen && (
        <MobileTerminal onClose={() => setIsTerminalOpen(false)} />
      )}

      {/* Spotify Player Full-Screen Overlay */}
      {isSpotifyPlayerOpen && (
        <MobileSpotifyPlayer onClose={() => setIsSpotifyPlayerOpen(false)} />
      )}
    </div>
  );
};

export default MobileApp;
