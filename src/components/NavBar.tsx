import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenuAlt4 } from 'react-icons/hi';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { images } from '../constants';

// Navbar component
const Navbar: React.FC = () => {
  // State to manage the menu toggle
  const [toggle, setToggle] = useState(false);

  // Function to handle link click and close the menu
  const handleNavLinkClick = () => {
    setToggle(false);
    window.scrollTo(0, 0); // Scroll to top when a link is clicked
  };

  // Menu items for the navigation bar
  const menuItems = [
    { name: 'Home', path: '', hoverText: 'Home' },
    { name: 'Our Friends', path: '/ourfriends', hoverText: 'Our Friends' },
    { name: 'Contact', path: '/contact', hoverText: 'Contact' }
  ];

  return (
    <Nav>
      {/* Logo */}
      <Logo>
        <img src={images.mcplogo} alt="mcplogo" />
      </Logo>

      {/* Navigation links for larger screens */}
      <NavLinks>
        {menuItems.map((item) => (
          <NavItem key={item.path}>
            <StyledLink to={item.path} onClick={handleNavLinkClick} data-hover={item.hoverText}>
              {item.name}
            </StyledLink>
            <div></div>
          </NavItem>
        ))}
      </NavLinks>

      {/* Hamburger menu for smaller screens */}
      <Menu>
        <HiMenuAlt4 onClick={() => setToggle(true)} />
        {toggle && (
          <>
            <Overlay onClick={() => setToggle(false)} />
            <MenuContent
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.85, ease: 'easeOut' }}
            >
              <ul>
                {menuItems.map((item) => (
                  <NavItem key={item.path}>
                    <StyledLink to={item.path} onClick={handleNavLinkClick}>{item.name}</StyledLink>
                  </NavItem>
                ))}
              </ul>
            </MenuContent>
          </>
        )}
      </Menu>
    </Nav>
  );
};

export default Navbar;

// Styled components

// Navbar container
const Nav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #fff;
  color: #666;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  position: fixed;
  z-index: 2;
  top: 0;
`;

// Logo container
const Logo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  img {
    width: 90px;
    height: 90px;

    @media screen and (min-width: 2000px) {
      width: 170px;
      height: 170px;
    }
  }
`;

// Navigation links container for larger screens
const NavLinks = styled.ul`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

// Individual navigation item
const NavItem = styled.li`
  margin: 0 1rem;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    width: 5px;
    height: 5px;
    background: transparent;
    border-radius: 50%;
    margin-bottom: 5px;
    transition: background-color 0.3s ease;
  }
  
  // Dynamic text that changes font and color
  a {
    color: var(--gray-color);
    text-decoration: none;
    text-transform: uppercase;
    font-weight: 500;
    display: block;
    transition: transform 0.3s ease-in-out, color 0.3s ease-in-out;
    overflow: hidden;

    &::before {
      content: attr(data-hover);
      position: absolute;
      left: 0;
      right: 0;
      top: 100%;
      text-align: center;
      color: #CF529F;
      font-family: 'Bradley Hand', cursive;
      transition: top 0.3s ease, opacity 0.3s ease;
      opacity: 0;
    }

    &:hover,
    &:focus {
      color: transparent;

      &::before {
        top: 0;
        opacity: 1;
      }
    }
  }

  &:hover div {
    background: var(--secondary-color);
  }
`;

// Styled link component
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

// Hamburger menu for smaller screens
const Menu = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  position: absolute;
  right: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #CF529F;
  cursor: pointer;

  svg {
    width: 70%;
    height: 70%;
    color: var(--white-color);
  }

  @media screen and (min-width: 600px) {
    display: none;
  }
`;

// Menu content for the hamburger menu
const MenuContent = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 80%;
  height: 100vh;
  background-color: #fff;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  z-index: 3;

  ul {
    list-style: none;
    padding: 0;
    margin: 2rem 0;
    display: flex;
    flex-direction: column;

    li {
      margin: 1rem 0;
      font-size: 1.2rem;

      a {
        text-decoration: none;
        color: #333;

        &:hover {
          color: #CF529F;
        }
      }
    }
  }
`;

// Overlay for the hamburger menu
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); 
  z-index: 2;
`;
