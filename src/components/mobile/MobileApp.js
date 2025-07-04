import React, { useState } from 'react';
import MobileNavigation from './MobileNavigation';
import MobileHome from './MobileHome';
import MobileProjects from './MobileProjects';
import MobileSkills from './MobileSkills';
import MobileAbout from './MobileAbout';
import MobileTerminal from './MobileTerminal';
import MobileSpotifyPlayer from './MobileSpotifyPlayer';

const MobileApp = ({
  filesystem,
  findItemById,
  isSpotifyOpen,
  closeSpotifyPlayer,
  initialFilesystem
}) => {
  const [activeTab, setActiveTab] = useState('home');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return (
          <MobileHome
            filesystem={filesystem}
            findItemById={findItemById}
            onNavigate={setActiveTab}
            onOpenTerminal={() => setIsTerminalOpen(true)}
          />
        );
      case 'projects':
        return (
          <MobileProjects
            filesystem={filesystem}
            findItemById={findItemById}
            initialFilesystem={initialFilesystem}
          />
        );
      case 'skills':
        return (
          <MobileSkills
            filesystem={filesystem}
            findItemById={findItemById}
          />
        );
      case 'about':
        return (
          <MobileAbout
            filesystem={filesystem}
            findItemById={findItemById}
          />
        );
      default:
        return (
          <MobileHome
            filesystem={filesystem}
            findItemById={findItemById}
            onNavigate={setActiveTab}
            onOpenTerminal={() => setIsTerminalOpen(true)}
          />
        );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {renderActiveTab()}
      </div>

      {/* Terminal Modal */}
      {isTerminalOpen && (
        <MobileTerminal onClose={() => setIsTerminalOpen(false)} />
      )}

      {/* Spotify Player */}
      {isSpotifyOpen && (
        <MobileSpotifyPlayer onClose={closeSpotifyPlayer} />
      )}

      {/* Bottom Navigation */}
      <MobileNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />
    </div>
  );
};

export default MobileApp;
