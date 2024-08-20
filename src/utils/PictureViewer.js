// src/components/windows/PictureViewer.js
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
  position: relative;

  img {
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

const PictureViewer = ({ title, src, onClose }) => (
  <ImageViewer>
    <button onClick={onClose}>Close</button>
    <img src={src} alt={title} />
  </ImageViewer>
);

export default PictureViewer;