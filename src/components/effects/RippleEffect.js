import React, { useEffect } from 'react';

function RippleEffect({ x, y, onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 600);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className="ripple-circle animate-ripple-effect"
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        background: 'rgba(0, 120, 212, 0.5)',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
      }}
    />
  );
}

export default RippleEffect;
