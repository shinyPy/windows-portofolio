// import Resume from '../../assets/documents/Resume.docx';
// import CoverLetter from '../assets/documents/CoverLetter.docx';
import Saber from '../assets/images/saber.jpg';
import Intro from '../assets/videos/rawr.mp4';
import { useState } from 'react';


const initialFilesystem = [
  
  {
    id: 1,
    name: 'root',
    type: 'folder',
    contents: [
      { id: 2, name: 'Documents', type: 'folder'},
      { id: 4, name: 'Pictures', type: 'folder'},
      { id: 6, name: 'Videos', type: 'folder'},
    ]
  },
  {
    id: 2,
    name: 'Documents',
    type: 'folder',
    contents: [
      { id: 3, name: 'CoverLetter.docx', type: 'file'},
    ]
  },
  {
    id: 4,
    name: 'Pictures',
    type: 'folder',
    contents: [
      { id: 5, name: 'Saber.png', type: 'file', src: Saber }
    ]
  },
  {
    id: 6,
    name: 'Videos',
    type: 'folder',
    contents: [
      { id: 7, name: 'Intro.mp4', type: 'file', src: Intro }
    ]
  }
];


export const useFilesystem = () => {
  const [filesystem, setFilesystem] = useState(initialFilesystem);
  const [path, setPath] = useState([1]); // Start with root folder id

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
      if (item.type === 'folder') {
        const found = findItemById(item.contents, id);
        if (found) return found;
      }
    }
    return null;
  };

  return {
    filesystem,
    addFileOrFolder,
    deleteItem,
    findItemById
  };
};
