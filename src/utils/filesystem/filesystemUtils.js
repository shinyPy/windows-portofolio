// src/utils/filesystemUtils.js

export const findItemById = (filesystem, id) => {
  for (const item of filesystem) {
    if (item.id === id) return item;
    if (item.contents) {
      const found = findItemById(item.contents, id);
      if (found) return found;
    }
  }
  return null;
};

export const addFileOrFolder = (filesystem, parentId, item) => {
  const newFilesystem = [...filesystem];
  const parent = findItemById(newFilesystem, parentId);
  if (parent && parent.type === 'folder') {
    parent.contents.push({ id: Date.now(), ...item });
  }
  return newFilesystem;
};

export const deleteItem = (filesystem, id) => {
  const newFilesystem = filesystem.filter(item => item.id !== id);
  return newFilesystem;
};