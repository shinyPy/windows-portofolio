import React, { useCallback, useState, useEffect } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { TerminalEmulator } from './components/windows/TerminalEmulator';
import { handleFileClick } from './utils/windowHandlers';
import { useAppHooks } from './hooks/appHooks';
import { useSpotify } from './hooks/useSpotify';
import { useWelcomeFile } from './hooks/useWelcomeFile';
import initialFilesystem from './utils/filesystem/initialFilesystem';
import Background from './components/Background';
import DesktopIconContainer from './components/container/DesktopIconContainer';
import FileExplorer from './components/windows/FileExplorer';
import MobileApp from './components/mobile/MobileApp';
import SpotifyPlayer from './components/SpotifyPlayer';
import Taskbar from './components/Taskbar';
import WindowContainer from './components/container/WindowContainer';
import Preloader from './components/Preloader';
import { preloadResources } from './utils/preloadResources';
import exeIconSrc from './assets/icons/exeIcon.png';
import fileIconSrc from './assets/icons/file.png';
import folderIconSrc from './assets/icons/file-explorer.png';

/**
 * Main application component managing desktop environment
 * @returns {JSX.Element} The application UI
 */
function App() {
  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Application state hooks
  const { filesystem, windows, setWindows, isMobile, findItemById } = useAppHooks(initialFilesystem);
  const { isSpotifyOpen, closeSpotifyPlayer } = useSpotify(true);

  // Preload resources on mount
  useEffect(() => {
    preloadResources().then(() => {
      setIsLoading(false);
    }).catch((error) => {
      console.error('Failed to preload resources:', error);
      setIsLoading(false); // Show app even if some resources fail
    });
  }, []);

  // Executable applications configuration
  const exeApplications = {
    'terminal.exe': {
      Component: TerminalEmulator,
      defaultSize: { width: 800, height: 500 }
    }
  };

  /**
   * Opens or focuses a window
   * @param {string} title - Window title
   * @param {string} id - Window identifier
   * @param {Object|null} viewingFile - File being viewed
   * @param {string} fullPath - Full file path
   * @param {boolean} [showCloseButton=true] - Show close button
   */
  const openWindow = useCallback((
    title,
    id,
    viewingFile = null,
    fullPath,
    showCloseButton = true
  ) => {
    // Check for existing window instance
    const existingWindow = windows.find(win =>
      win.windowId === id && win.viewingFile === viewingFile
    );
    if (existingWindow) {
      setWindows(prevWindows => [
        ...prevWindows.filter(
          (win) => win.windowId !== id || win.viewingFile !== viewingFile
        ),
        existingWindow,
      ]);
    } else {
      setWindows(prevWindows => [
        ...prevWindows,
        {
          title,
          iconSrc: viewingFile ? fileIconSrc : folderIconSrc,
          Component: FileExplorer,
          id: Date.now(),
          windowId: id,
          viewingFile,
          fullPath,
          showCloseButton,
        },
      ]);
    }
  }, [windows, setWindows]);
  const onFileClick = useCallback((id) => {
    handleFileClick({
      id,
      filesystem,
      exeApplications,
      setWindows,
      findItemById,
      openWindow,
      initialFilesystem
    });
  }, [filesystem, exeApplications, setWindows, findItemById, openWindow, initialFilesystem]);

  const closeWindow = useCallback((id) => {
    setWindows(prevWindows => prevWindows.filter((win) => win.id !== id));
  }, [setWindows]);

  useWelcomeFile(filesystem, openWindow);

  // Separate windows into exe and non-exe windows
  const exeWindows = windows.filter(win => win.Component !== FileExplorer);
  const fileWindows = windows.filter(win => win.Component === FileExplorer);

  const launchExe = useCallback((exeName) => {
    const exeApp = exeApplications[exeName];
    if (exeApp) {
      setWindows(prevWindows => [
        ...prevWindows,
        {
          title: exeName,
          iconSrc: exeIconSrc,
          Component: exeApp.Component,
          id: Date.now(),
          defaultSize: exeApp.defaultSize
        }
      ]);
    }
  }, [exeApplications, setWindows, windows]);

  // Show preloader while loading
  if (isLoading) {
    return <Preloader />;
  }

  // Render mobile version for mobile devices
  if (isMobile) {
    return (
      <>
        <MobileApp
          filesystem={filesystem}
          findItemById={findItemById}
          isSpotifyOpen={isSpotifyOpen}
          closeSpotifyPlayer={closeSpotifyPlayer}
          initialFilesystem={initialFilesystem}
        />
        <SpeedInsights />
      </>
    );
  }

  // Render desktop version for desktop devices
  return (
    <>
      <Background isMobile={isMobile}>
        <div className="w-full h-full">
          <DesktopIconContainer
            filesystem={initialFilesystem[0].contents[0].contents}
            onFileClick={onFileClick}
            openWindow={openWindow}
          />

          <WindowContainer
            windows={fileWindows}
            closeWindow={closeWindow}
            filesystem={filesystem}
            findItemById={findItemById}
            onExeClick={launchExe}
          />

          {exeWindows.map(win => (
            <win.Component
              key={win.id}
              onClose={() => closeWindow(win.id)}
              {...win.props}
            />
          ))}

          {isSpotifyOpen && <SpotifyPlayer onClose={closeSpotifyPlayer} />}
        </div>

        <Taskbar
          windows={windows}
          isSpotifyOpen={isSpotifyOpen}
        />
      </Background>

      <SpeedInsights />
    </>
  );
}

export default App;
