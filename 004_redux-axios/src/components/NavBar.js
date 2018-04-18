import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { hideVisually } from 'polished';

import Logo from '../components/Logo';
import logoSmall from '../graphics/logo.svg';

const NavBarWrapper = styled.header`
  width: 100%;
  background: #403c3c;
  height: 56px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HamburgerButton = styled.button`
  margin-left: 1em;
  border-color: transparent;
  background-color: transparent;
  background-image: none;
  position: absolute;
  padding: 1em;
  justify-self: start;
  &:hover {
    cursor: pointer;
  }
`;

const HamburgerIconBar = styled.span`
  display: block;

  background: #fff;
  height: 3px;
  width: 22px;
  border-radius: 1px;

  & + span {
    margin-top: 4px;
  }
`;

const StyledLink = styled(Link)`
  margin: 0 auto;
`;

const HamburgerScreenReaderText = styled.span`
  ${hideVisually()};
`;

const NavBar = props => {
  return (
    <NavBarWrapper role="banner">
      <HamburgerButton
        role="button"
        alt="Open menu"
        aria-label="Toggle navigation on"
        onClick={props.toggleHandler}
      >
        <HamburgerScreenReaderText>Toggle navigation</HamburgerScreenReaderText>
        <HamburgerIconBar />
        <HamburgerIconBar />
        <HamburgerIconBar />
      </HamburgerButton>
      <StyledLink to="/">
        <Logo image={logoSmall} />
      </StyledLink>
    </NavBarWrapper>
  );
};

export default NavBar;
