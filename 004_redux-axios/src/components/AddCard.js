import React from 'react';
import styled, { keyframes } from 'styled-components';

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

const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  width: 100%;
  height: 100%;
`;

const ButtonText = styled.h2`
  color: ${color.darkGray};
`;

const AddCardWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  align-self: center;
  padding: 1em 0.5em;
  box-shadow: 1px 4px 2px 1px #aaa;
  margin: 0.5em;
  background: #eee;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    box-shadow: 1px 4px 2px 2px #aaa;
    animation: ${pulse} 1s ease-in-out both;
  }
`;

const AddCard = () => {
  return (
    <AddCardWrapper>
      <Button role="button" aria-labelledby="Add an album">
        <Icon glyph={plus} size="48" fillColor={color.darkGray} />
        <ButtonText>Add Album</ButtonText>
      </Button>
    </AddCardWrapper>
  );
};

export default AddCard;
