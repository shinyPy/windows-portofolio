// src/utils/filesystem.js

import { useState } from 'react';

// Import your assets
// import Resume from '../../assets/documents/Resume.docx';
// import CoverLetter from '../assets/documents/CoverLetter.docx';
import Saber from '../assets/images/saber.jpg';
import Intro from '../assets/videos/rawr.mp4';

// Initial filesystem structure
const initialFilesystem = [
  {
    id: 1,
    name: 'C:',
    type: 'folder',
    contents: [
      {
        id: 2,
        name: 'Program Files',
        type: 'folder',
        contents: [
          {
            id: 3,
            name: 'App1',
            type: 'folder',
            contents: [
              { id: 4, name: 'app1.exe', type: 'file' },
            ],
          },
        ],
      },
      {
        id: 5,
        name: 'Users',
        type: 'folder',
        contents: [
          {
            id: 6,
            name: 'User',
            type: 'folder',
            contents: [
              {
                id: 7,
                name: 'Documents',
                type: 'folder',
                contents: [
                  { id: 8, name: 'Resume.docx', type: 'file' },
                ],
              },
              {
                id: 9,
                name: 'Pictures',
                type: 'folder',
                contents: [
                  { id: 10, name: 'Vacation.png', type: 'file' },
                ],
              },
              {
                id: 11,
                name: 'Videos',
                type: 'folder',
                contents: [
                  { id: 12, name: 'Birthday.mp4', type: 'file' },
                ],
              },
              {
                id: 13,
                name: 'Desktop',
                type: 'folder',
                contents: [
                  { id: 14, name: 'shortcut.lnk', type: 'file' },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 15,
        name: 'Windows',
        type: 'folder',
        contents: [
          { id: 16, name: 'explorer.exe', type: 'file' },
          { id: 17, name: 'notepad.exe', type: 'file' },
        ],
      },
    ],
  },
];

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