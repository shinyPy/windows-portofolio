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

  video {
    max-width: 90%;
    max-height: 90%;
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