import React from 'react';
import './Preloader.css';

const Preloader = () => {
  return (
    <div className="preloader-container">
      <div className="preloader-content">
        <div className="preloader-logo">
          <div className="preloader-spinner"></div>
        </div>
        <div className="preloader-text">Loading Windows Portfolio...</div>
        <div className="preloader-progress">
          <div className="preloader-progress-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
