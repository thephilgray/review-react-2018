import React from 'react';

import styled from 'styled-components';

const NavigationWrapper = styled.div`
  justify-self: flex-start;
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
