import React from 'react';
import styled from 'styled-components';

const IconContainer = styled.div`
  width: 60px;
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centers items horizontally */
  justify-content: center; /* Centers items vertically */
`;

const IconImage = styled.img`
  width: 37px;
  height: 37px;
`;

const IconLabel = styled.div`
  font-size: 12px;
  color: white;
  margin-top: 5px; /* Adjust space between image and label if needed */
`;

function DesktopIcon({ name, onDoubleClick, iconSrc }) {
  return (
    <IconContainer onDoubleClick={onDoubleClick}>
      <IconImage src={iconSrc} alt={name} />
      <IconLabel>{name}</IconLabel>
    </IconContainer>
  );
}

export default DesktopIcon;
