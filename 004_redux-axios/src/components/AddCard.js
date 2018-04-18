import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import plus from '../icons/plus.svg';
import { color } from '../styles.js';

const pulse = keyframes`
  from {
    transform: scale3d(1, 1, 1);
  }

  50% {
    transform: scale3d(1.05, 1.05, 1.05);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
`;

const ButtonText = styled.h2`
  color: ${color.darkGray};
  width: 100%;
  text-align: center;
  margin-bottom: 0;
`;

const AddCardWrapper = styled.div`
  position: relative;
  width: 310px;
  align-self: center;
  padding: 1em;
  box-shadow: 1px 4px 2px 1px #aaa;

  background: #eee;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  &:hover {
    box-shadow: 1px 4px 2px 2px #aaa;
    animation: ${pulse} 1s ease-in-out both;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  margin: 0.5em;
`;

const AddCard = () => {
  return (
    <StyledLink to="/add">
      <AddCardWrapper>
        <Icon glyph={plus} size="48" fillColor={color.darkGray} />
        <ButtonText>Add Album</ButtonText>
      </AddCardWrapper>
    </StyledLink>
  );
};

export default AddCard;
