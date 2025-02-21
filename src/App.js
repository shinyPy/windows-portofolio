import React from "react";
import folderIconSrc from "./assets/icons/file-explorer.png";
import fileIconSrc from "./assets/icons/file.png";
import DesktopIconContainer from "./components/container/DesktopIconContainer";
import WindowContainer from "./components/container/WindowContainer";
import Taskbar from "./components/Taskbar";
import FileExplorer from "./components/windows/FileExplorer";
import { getFullPath, useAppHooks } from "./hooks/appHooks";
import initialFilesystem from "./utils/filesystem/initialFilesystem";
import { SpeedInsights } from "@vercel/speed-insights/react";
import SpotifyPlayer from "./components/SpotifyPlayer";
import { useSpotify } from "./hooks/useSpotify";
import { useWelcomeFile } from "./hooks/useWelcomeFile";
import Background from "./components/Background";
import MobileWarning from "./components/mobile/MobileWarning";
import TerminalEmulator from "./components/windows/TerminalEmulator";
import exeIconSrc from "./assets/icons/exeIcon.png";
function App() {
  const { filesystem, windows, setWindows, isMobile, findItemById } = useAppHooks(initialFilesystem);
  const { isSpotifyOpen, closeSpotifyPlayer } = useSpotify(true);

  const exeApplications = {
    "terminal.exe": {
      Component: TerminalEmulator,
      defaultSize: { width: 800, height: 500 }
    }
  };

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
  // Dear my future self
  // When I wrote this code, only God and I knew what it was.
  // Now, only God knows.
  // From your past self.
  const onFileClick = (id) => {
    const clickedItem = findItemById(filesystem, id);
    const fullPath = getFullPath(id, filesystem);

    if (clickedItem) {
      if (clickedItem.name === "terminal.exe") {
        setWindows([
          ...windows,
          {
            title: "Terminal",
            iconSrc: fileIconSrc,
            Component: TerminalEmulator,
            props: { filesystem: initialFilesystem }, // Add filesystem prop
            id: Date.now(),
            windowId: id,
          },
        ]);
      } else if (clickedItem.name.endsWith('.exe')) {
        const exeApp = exeApplications[clickedItem.name];
        if (exeApp) {
          setWindows([
            ...windows,
            {
              title: clickedItem.name,
              iconSrc: exeIconSrc,
              Component: exeApp.Component,
              id: Date.now(),
              windowId: id,
              defaultSize: exeApp.defaultSize
            }
          ]);
        }
      } else if (clickedItem.type === "folder") {
        openWindow("Thunar", id, null, fullPath);
      } else if (clickedItem.type === "file") {
        openWindow(clickedItem.name, id, clickedItem, fullPath, false);
      } else if (clickedItem.type === "link") {
        window.open(clickedItem.url, "_blank");
      }
    }
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
