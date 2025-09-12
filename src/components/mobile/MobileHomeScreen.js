import React, { useState, useEffect } from 'react';

const MobileHomeScreen = ({ filesystem, findItemById, onAppOpen, onOpenTerminal }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const apps = [
    {
      id: 'filemanager',
      name: 'Files',
      icon: '📁',
      action: () => onAppOpen('filemanager'),
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: '🔗',
      action: () => window.open('https://github.com/shinyPy/', '_blank'),
      gradient: 'from-gray-800 to-gray-900'
    }
  ];

  return (
    <div className="h-full bg-gradient-to-b from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Dynamic Island */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-10"></div>
      
      {/* Wallpaper overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10 h-full flex flex-col px-6 pt-16">
        {/* Time and Date Widget - iOS Style */}
        <div className="text-center mb-8">
          <div className="text-white text-7xl font-ultralight tracking-tight mb-2 text-shadow-md">
            {currentTime.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            })}
          </div>
          <div className="text-white/80 text-lg font-light tracking-wide text-shadow-sm">
            {currentTime.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>

        {/* Main Apps Grid - iOS Style */}
        <div className="flex-1 flex flex-col justify-start pt-8">
          <div className="grid grid-cols-4 gap-6 px-4 mb-8">
            {apps.map((app, index) => (
              <div key={app.id} className="flex flex-col items-center ios-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <button
                  onClick={app.action}
                  className="ios-app-icon mb-2"
                  disabled={app.disabled}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${app.gradient} flex items-center justify-center text-2xl shadow-2xl border border-white/20`}>
                    {app.icon}
                  </div>
                </button>
                <span className="text-white text-xs font-medium text-center max-w-16 truncate text-shadow-sm">
                  {app.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* iOS Home Indicator */}
        <div className="flex justify-center pb-2">
          <div className="ios-home-indicator-dark"></div>
        </div>
      </div>
    </div>
  );
};

export default MobileHomeScreen;
