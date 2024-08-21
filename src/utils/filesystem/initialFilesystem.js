// src/utils/initialFilesystem.js

import saberImage from '../../assets/images/saber.jpg';
import rawrVideo from '../../assets/videos/rawr.mp4';

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
              { id: 11, name: 'rawr.mp4', type: 'file', src: rawrVideo },
            ],
          },
          { id: 7, name: 'terminal.exe', type: 'file' },
          { id: 8, name: 'skills.txt', type: 'file', src: 'This is an example text file.' },
          { id: 9, name: 'welcome.txt', type: 'file' },
          { id: 10, name: 'introduction.txt', type: 'file' },
        ],
      },
    ],
  },
];

export default initialFilesystem;