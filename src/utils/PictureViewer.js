import React from 'react';
import styled from 'styled-components';

const ImageViewer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #000;
  color: #fff;

  img {
    max-width: 90%;
    max-height: 90%;
  }
`;

const PictureViewer = ({ title, src, onClose }) => (
  <ImageViewer>
    <button onClick={onClose}>Close</button>
    <img src={src} alt={title} />
  </ImageViewer>
);

export default PictureViewer;