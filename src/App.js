import React, { useState, useEffect } from "react";
import folderIconSrc from "./assets/icons/file-explorer.png";
import fileIconSrc from "./assets/icons/file.png";
import backgroundImage from "./assets/images/mountain.png";
import DesktopIconContainer from "./components/container/DesktopIconContainer";
import WindowContainer from "./components/container/WindowContainer";
import Taskbar from "./components/Taskbar";
import FileExplorer from "./components/windows/FileExplorer";
import { getFullPath, useAppHooks } from "./hooks/appHooks";
import initialFilesystem from "./utils/filesystem/initialFilesystem";
import { SpeedInsights } from "@vercel/speed-insights/react";
import SpotifyPlayer from "./components/SpotifyPlayer";

function App() {
  const { filesystem, windows, setWindows, isMobile, findItemById } =
    useAppHooks(initialFilesystem);

  const [isSpotifyOpen, setSpotifyOpen] = useState(false);
  const [hasWelcomeOpened, setHasWelcomeOpened] = useState(false); 

  const openWindow = (
    title,
    id,
    viewingFile = null,
    fullPath,
    showCloseButton = true,
  ) => {
    const existingWindow = windows.find(
      (win) => win.windowId === id && win.viewingFile === viewingFile,
    );
    if (existingWindow) {
      setWindows([
        ...windows.filter(
          (win) => win.windowId !== id || win.viewingFile !== viewingFile,
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

  const toggleSpotifyPlayer = () => {
    setSpotifyOpen(!isSpotifyOpen);
  };

  const closeSpotifyPlayer = () => {
    setSpotifyOpen(false);
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
        if (clickedItem.url === "spotify") {
          toggleSpotifyPlayer();
        } else {
          window.open(clickedItem.url, "_blank");
        }
      }
    }
  };

  const closeWindow = (id) => {
    setWindows(windows.filter((win) => win.id !== id));
  };

  useEffect(() => {
    if (!hasWelcomeOpened) { // Check if the welcome window has already opened
      const welcomeFile = filesystem[0]?.contents[0]?.contents.find(item => item.name === "welcome.txt");

      if (welcomeFile) {
        openWindow(welcomeFile.name, welcomeFile.id, welcomeFile, getFullPath(welcomeFile.id, filesystem), false);
        setHasWelcomeOpened(true); // Set the flag to true after opening the window
      }
    }

    setSpotifyOpen(true);

    // eslint-disable-next-line
  }, [filesystem]);

  return (
    <>
      <div
        className={`w-[100vw] h-[100vh] bg-center bg-cover flex flex-col justify-between relative ${
          isMobile ? "filter blur-[5px]" : ""
        }`}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          overflow: "hidden",
        }}
      >
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
          {isSpotifyOpen && <SpotifyPlayer onClose={closeSpotifyPlayer} />}
        </div>
        <Taskbar windows={windows} />
      </div>
      <SpeedInsights />
      {isMobile && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black p-5 rounded-lg z-50 flex items-center justify-center">
          <div className="text-center text-lg font-mono">
            Bad experience for mobile users, use a PC for a better experience.
          </div>
        </div>
      )}
    </>
  );
}

export default App;
