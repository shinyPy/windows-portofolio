import React from 'react';

function DesktopIcon({ name, onDoubleClick, iconSrc, className }) {
  return (
    <div
      className={`w-36 text-center cursor-pointer flex flex-col items-center justify-center ${className}`}
      onDoubleClick={onDoubleClick}
    >
      <img 
        src={iconSrc} 
        alt={name} 
        className="w-14 h-14" 
      />
      <div 
        className="text-white text-sm mt-2 font-mono" 
      >
        {name}
      </div>
    </div>
  );
}

export default DesktopIcon;
