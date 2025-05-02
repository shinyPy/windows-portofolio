import React from "react";
import folderIconSrc from "./assets/icons/file-explorer.png";
import fileIconSrc from "./assets/icons/file.png";
import DesktopIconContainer from "./components/container/DesktopIconContainer";
import WindowContainer from "./components/container/WindowContainer";
import Taskbar from "./components/Taskbar";
import FileExplorer from "./components/windows/FileExplorer";
import { useAppHooks } from "./hooks/appHooks";
import initialFilesystem from "./utils/filesystem/initialFilesystem";
import { SpeedInsights } from "@vercel/speed-insights/react";
import SpotifyPlayer from "./components/SpotifyPlayer";
import { useSpotify } from "./hooks/useSpotify";
import { useWelcomeFile } from "./hooks/useWelcomeFile";
import Background from "./components/Background";
import MobileWarning from "./components/mobile/MobileWarning";
import { TerminalEmulator } from "./components/windows/TerminalEmulator";
import exeIconSrc from "./assets/icons/exeIcon.png";
import { handleFileClick } from "./utils/windowHandlers";

function App() {
  const { filesystem, windows, setWindows, isMobile, findItemById } = useAppHooks(initialFilesystem);
  const { isSpotifyOpen, closeSpotifyPlayer } = useSpotify(true);

  const exeApplications = React.useMemo(() => ({
    "terminal.exe": {
      Component: TerminalEmulator,
      defaultSize: { width: 800, height: 500 }
    }
  }), []);

  const openWindow = (title, id, viewingFile = null, fullPath, showCloseButton = true) => {
    const existingWindow = windows.find(
      (win) => win.windowId === id && win.viewingFile === viewingFile
    );
    if (existingWindow) {
      setWindows([
        ...windows.filter(
          (win) => win.windowId !== id || win.viewingFile !== viewingFile
        ),
        existingWindow,
      ]);
    } else {
      setWindows([
        ...windows,
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
  };
  const onFileClick = (id) => {
    handleFileClick({
      id,
      filesystem,
      exeApplications,
      setWindows,
      findItemById,
      openWindow,
      initialFilesystem
    });
  };

  const closeWindow = (id) => {
    setWindows(windows.filter((win) => win.id !== id));
  };

  useWelcomeFile(filesystem, openWindow);

  // Separate windows into exe and non-exe windows
  const exeWindows = windows.filter(win => win.Component !== FileExplorer);
  const fileWindows = windows.filter(win => win.Component === FileExplorer);

  const launchExe = (exeName) => {
    const exeApp = exeApplications[exeName];
    if (exeApp) {
      setWindows([
        ...windows,
        {
          title: exeName,
          iconSrc: exeIconSrc,
          Component: exeApp.Component,
          id: Date.now(),
          defaultSize: exeApp.defaultSize
        }
      ]);
    }
  };

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
            onExeClick={launchExe} // Pass launchExe handler
          />
            {exeWindows.map(win => (
            <win.Component
                key={win.id}
                onClose={() => closeWindow(win.id)}
                {...win.props} // Spread additional props
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
      {isMobile && <MobileWarning />}
    </>
  );
}

export default App;
