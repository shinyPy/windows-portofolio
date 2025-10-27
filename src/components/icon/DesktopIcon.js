import React, { useState, useCallback } from 'react';

function DesktopIcon({ name, onDoubleClick, iconSrc, className, delay = 0 }) {
  const [isSelected, setIsSelected] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [shouldBounce, setShouldBounce] = useState(false);

  const handleClick = useCallback((e) => {
    e.stopPropagation();
    setIsSelected(true);
  }, []);

  const handleDoubleClick = useCallback((e) => {
    e.stopPropagation();
    setShouldBounce(true);
    setTimeout(() => {
      setShouldBounce(false);
      if (onDoubleClick) onDoubleClick();
    }, 300);
  }, [onDoubleClick]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <div
      className={`
        desktop-icon
        w-36 text-center cursor-pointer flex flex-col items-center justify-center
        ${isSelected ? 'selected' : ''}
        ${className || ''}
      `}
      style={{ animationDelay: `${delay}ms` }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="icon-image-container relative">
        <img
          src={iconSrc}
          alt={name}
          className={`
            w-14 h-14
            transition-transform duration-200
            ${shouldBounce ? 'animate-icon-bounce-click' : ''}
          `}
        />
      </div>
      <div className="text-white text-sm mt-2 font-mono px-1 select-none">
        {name}
      </div>
    </div>
  );
}

export default DesktopIcon;
