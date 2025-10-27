import React from 'react';

function MobileHeader({ activeScreen, onBack, language, onLanguageToggle }) {
  const getScreenTitle = (screen) => {
    if (screen === 'home') return 'Portfolio';
    return screen.charAt(0).toUpperCase() + screen.slice(1);
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-14 bg-gray-800 border-b border-gray-700 flex items-center px-4 z-50">
      {/* Back Button - Only show when not on home */}
      {activeScreen !== 'home' && (
        <button
          onClick={onBack}
          className="mr-4 text-white hover:brightness-125 transition-all duration-200 active:animate-taskbar-press"
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
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      {/* Screen Title */}
      <div className="flex-1 text-center text-white text-lg font-semibold font-mono">
        {getScreenTitle(activeScreen)}
      </div>

      {/* Language Toggle */}
      {onLanguageToggle && (
        <button
          onClick={onLanguageToggle}
          className="ml-4 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 hover:scale-105 font-mono text-sm"
          aria-label="Toggle language"
        >
          {language === 'en' ? 'EN' : 'ID'}
        </button>
      )}
    </div>
  );
}

export default MobileHeader;
