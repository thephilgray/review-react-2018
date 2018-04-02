import React from 'react';

import styled from 'styled-components';

import Logo from '../graphics/logo-menu.svg';

const NavigationWrapper = styled.div`
  justify-self: flex-start;
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
  & > a {
    color: #fff;
    text-decoration: none;
  }
`;

const NavigationOverlay = props => {
  return (
    <NavigationWrapper>
      <NavigationBranding>
        <img src={Logo} alt="Album Collector Logo" />
      </NavigationBranding>
      <NavigationMenu role="navigation">
        <NavigationList>
          <NavigationItem>Home</NavigationItem>
          <NavigationItem>Add</NavigationItem>
        </NavigationList>
      </NavigationMenu>
    </NavigationWrapper>
  );
};

export default NavigationOverlay;
