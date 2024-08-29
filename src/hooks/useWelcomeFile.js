import { useEffect, useState } from "react";
import { getFullPath } from "./appHooks";

export const useWelcomeFile = (filesystem, openWindow) => {
  const [hasWelcomeOpened, setHasWelcomeOpened] = useState(false);

  useEffect(() => {
    if (!hasWelcomeOpened) {
      const welcomeFile = filesystem[0]?.contents[0]?.contents.find(item => item.name === "welcome.txt");
      if (welcomeFile) {
        openWindow(welcomeFile.name, welcomeFile.id, welcomeFile, getFullPath(welcomeFile.id, filesystem), false);
        setHasWelcomeOpened(true);
      }
    }
  }, [filesystem, hasWelcomeOpened, openWindow]);

  return hasWelcomeOpened;
};
