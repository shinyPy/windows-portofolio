import React, { useState, useEffect } from 'react';

const MobileHome = ({ filesystem, findItemById, onNavigate, onOpenTerminal }) => {
  const [welcomeText, setWelcomeText] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Load welcome text
    const welcomeFile = findItemById(filesystem, 13); // welcome.txt
    if (welcomeFile) {
      setWelcomeText('Welcome to my interactive portfolio! Explore my projects, skills, and more.');
    }

    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [findItemById, filesystem]);

  const quickActions = [
    {
      title: 'View Projects',
      icon: '💼',
      action: () => onNavigate('projects'),
      description: 'See my latest work',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'My Skills',
      icon: '🛠️',
      action: () => onNavigate('skills'),
      description: 'Technologies I use',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'About Me',
      icon: '👤',
      action: () => onNavigate('about'),
      description: 'Learn more about me',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Terminal',
      icon: '💻',
      action: onOpenTerminal,
      description: 'Open command line',
      color: 'from-gray-700 to-gray-800'
    }
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-black overflow-y-auto ios-fade-in">
      {/* iOS Navigation Bar */}
      <div className="bg-white/95 dark:bg-black/95 ios-blur border-b border-gray-200/50 dark:border-gray-800/50 px-6 py-4 safe-area-inset-top">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="ios-title text-black dark:text-white">Portfolio</h1>
            <p className="ios-caption dark:text-gray-400 mt-1">
              {currentTime.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center ios-shadow">
            <span className="text-white font-semibold text-sm">SP</span>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-6 space-y-6">
        {/* Welcome Card */}
        <div className="ios-card dark:ios-card-dark p-6 ios-fade-in">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4 ios-shadow-sm">
              <span className="text-white text-xl">👋</span>
            </div>
            <h2 className="ios-title text-black dark:text-white">Welcome!</h2>
          </div>
          <p className="ios-body text-gray-600 dark:text-gray-300">
            {welcomeText || 'Welcome to my interactive portfolio! Explore my projects, skills, and more through this iOS-style interface.'}
          </p>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="ios-title text-black dark:text-white mb-4 px-2">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="ios-card dark:ios-card-dark p-5 hover:ios-shadow-lg transition-all duration-200 active:scale-95 ios-bounce"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-3 ios-shadow-sm`}>
                  <span className="text-white text-xl">{action.icon}</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-black dark:text-white text-sm mb-1">{action.title}</div>
                  <div className="ios-caption text-xs dark:text-gray-400">{action.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity Card */}
        <div className="ios-card dark:ios-card-dark p-6">
          <div className="flex items-center mb-5">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mr-4 ios-shadow-sm">
              <span className="text-white text-xl">🎯</span>
            </div>
            <h3 className="ios-title text-black dark:text-white">Recent Updates</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-4 flex-shrink-0"></div>
              <span className="ios-body text-gray-600 dark:text-gray-300 text-sm">
                Portfolio updated with iOS Design System
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-4 flex-shrink-0"></div>
              <span className="ios-body text-gray-600 dark:text-gray-300 text-sm">
                Enhanced mobile user experience
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-4 flex-shrink-0"></div>
              <span className="ios-body text-gray-600 dark:text-gray-300 text-sm">
                Added blur effects and animations
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHome;
