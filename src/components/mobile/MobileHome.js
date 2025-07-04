import React, { useState, useEffect } from 'react';

const MobileHome = ({ filesystem, findItemById, onNavigate, onOpenTerminal }) => {
  const [welcomeText, setWelcomeText] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Load welcome text
    const welcomeFile = findItemById(13); // welcome.txt
    if (welcomeFile) {
      setWelcomeText('Welcome to my interactive portfolio! Explore my projects, skills, and more.');
    }

    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [findItemById]);

  const quickActions = [
    {
      title: 'View Projects',
      icon: '💼',
      action: () => onNavigate('projects'),
      description: 'See my latest work'
    },
    {
      title: 'My Skills',
      icon: '🛠️',
      action: () => onNavigate('skills'),
      description: 'Technologies I use'
    },
    {
      title: 'About Me',
      icon: '👤',
      action: () => onNavigate('about'),
      description: 'Learn more about me'
    },
    {
      title: 'Terminal',
      icon: '💻',
      action: onOpenTerminal,
      description: 'Open command line'
    }
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-800 overflow-y-auto">
      {/* App Bar */}
      <div className="bg-white dark:bg-gray-900 shadow-md p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Portfolio</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {currentTime.toLocaleString()}
            </p>
          </div>
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">SP</span>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4">
        {/* Welcome Card */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 mb-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-lg">👋</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Welcome!</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            {welcomeText || 'Welcome to my interactive portfolio! Explore my projects, skills, and more through this Android-style interface.'}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-200 active:scale-95"
              >
                <div className="text-2xl mb-2">{action.icon}</div>
                <div className="text-gray-900 dark:text-white font-medium text-sm">{action.title}</div>
                <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">{action.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity Card */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-lg">📱</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Updates</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Portfolio updated with Android Material Design
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              Added responsive design improvements
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
              Enhanced mobile user experience
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHome;
