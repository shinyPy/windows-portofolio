import React from 'react';

const MobileInAppNavigation = ({ title, onBack }) => {
  return (
    <div className="bg-white/95 dark:bg-black/95 ios-blur border-b border-gray-200/50 dark:border-gray-800/50 px-4 py-3 safe-area-inset-top">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full flex items-center justify-center ios-blue hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 active:scale-95 mr-3"
          >
            <span className="text-lg">‹</span>
          </button>
          <h1 className="ios-title text-black dark:text-white">{title}</h1>
        </div>
      </div>
    </div>
  );
};

export default MobileInAppNavigation;
