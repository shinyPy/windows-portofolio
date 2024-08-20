// components/ContextMenu.js
import React from 'react';

const ContextMenu = ({ x, y, options, onSelect }) => (
  <div style={{ top: y, left: x, position: 'absolute', background: '#fff', border: '1px solid #ccc', zIndex: 100 }}>
    {options.map(option => (
      <div key={option.label} onClick={() => onSelect(option.value)}>{option.label}</div>
    ))}
  </div>
);

export default ContextMenu;
