import React from 'react';

const MobileSpotifyPlayer = ({ onClose, language = 'en' }) => {
  const text = {
    en: {
      title: 'Spotify',
      myPlaylist: 'My Playlist',
      description: 'Listen to my favorite tracks and discover my music taste',
      nowPlaying: 'Now Playing'
    },
    id: {
      title: 'Spotify',
      myPlaylist: 'Daftar Putar Saya',
      description: 'Dengarkan lagu favorit saya dan temukan selera musik saya',
      nowPlaying: 'Sedang Diputar'
    }
  };

  const t = text[language] || text.en;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 z-50 flex flex-col animate-slide-up-screen">
      {/* Header */}
      <div className="bg-gray-900/95 ios-blur px-4 h-16 flex items-center justify-between border-b border-gray-700/50">
        <div className="flex items-center flex-1">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mr-3 ios-shadow-sm">
            <span className="text-white text-xl">🎵</span>
          </div>
          <span className="text-white text-lg font-bold">{t.title}</span>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors active:scale-95"
          aria-label="Close Spotify player"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Header Card */}
          <div className="ios-card dark:ios-card-dark p-6 mb-6 text-center ios-fade-in">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 via-green-500 to-blue-500 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-4 ios-shadow-lg animate-pulse">
              ♪
            </div>
            <h3 className="text-gray-900 dark:text-white text-xl font-bold mb-2">{t.myPlaylist}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {t.description}
            </p>
          </div>

          {/* Spotify Embed Card */}
          <div className="ios-card dark:ios-card-dark p-4 mb-4 ios-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center mb-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-gray-700 dark:text-gray-300 text-sm font-semibold">{t.nowPlaying}</span>
            </div>
            <iframe
              src="https://open.spotify.com/embed/playlist/0or34uqY4LUkkBxaBoCBjM?utm_source=generator"
              title="Spotify Playlist"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-xl ios-shadow-lg"
            ></iframe>
          </div>

          {/* Features Info */}
          <div className="grid grid-cols-3 gap-3 ios-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="ios-card dark:ios-card-dark p-4 text-center">
              <div className="text-2xl mb-2">🎧</div>
              <div className="text-gray-600 dark:text-gray-400 text-xs font-medium">
                {language === 'en' ? 'Listen' : 'Dengarkan'}
              </div>
            </div>
            <div className="ios-card dark:ios-card-dark p-4 text-center">
              <div className="text-2xl mb-2">💚</div>
              <div className="text-gray-600 dark:text-gray-400 text-xs font-medium">
                {language === 'en' ? 'Enjoy' : 'Nikmati'}
              </div>
            </div>
            <div className="ios-card dark:ios-card-dark p-4 text-center">
              <div className="text-2xl mb-2">🎶</div>
              <div className="text-gray-600 dark:text-gray-400 text-xs font-medium">
                {language === 'en' ? 'Discover' : 'Temukan'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSpotifyPlayer;
