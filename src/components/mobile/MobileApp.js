import React, { useState, useContext } from 'react';
import MobileHeader from './MobileHeader';
import MobileTileHome from './MobileTileHome';
import MobileProjects from './MobileProjects';
import MobileSkills from './MobileSkills';
import MobileAbout from './MobileAbout';
import MobileFileManager from './MobileFileManager';
import MobileTerminal from './MobileTerminal';
import MobileSpotifyPlayer from './MobileSpotifyPlayer';
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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { language, setLanguage } = useContext(LanguageContext);

  const handleTileClick = (screenId) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 400);

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
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveScreen('home');
      setIsTransitioning(false);
    }, 300);
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

    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black z-40 animate-slide-up-screen overflow-hidden">
        <div className="h-full overflow-y-auto pt-16">
          {activeScreen === 'about' && (
            <MobileAbout
              filesystem={filesystem}
              findItemById={findItemById}
              onBack={handleBackToHome}
              language={language}
            />
          )}
          {activeScreen === 'projects' && (
            <MobileProjects
              filesystem={filesystem}
              findItemById={findItemById}
              initialFilesystem={initialFilesystem}
              onBack={handleBackToHome}
              language={language}
            />
          )}
          {activeScreen === 'skills' && (
            <MobileSkills
              filesystem={filesystem}
              findItemById={findItemById}
              onBack={handleBackToHome}
              language={language}
            />
          )}
          {activeScreen === 'filemanager' && (
            <MobileFileManager
              filesystem={filesystem}
              findItemById={findItemById}
              onBack={handleBackToHome}
              language={language}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black overflow-hidden">
      {/* Modern Header */}
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

      {/* Terminal Full-Screen Overlay */}
      {isTerminalOpen && (
        <MobileTerminal onClose={() => setIsTerminalOpen(false)} language={language} />
      )}

      {/* Spotify Player Full-Screen Overlay */}
      {isSpotifyPlayerOpen && (
        <MobileSpotifyPlayer onClose={() => setIsSpotifyPlayerOpen(false)} language={language} />
      )}
    </div>
  );
};

export default MobileApp;
