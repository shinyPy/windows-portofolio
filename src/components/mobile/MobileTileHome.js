import React, { useState, useEffect } from 'react';

function MobileTileHome({ onTileClick, language, filesystemCount }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const tiles = [
    {
      id: 'about',
      title: language === 'en' ? 'About Me' : 'Tentang Saya',
      subtitle: language === 'en' ? 'Learn more' : 'Pelajari lebih',
      icon: '👤',
      color: 'from-blue-500 to-blue-600',
      size: 'large'
    },
    {
      id: 'projects',
      title: language === 'en' ? 'Projects' : 'Proyek',
      subtitle: language === 'en' ? 'View my work' : 'Lihat karya',
      icon: '💼',
      color: 'from-purple-500 to-purple-600',
      size: 'large'
    },
    {
      id: 'skills',
      title: language === 'en' ? 'Skills' : 'Keterampilan',
      subtitle: language === 'en' ? 'My expertise' : 'Keahlian',
      icon: '🛠️',
      color: 'from-green-500 to-green-600',
      size: 'medium'
    },
    {
      id: 'files',
      title: language === 'en' ? 'Files' : 'Berkas',
      subtitle: `${filesystemCount || 0} ${language === 'en' ? 'items' : 'item'}`,
      icon: '📁',
      color: 'from-yellow-500 to-orange-500',
      size: 'medium'
    },
    {
      id: 'terminal',
      title: 'Terminal',
      subtitle: language === 'en' ? 'Command line' : 'Baris perintah',
      icon: '💻',
      color: 'from-gray-700 to-gray-900',
      size: 'medium'
    },
    {
      id: 'spotify',
      title: 'Spotify',
      subtitle: language === 'en' ? 'My playlist' : 'Daftar putar',
      icon: '🎵',
      color: 'from-green-400 to-green-600',
      size: 'medium'
    },
  ];

  const formatTime = () => {
    return currentTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = () => {
    return currentTime.toLocaleDateString(language === 'en' ? 'en-US' : 'id-ID', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black pb-safe">
      {/* Hero Section with Time */}
      <div className="pt-20 px-6 pb-8 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
        <div className="ios-fade-in">
          <div className="text-white/90 text-sm font-medium mb-2">
            {formatDate()}
          </div>
          <div className="text-white text-5xl font-bold mb-4">
            {formatTime()}
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center">
              <span className="text-white text-xl">👋</span>
            </div>
            <div className="text-white text-lg font-semibold">
              {language === 'en' ? 'Welcome' : 'Selamat datang'}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="flex-1 px-4 py-6 -mt-8">
        <div className="grid grid-cols-2 gap-4">
          {tiles.map((tile, index) => (
            <Tile
              key={tile.id}
              tile={tile}
              index={index}
              onClick={() => onTileClick(tile.id)}
            />
          ))}
        </div>

        {/* Info Card */}
        <div className="mt-6 ios-card dark:ios-card-dark p-6 ios-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white text-lg">✨</span>
            </div>
            <h3 className="ios-title text-base font-bold text-gray-900 dark:text-white">
              {language === 'en' ? 'Interactive Portfolio' : 'Portofolio Interaktif'}
            </h3>
          </div>
          <p className="ios-body text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {language === 'en' 
              ? 'Explore my work, skills, and experience through this modern mobile interface.'
              : 'Jelajahi karya, keterampilan, dan pengalaman saya melalui antarmuka mobile modern ini.'}
          </p>
        </div>
      </div>
    </div>
  );
}

function Tile({ tile, index, onClick }) {
  const [pressed, setPressed] = useState(false);

  const handleClick = () => {
    setPressed(true);
    setTimeout(() => {
      setPressed(false);
      onClick();
    }, 150);
  };

  const sizeClasses = {
    large: 'col-span-2 aspect-[2/1]',
    medium: 'col-span-1 aspect-square'
  };

  return (
    <button
      onClick={handleClick}
      className={`
        ${sizeClasses[tile.size]}
        bg-gradient-to-br ${tile.color}
        rounded-2xl p-5
        flex flex-col justify-end
        ios-shadow-lg
        transition-all duration-200
        ${pressed ? 'scale-95' : 'scale-100 hover:scale-[1.02]'}
        ios-fade-in
        relative overflow-hidden
      `}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white rounded-full blur-2xl" />
        <div className="absolute -left-4 -bottom-4 w-32 h-32 bg-black rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="text-4xl mb-3">
          {tile.icon}
        </div>

        {/* Text */}
        <div className="text-left">
          <div className="text-white font-bold text-lg mb-1 leading-tight">
            {tile.title}
          </div>
          <div className="text-white/80 text-sm font-medium">
            {tile.subtitle}
          </div>
        </div>
      </div>

      {/* Shine Effect */}
      {!pressed && (
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent transform translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
      )}
    </button>
  );
}

export default MobileTileHome;
