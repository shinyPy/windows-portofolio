import { useState, useEffect } from "react";
import { useFilesystem } from "./useFilesystem";

export function useAppHooks(initialFilesystem) {
  const { filesystem, findItemById } = useFilesystem(initialFilesystem);
  const [windows, setWindows] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check on initial load

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    filesystem,
    windows,
    setWindows,
    isMobile,
    findItemById,
  };
}
