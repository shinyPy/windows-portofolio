import React from 'react';
import { IoHome, IoHomeOutline, IoBriefcase, IoBriefcaseOutline, IoBuild, IoBuildOutline, IoPerson, IoPersonOutline, IoTerminal } from 'react-icons/io5';

const MobileNavigation = ({ activeTab, onTabChange, onOpenTerminal }) => {
  const tabs = [
    { id: 'home', label: 'Home', Icon: IoHome, IconOutline: IoHomeOutline },
    { id: 'projects', label: 'Projects', Icon: IoBriefcase, IconOutline: IoBriefcaseOutline },
    { id: 'skills', label: 'Skills', Icon: IoBuild, IconOutline: IoBuildOutline },
    { id: 'about', label: 'About', Icon: IoPerson, IconOutline: IoPersonOutline }
  ];

  return (
    <nav className="ios-tab-bar dark:ios-tab-bar-dark ios-shadow-lg safe-area-inset-bottom">
      <div className="flex justify-around items-center py-1 px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const IconComponent = isActive ? tab.Icon : tab.IconOutline;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`ios-tab-item min-w-0 flex-1 transition-all duration-200 active:scale-95 ${
                isActive
                  ? 'ios-tab-item-active'
                  : 'ios-tab-item-inactive hover:text-blue-400'
              }`}
            >
              <div className="flex flex-col items-center space-y-1">
                <IconComponent className={`text-2xl ${isActive ? 'text-blue-500' : 'text-gray-400'}`} />
                <span className={`text-xs font-medium leading-tight ${
                  isActive ? 'text-blue-500' : 'text-gray-400'
                }`}>
                  {tab.label}
                </span>
              </div>
            </button>
          );
        })}

        {/* Terminal Button */}
        <button
          onClick={onOpenTerminal}
          className="ios-tab-item min-w-0 flex-1 ios-tab-item-inactive hover:text-blue-400 transition-all duration-200 active:scale-95"
        >
          <div className="flex flex-col items-center space-y-1">
            <IoTerminal className="text-2xl text-gray-400" />
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
