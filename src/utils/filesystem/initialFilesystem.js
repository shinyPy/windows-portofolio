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
          // { id: 7, name: 'terminal.exe', type: 'file' },
          { id: 8, name: 'skills.txt', type: 'file', src: 'This is an example text file.' },
          { id: 9, name: 'welcome.txt', type: 'file' },
          { 
            id: 10, 
            name: 'introduction.txt', 
            type: 'file', 
            src: `Welcome to this file. This document serves as a foundational introduction to the content you are about to explore. Here, we delve into a brief overview of the key topics and objectives that will be covered.
          
          The purpose of this text is to provide a concise summary and context for the material presented, ensuring you have a clear understanding of the core themes and objectives. Whether you are here for a quick reference or a deeper exploration, this introduction will set the stage for the content that follows.
          
          As you proceed, you will find detailed information, insights, and resources designed to enhance your understanding and engagement with the subject matter. We aim to make this experience informative and enriching, guiding you through the essentials and beyond.
          
          Feel free to refer back to this introduction as needed to refresh your understanding or to clarify any points. Thank you for your interest, and we hope you find this content both valuable and enjoyable.` 
          }
          
        ],
      },
    ],
  },
];

export default initialFilesystem;