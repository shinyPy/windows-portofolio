//src/hooks/useFilesystem.js
import { useState } from 'react';
import { findItemById as findItemByIdUtil } from '../utils/filesystem/filesystemUtils';
import initialFilesystem from '../utils/filesystem/initialFilesystem';

export const useFilesystem = () => {
  const [filesystem] = useState(initialFilesystem);

  const findItem = (id) => {
    return findItemByIdUtil(filesystem, id);
  };

  const findItemById = (id) => {
    return findItemByIdUtil(filesystem, id);
  };

  return {
    filesystem,
    findItem,
    findItemById,
  };
};
