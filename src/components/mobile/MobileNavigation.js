import React from 'react';

const MobileNavigation = ({ activeTab, onTabChange, onOpenTerminal }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'projects', label: 'Projects', icon: '💼' },
    { id: 'skills', label: 'Skills', icon: '🛠️' },
    { id: 'about', label: 'About', icon: '👤' }
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="flex justify-around items-center py-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center py-3 px-4 rounded-xl transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <span className="text-xl mb-1">{tab.icon}</span>
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        ))}

        {/* Terminal Button */}
        <button
          onClick={onOpenTerminal}
          className="flex flex-col items-center py-3 px-4 rounded-xl transition-all duration-200 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <span className="text-xl mb-1">💻</span>
          <span className="text-xs font-medium">Terminal</span>
        </button>
      </div>
    </nav>
  );
};

export default MobileNavigation;
