// src/utils/filesystem.js

import { useState } from 'react';

// Import your assets
// import Resume from '../../assets/documents/Resume.docx';
// import CoverLetter from '../assets/documents/CoverLetter.docx';
import saberImage from '../assets/images/saber.jpg';
import rawrVideo from '../assets/videos/rawr.mp4';
// Initial filesystem structure
// src/utils/filesystem.js
const initialFilesystem = [
  {
    id: 1,
    name: '/',
    type: 'folder',
    contents: [
      {
        id: 2,
        name: 'desktop',
        type: 'folder',
        contents: [
          {
            id: 3,
            name: 'Achievements',
            type: 'folder',
            contents: [
              { id: 4, name: 'picture.jpg', type: 'file', src: saberImage },
            ],
          },
          {
            id: 5,
            name: 'Projects!',
            type: 'folder',
            contents: [
              { id: 6, name: 'shinyPy', type: 'link', url: 'https://github.com/shinyPy/' },
              { id: 11, name: 'rawr.mp4', type: 'file', src: rawrVideo},

            ],
          },
          { id: 7, name: 'terminal.exe', type: 'file' },
          { id: 8, name: 'skills.txt', type: 'file', src: rawrVideo },
          { id: 9, name: 'welcome.txt', type: 'file' },
          { id: 10, name: 'introduction.txt', type: 'file' },
        ],
      },
    ],
  },
];

export default initialFilesystem;

export const useFilesystem = () => {
  const [filesystem, setFilesystem] = useState(initialFilesystem);

  const addFileOrFolder = (parentId, item) => {
    const newFilesystem = [...filesystem];
    const parent = findItemById(newFilesystem, parentId);
    if (parent && parent.type === 'folder') {
      parent.contents.push({ id: Date.now(), ...item });
      setFilesystem(newFilesystem);
    }
  };

  const deleteItem = (id) => {
    const newFilesystem = filesystem.filter(item => item.id !== id);
    setFilesystem(newFilesystem);
  };

  const findItemById = (fs, id) => {
  for (const item of fs) {
    if (item.id === id) return item;
    if (item.contents) {
      const found = findItemById(item.contents, id);
      if (found) return found;
    }
  }
  return null; // Return null if item is not found
};

  return {
    filesystem,
    addFileOrFolder,
    deleteItem,
    findItemById
  };
};