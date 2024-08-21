import { useState, useEffect } from 'react';
import { useFilesystem } from './useFilesystem';

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

export const getFullPath = (id, filesystem, path = []) => {
  for (const item of filesystem) {
    if (item.id === id) {
      return [...path, id];
    }
    if (item.contents) {
      const result = getFullPath(id, item.contents, [...path, item.id]);
      if (result) return result;
    }
  }
  return null;
};
