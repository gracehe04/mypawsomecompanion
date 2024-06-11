import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Footer component
const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>© 2024 My Pawsome Companion</FooterText>
        <FooterLinks>
          <FooterLink to="/ourfriends">Our Friends</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
        </FooterLinks>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

// Styled components

// Container for the footer
const FooterContainer = styled.footer`
  width: 100%;
  padding: 20px;
  background-color: #cf529f;
  color: #fff;
  text-align: center;
  flex-shrink: 0;
  box-sizing: border-box;
`;

// Content wrapper to center content within the footer
const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    width: 80%; 
    margin: 0 auto; 
  }
`;

// Footer text for copyright or any static text
const FooterText = styled.p`
  margin: 0;
  padding: 10px 0;
  font-size: 0.9rem;
`;

// Container for footer links
const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

// Styled link for the footer
const FooterLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin: 5px 0;

  @media (min-width: 768px) {
    margin: 0 10px;
  }

  &:hover {
    text-decoration: underline;
  }
`;
