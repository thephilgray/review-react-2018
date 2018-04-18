import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import styled from 'styled-components';

import Logo from './Logo';
import MenuLogo from '../graphics/logo-menu.svg';

const NavigationWrapper = styled.div`
  justify-self: flex-start;
  margin-top: 3em;
`;

const NavigationBranding = styled.div`
  padding: 1em;
`;

const NavigationMenu = styled.nav`
  text-align: center;
  font-size: 2em;
`;

const NavigationList = styled.ul`
  list-style: none;
  padding: 0;
`;

const NavigationItem = styled.li`
  cursor: pointer;
`;

const StyledNavLink = styled(NavLink)`
  color: #fff;
  text-decoration: none;

  &.active {
    font-weight: 800;

    li:before {
       {
        content: '> ';
      }
    }
  }
`;

const NavigationOverlay = props => {
  return (
    <NavigationWrapper>
      <NavigationBranding>
        <Link to="/">
          <Logo image={MenuLogo} title="Album Collector Logo" />
        </Link>
      </NavigationBranding>
      <NavigationMenu role="navigation">
        <NavigationList>
          <StyledNavLink to="/" exact>
            <NavigationItem>Home</NavigationItem>
          </StyledNavLink>
          <StyledNavLink to="/add" exact>
            <NavigationItem>Add</NavigationItem>
          </StyledNavLink>
        </NavigationList>
      </NavigationMenu>
    </NavigationWrapper>
  );
};

export default NavigationOverlay;
