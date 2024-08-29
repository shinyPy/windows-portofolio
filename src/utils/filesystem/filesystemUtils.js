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

