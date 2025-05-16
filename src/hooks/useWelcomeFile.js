import { useEffect, useState } from "react";
import { buildPath } from "../utils/windowHandlers";

export const useWelcomeFile = (filesystem, openWindow) => {
  const [hasWelcomeOpened, setHasWelcomeOpened] = useState(false);

  useEffect(() => {
    if (!hasWelcomeOpened) {
      const welcomeFile = filesystem[0]?.contents[0]?.contents.find(item => item.name === "welcome.txt");
      if (welcomeFile) {
        const fullPath = buildPath(welcomeFile.id, filesystem);
        openWindow(welcomeFile.name, welcomeFile.id, welcomeFile, fullPath, false);
        setHasWelcomeOpened(true);
      }
    }
  }, [filesystem, hasWelcomeOpened, openWindow]);

  return hasWelcomeOpened;
};
