import React from 'react';

function MobileHeader({ activeScreen, onBack, language, onLanguageToggle }) {
  const getScreenTitle = (screen) => {
    if (screen === 'home') return 'Portfolio';
    if (screen === 'filemanager') return 'Files';
    return screen.charAt(0).toUpperCase() + screen.slice(1);
  };

  const isHome = activeScreen === 'home';

  return (
    <div className="fixed top-0 left-0 right-0 z-50 safe-area-inset-top">
      {/* Glassmorphism header with blur */}
      <div className="bg-white/80 dark:bg-gray-900/80 ios-blur border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center justify-between px-4 py-3 min-h-[56px]">
          {/* Left Side - Back Button or Logo */}
          <div className="flex items-center flex-1 min-w-0">
            {!isHome && (
              <button
                onClick={onBack}
                className="flex items-center justify-center w-10 h-10 -ml-2 mr-1 rounded-full text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 active:scale-90"
                aria-label="Go back"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}
            
            {/* Screen Title */}
            <h1 className="ios-title text-lg font-bold text-gray-900 dark:text-white truncate">
              {getScreenTitle(activeScreen)}
            </h1>
          </div>

          {/* Right Side - Language Toggle */}
          {onLanguageToggle && (
            <button
              onClick={onLanguageToggle}
              className="flex items-center justify-center px-4 py-2 ml-3 rounded-xl bg-blue-500 text-white font-semibold text-sm hover:bg-blue-600 transition-all duration-200 active:scale-95 shadow-sm"
              aria-label="Toggle language"
            >
              {language === 'en' ? '🌐 EN' : '🌐 ID'}
            </button>
          )}
        </div>

        {/* Status Bar Spacer for notch devices */}
        {isHome && (
          <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        )}
      </div>
    </div>
  );
}

export default MobileHeader;
