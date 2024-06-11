import React from 'react';
import styled from 'styled-components';
import DesktopBanner from './DesktopBanner'; 
import MobileBanner from './MobileBanner';
import PetsDisplay from './PetsDisplay'; 
import Information from './Information';

// Home component

const Home: React.FC = () => {
  return (
    <Container>
      <DesktopSlider>
        <DesktopBanner />
      </DesktopSlider>
      <MobileSlider>
        <MobileBanner />
      </MobileSlider>
      <Header>
        <HeaderInfo>
          <HeaderText>Find Your New Best Friend</HeaderText>
        </HeaderInfo>
      </Header>
      <PetsDisplay /> 
      <Information />
    </Container>
  );
};

// Styled components

export default Home;

const Container = styled.div`
  padding: 0;
`;

const DesktopSlider = styled.div`
  display: none;
  padding-top: 125px;

  @media (min-width: 700px) {
    display: block;
  }
`;

const MobileSlider = styled.div`
  display: none;
  padding-top: 125px;
  
  @media (max-width: 700px) {
    display: block;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-direction: column;
`;

const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
  padding-right: 100px;
  padding-left: 100px;
`;

const HeaderText = styled.span`
  font-size: 2rem;
  font-weight: bold;
  color: #cf529f;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 10px 20px;
`;
