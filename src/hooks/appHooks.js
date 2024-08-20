// src/hooks/appHooks.js
import { useFilesystem } from '../utils/filesystem';
import { useState, useEffect } from 'react';

export function useAppHooks(initialFilesystem) {
  const { filesystem, findItemById } = useFilesystem(initialFilesystem);
  const [windows, setWindows] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check on initial load

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    filesystem,
    windows,
    setWindows,
    isMobile,
    findItemById,
  };
}
