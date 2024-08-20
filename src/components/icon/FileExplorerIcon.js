import React from 'react';
import styled from 'styled-components';

const IconContainer = styled.div`
  width: 60px;
  text-align: center;
  cursor: pointer;
`;

const IconImage = styled.img`
  width: 48px;
  height: 48px;
`;

const IconLabel = styled.div`
  font-size: 12px;
  color: white;
`;

function FileExplorerIcon({ name, onDoubleClick, iconSrc }) {
  return (
    <IconContainer onDoubleClick={onDoubleClick}>
      <IconImage src={iconSrc} alt={name} />
      <IconLabel>{name}</IconLabel>
    </IconContainer>
  );
}

export default FileExplorerIcon;