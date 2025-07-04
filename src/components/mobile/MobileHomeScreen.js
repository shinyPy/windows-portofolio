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
      name: 'File Manager',
      icon: '📁',
      action: () => onAppOpen('filemanager'),
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      id: 'projects',
      name: 'Projects',
      icon: '💼',
      action: () => onAppOpen('projects'),
      gradient: 'from-green-500 to-blue-500'
    },
    {
      id: 'terminal',
      name: 'Terminal',
      icon: '💻',
      action: onOpenTerminal,
      gradient: 'from-gray-700 to-black'
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: '🔗',
      action: () => window.open('https://github.com/shinyPy/', '_blank'),
      gradient: 'from-gray-800 to-gray-900'
    }
  ];

  const quickActions = [
    { name: 'Camera', icon: '📷', disabled: true },
    { name: 'Calculator', icon: '🔢', disabled: true },
    { name: 'Settings', icon: '⚙️', disabled: true },
    { name: 'Browser', icon: '🌐', disabled: true }
  ];

  return (
    <div className="h-full bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* iOS Dynamic Island Effect */}
      {/* <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full"></div> */}

      <div className="relative z-10 h-full flex flex-col px-6 pt-16">
        {/* Time and Date Widget - iOS Style */}
        <div className="text-center mb-12">
          <div className="text-white text-6xl font-thin tracking-tight mb-2">
            {currentTime.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            })}
          </div>
          <div className="text-white/60 text-lg font-light">
            {currentTime.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>

        {/* Main Apps Grid - iOS Style */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-4 gap-6 px-4">
            {apps.map((app) => (
              <div key={app.id} className="flex flex-col items-center">
                <button
                  onClick={app.action}
                  className="w-16 h-16 rounded-2xl shadow-lg active:scale-90 transition-all duration-150 flex items-center justify-center mb-2"
                  disabled={app.disabled}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${app.gradient} flex items-center justify-center text-2xl shadow-xl border border-white/10`}>
                    {app.icon}
                  </div>
                </button>
                <span className="text-white text-xs font-normal text-center max-w-16 truncate">
                  {app.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* iOS Dock */}
        {/* <div className="mb-8">
          <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-3 mx-2">
            <div className="flex justify-around items-center">
              {quickActions.slice(0, 4).map((action, index) => (
                <button
                  key={index}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl transition-all duration-150 ${
                    action.disabled
                      ? 'bg-white/10 text-white/40'
                      : 'bg-white/20 text-white active:scale-90'
                  }`}
                  disabled={action.disabled}
                >
                  {action.icon}
                </button>
              ))}
            </div>
          </div>
        </div> */}

        {/* iOS Home Indicator */}
        <div className="flex justify-center pb-2">
          <div className="w-36 h-1.5 bg-white/40 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default MobileHomeScreen;
