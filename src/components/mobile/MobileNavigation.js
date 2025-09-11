import React from 'react';

const MobileNavigation = ({ activeTab, onTabChange, onOpenTerminal }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'projects', label: 'Projects', icon: '💼' },
    { id: 'skills', label: 'Skills', icon: '🛠️' },
    { id: 'about', label: 'About', icon: '👤' }
  ];

  return (
    <nav className="ios-tab-bar dark:ios-tab-bar-dark ios-shadow-lg safe-area-inset-bottom">
      <div className="flex justify-around items-center py-1 px-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`ios-tab-item min-w-0 flex-1 transition-all duration-200 active:scale-95 ${
              activeTab === tab.id
                ? 'ios-tab-item-active'
                : 'ios-tab-item-inactive hover:text-blue-400'
            }`}
          >
            <div className="flex flex-col items-center space-y-1">
              <span className="text-lg">{tab.icon}</span>
              <span className={`text-xs font-medium leading-tight ${
                activeTab === tab.id ? 'text-blue-500' : 'text-gray-400'
              }`}>
                {tab.label}
              </span>
            </div>
          </button>
        ))}

        {/* Terminal Button */}
        <button
          onClick={onOpenTerminal}
          className="ios-tab-item min-w-0 flex-1 ios-tab-item-inactive hover:text-blue-400 transition-all duration-200 active:scale-95"
        >
          <div className="flex flex-col items-center space-y-1">
            <span className="text-lg">💻</span>
            <span className="text-xs font-medium leading-tight text-gray-400">Terminal</span>
          </div>
        </button>
      </div>
      
      {/* iOS Home Indicator */}
      <div className="ios-home-indicator dark:ios-home-indicator-dark"></div>
    </nav>
  );
};

export default MobileNavigation;
