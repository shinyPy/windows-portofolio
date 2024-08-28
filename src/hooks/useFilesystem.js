//src/hooks/useFilesystem.js
import { useState } from 'react';
import { findItemById} from '../utils/filesystem/filesystemUtils';
import initialFilesystem from '../utils/filesystem/initialFilesystem';

export const useFilesystem = () => {
  const [filesystem] = useState(initialFilesystem);


  const findItem = (id) => {
    return findItemById(filesystem, id);
  };

  return {
    filesystem,
    findItem, 
    findItemById,
  };
};