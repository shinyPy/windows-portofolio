import React from 'react';

const MobileNavigation = ({ activeTab, onTabChange, onOpenTerminal }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'projects', label: 'Projects', icon: '💼' },
    { id: 'skills', label: 'Skills', icon: '🛠️' },
    { id: 'about', label: 'About', icon: '👤' }
  ];

  return (
    <nav className="bg-black/80 backdrop-blur-sm border-t border-white/20">
      <div className="flex justify-around items-center py-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center py-2 px-4 rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-white/20 text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <span className="text-lg mb-1">{tab.icon}</span>
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        ))}

        {/* Terminal Button */}
        <button
          onClick={onOpenTerminal}
          className="flex flex-col items-center py-2 px-4 rounded-lg transition-all text-gray-400 hover:text-white hover:bg-white/10"
        >
          <span className="text-lg mb-1">💻</span>
          <span className="text-xs font-medium">Terminal</span>
        </button>
      </div>
    </nav>
  );
};

export default MobileNavigation;
