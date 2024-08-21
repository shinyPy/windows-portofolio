import { useState } from 'react';
import { findItemById, addFileOrFolder, deleteItem } from '../utils/filesystem/filesystemUtils';
import initialFilesystem from '../utils/filesystem/initialFilesystem';

export const useFilesystem = () => {
  const [filesystem, setFilesystem] = useState(initialFilesystem);

  const addItem = (parentId, item) => {
    setFilesystem(prevFilesystem => addFileOrFolder(prevFilesystem, parentId, item));
  };

  const removeItem = (id) => {
    setFilesystem(prevFilesystem => deleteItem(prevFilesystem, id));
  };

  const findItem = (id) => {
    return findItemById(filesystem, id);
  };

  return {
    filesystem,
    addItem,
    removeItem,
    findItem, // Ensure this is exported
    findItemById,
  };
};