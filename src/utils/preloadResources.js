// List of assets to preload
const images = [
  '/background.png',
  '/background2.png',
  '/backyard.png',
  '/mountain.png',
  '/sertifikat-magang.png',
  '/udemy.jpg',
  '/wn-tl-1.png',
  '/wn-tl-2.png',
  '/icons/exeIcon.png',
  '/icons/file-explorer.png',
  '/icons/file.png',
  '/icons/folder.png',
  '/icons/linkIcon.png',
  '/icons/logo.svg',
  '/icons/mdIcon.png',
  '/icons/SpotifyIcon.png'
];

const videos = [
  '/videos/dev-flutter.mp4',
  '/videos/dev.mp4',
  '/videos/devs.mp4'
];

// Function to preload an image
const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => reject(src);
    img.src = src;
  });
};

// Function to preload a video
const preloadVideo = (src) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.onloadeddata = () => resolve(src);
    video.onerror = () => reject(src);
    video.preload = 'metadata';
    video.src = src;
  });
};

// Main preload function
export const preloadResources = () => {
  const imagePromises = images.map(src => preloadImage(src));
  const videoPromises = videos.map(src => preloadVideo(src));

  return Promise.all([...imagePromises, ...videoPromises]);
};
