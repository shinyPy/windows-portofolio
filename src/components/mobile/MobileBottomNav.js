import React, { useState, useCallback } from 'react';

function MobileBottomNav({ activeScreen, onNavigate }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'About', icon: '👤' },
    { id: 'projects', label: 'Projects', icon: '💼' },
    { id: 'terminal', label: 'Terminal', icon: '⌨️' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-gray-800 border-t border-gray-700 flex justify-around items-center z-50 backdrop-blur-md bg-opacity-95">
      {navItems.map((item) => (
        <NavItem
          key={item.id}
          item={item}
          isActive={activeScreen === item.id}
          onClick={() => onNavigate(item.id)}
        />
      ))}
    </div>
  );
}

function NavItem({ item, isActive, onClick }) {
  const [pressed, setPressed] = useState(false);

  const handleClick = useCallback(() => {
    setPressed(true);
    setTimeout(() => {
      setPressed(false);
      onClick();
    }, 250);
  }, [onClick]);

  return (
    <div
      onClick={handleClick}
      className={`
        flex flex-col items-center justify-center
        cursor-pointer transition-all duration-200 relative
        ${pressed ? 'animate-taskbar-press' : ''}
        ${isActive ? 'text-blue-500' : 'text-gray-400'}
        hover:text-blue-400
      `}
    >
      {/* Icon */}
      <div className="text-2xl mb-1">
        {item.icon}
      </div>

      {/* Label */}
      <div className={`text-xs font-mono ${isActive ? 'font-semibold' : ''}`}>
        {item.label}
      </div>

      {/* Active Indicator */}
      {isActive && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-blue-500 rounded-t-full transition-all duration-300" />
      )}
    </div>
  );
}

export default MobileBottomNav;
