import React, { useState, useEffect } from 'react';

function MobileTileHome({ onTileClick, language, filesystemCount }) {
  const tiles = [
    {
      id: 'about',
      title: language === 'en' ? 'About Me' : 'Tentang Saya',
      size: 'wide',
      color: '#0078d4',
      hasLiveContent: true
    },
    {
      id: 'projects',
      title: language === 'en' ? 'Projects' : 'Proyek',
      size: 'wide',
      color: '#00BCF2',
      hasLiveContent: true
    },
    {
      id: 'skills',
      title: language === 'en' ? 'Skills' : 'Keterampilan',
      size: 'square',
      color: '#FF6F00',
      hasLiveContent: false
    },
    {
      id: 'files',
      title: language === 'en' ? 'Files' : 'Berkas',
      size: 'square',
      color: '#FFB900',
      hasLiveContent: false
    },
    {
      id: 'terminal',
      title: 'Terminal',
      size: 'square',
      color: '#00CC6A',
      hasLiveContent: false
    },
    {
      id: 'spotify',
      title: 'Spotify',
      size: 'square',
      color: '#1DB954',
      hasLiveContent: false
    },
  ];

  return (
    <div className="p-5 pt-20 pb-6 min-h-screen bg-gray-900">
      {/* Greeting Section */}
      <div className="mb-6">
        <h1 className="text-white text-3xl font-bold font-mono mb-2">Portfolio</h1>
        <p className="text-gray-400 text-sm">{language === 'en' ? 'Welcome to my portfolio' : 'Selamat datang di portofolio saya'}</p>
      </div>

      {/* Tile Grid */}
      <div className="grid grid-cols-2 gap-4">
        {tiles.map((tile, index) => (
          <Tile
            key={tile.id}
            tile={tile}
            index={index}
            onClick={() => onTileClick(tile.id)}
            filesystemCount={filesystemCount}
            language={language}
          />
        ))}
      </div>
    </div>
  );
}

function Tile({ tile, index, onClick, filesystemCount, language }) {
  const [pressed, setPressed] = useState(false);
  const [cycleIndex, setCycleIndex] = useState(0);

  // Live tile content cycling for About and Projects
  useEffect(() => {
    if (!tile.hasLiveContent) return;

    const interval = setInterval(() => {
      setCycleIndex(prev => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, [tile.hasLiveContent]);

  const handleClick = () => {
    setPressed(true);
    setTimeout(() => {
      setPressed(false);
      onClick();
    }, 150);
  };

  const getLiveContent = () => {
    if (tile.id === 'about') {
      const content = [
        language === 'en' ? 'Full Stack Developer' : 'Pengembang Full Stack',
        language === 'en' ? 'Tech Enthusiast' : 'Penggemar Teknologi',
        language === 'en' ? 'Problem Solver' : 'Pemecah Masalah'
      ];
      return (
        <div className="text-white text-opacity-90 text-sm animate-tile-cycle" key={cycleIndex}>
          {content[cycleIndex]}
        </div>
      );
    }

    if (tile.id === 'projects') {
      const content = [
        language === 'en' ? 'Recent Work' : 'Karya Terbaru',
        language === 'en' ? 'View Projects' : 'Lihat Proyek',
        language === 'en' ? 'Portfolio Items' : 'Item Portofolio'
      ];
      return (
        <div className="text-white text-opacity-90 text-sm animate-tile-cycle" key={cycleIndex}>
          {content[cycleIndex]}
        </div>
      );
    }

    if (tile.id === 'files' && filesystemCount) {
      return (
        <div className="text-white text-opacity-90 text-sm">
          {filesystemCount} {language === 'en' ? 'items' : 'item'}
        </div>
      );
    }

    return null;
  };

  return (
    <div
      onClick={handleClick}
      className={`
        rounded-lg p-5 flex flex-col justify-end cursor-pointer
        transition-all duration-200
        animate-tile-enter
        ${tile.size === 'wide' ? 'col-span-2' : 'col-span-1'}
        ${pressed ? 'animate-tile-press' : ''}
        hover:brightness-110
      `}
      style={{
        backgroundColor: tile.color,
        aspectRatio: tile.size === 'wide' ? '2/1' : '1/1',
        animationDelay: `${index * 80}ms`
      }}
    >
      {/* Live Content */}
      {tile.hasLiveContent && (
        <div className="mb-2 min-h-[20px]">
          {getLiveContent()}
        </div>
      )}

      {/* Tile Title */}
      <div className="text-white text-lg font-semibold font-mono">
        {tile.title}
      </div>
    </div>
  );
}

export default MobileTileHome;
