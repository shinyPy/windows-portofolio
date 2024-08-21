import styled from 'styled-components';
import backgroundImage from '../../assets/images/background.jpg';

export const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${backgroundImage}) no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  ${({ isMobile }) => isMobile && `
    filter: blur(5px);
  `}
`;

export const DesktopContainer = styled.div`
  flex-wrap: wrap;
  padding: 25px;
  .desktop-icon {
    margin: 10px;
  }
`;

export const WarningContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 20px;
  border-radius: 10px;
  display: ${props => (props.isMobile ? 'flex' : 'none')};
  z-index: 100;
  .warning-message {
    font-size: 18px;
    text-align: center;
  }
`;