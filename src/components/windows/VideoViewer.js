// src/components/windows/VideoViewer.js
import React from 'react';
import styled from 'styled-components';

const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #000;
  color: #fff;
  position: relative;

  video {
    max-width: 90%;
    max-height: 90%;
  }

  button {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #fff;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
  }
`;

const VideoViewer = ({ title, src, onClose }) => (
  <VideoContainer>
    <button onClick={onClose}>Close</button>
    <video controls>
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </VideoContainer>
);

export default VideoViewer;