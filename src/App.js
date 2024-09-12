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
// import { useSpotify } from "./hooks/useSpotify";
import { useWelcomeFile } from "./hooks/useWelcomeFile";
import Background from "./components/Background";
import MobileWarning from "./components/mobile/MobileWarning";

function App() {
  const { filesystem, windows, setWindows, isMobile, findItemById } = useAppHooks(initialFilesystem);
  // const { isSpotifyOpen, closeSpotifyPlayer } = useSpotify(true);

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
    const clickedItem = findItemById(filesystem, id);
    const fullPath = getFullPath(id, filesystem);

    if (clickedItem) {
      if (clickedItem.type === "folder") {
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
            windows={windows}
            closeWindow={closeWindow}
            filesystem={filesystem}
            findItemById={findItemById}
          />
          {/* {isSpotifyOpen && <SpotifyPlayer onClose={closeSpotifyPlayer} />} */}
        </div>
        <Taskbar 
          windows={windows} 
          // isSpotifyOpen={isSpotifyOpen} 
        />
      </Background>
      <SpeedInsights />
      {isMobile && <MobileWarning />}
    </>
  );
}

export default App;
