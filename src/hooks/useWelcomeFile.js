import { useEffect, useRef } from "react";
import { buildPath } from "../utils/windowHandlers";

export const useWelcomeFile = (filesystem, openWindow) => {
  const hasWelcomeOpenedRef = useRef(false);

  useEffect(() => {
    if (!hasWelcomeOpenedRef.current) {
      const welcomeFile = filesystem[0]?.contents[0]?.contents.find(item => item.name === "welcome.txt");
      if (welcomeFile) {
        const fullPath = buildPath(welcomeFile.id, filesystem);
        openWindow(welcomeFile.name, welcomeFile.id, welcomeFile, fullPath, false);
        hasWelcomeOpenedRef.current = true;
      }
    }
  }, [filesystem, openWindow]);

  return hasWelcomeOpenedRef.current;
};
