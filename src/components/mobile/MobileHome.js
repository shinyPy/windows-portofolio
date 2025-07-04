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
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 p-4 overflow-y-auto">
      {/* Header */}
      <div className="text-center mb-8 mt-4">
        <h1 className="text-3xl font-bold text-white mb-2">Windows Portfolio</h1>
        <div className="text-white/80 text-sm">
          {currentTime.toLocaleString()}
        </div>
      </div>

      {/* Welcome Message */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6 border border-white/20">
        <h2 className="text-xl font-semibold text-white mb-2">Welcome!</h2>
        <p className="text-white/80 text-sm leading-relaxed">
          {welcomeText || 'Welcome to my interactive portfolio! Explore my projects, skills, and more through this mobile-friendly interface.'}
        </p>
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all active:scale-95"
            >
              <div className="text-2xl mb-2">{action.icon}</div>
              <div className="text-white font-medium text-sm">{action.title}</div>
              <div className="text-white/60 text-xs mt-1">{action.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-3">Recent Activity</h3>
        <div className="space-y-2">
          <div className="flex items-center text-white/80 text-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
            Portfolio updated with new mobile interface
          </div>
          <div className="flex items-center text-white/80 text-sm">
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
            Added responsive design improvements
          </div>
          <div className="flex items-center text-white/80 text-sm">
            <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
            Enhanced user experience for mobile devices
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 text-white/60 text-xs">
        <p>Swipe up to explore more • Tap navigation below</p>
      </div>
    </div>
  );
};

export default MobileHome;
