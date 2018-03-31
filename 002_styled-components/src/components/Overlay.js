import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import styledProps from 'styled-props';
import { hideVisually } from 'polished';

import { background, color } from '../styles';
import Icon from './Icon';
import cross from '../icons/cross.svg';

const propTypes = {
  backgroundOpacity: PropTypes.number
};

const defaultProps = {
  backgroundOpacity: 0.9
};

const OverlayWrapper = styled.div`
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: #000;
  position: fixed;
  overflow: auto;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OverlayContainer = styled.div`
  display: flex;
  padding: 1em;
  max-width: 95%;
  height: 95%;
  background: ${styledProps(background)};
  color: ${styledProps(color)};
  flex: 1;
  box-sizing: border-box;
  position: relative;
`;

const CloseButton = styled.button`
  color: #fff;
  border-color: transparent;
  background-color: transparent;
  background-image: none;
  right: 2em;
  position: absolute;
  padding: 1em;
  transform: translate3d(0, 0, 0);
  z-index: 10;
  transition: all 0.1s ease-out;

  &:hover {
    cursor: pointer;
  }
`;

const CloseScreenReaderText = styled.span`
  ${hideVisually()};
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
`;

const Overlay = props => {
  return (
    <OverlayWrapper>
      <OverlayContainer primary role="dialog">
        <CloseButton
          role="button"
          alt="Close menu"
          aria-label="Toggle navigation off"
        >
          <CloseScreenReaderText>Toggle navigation</CloseScreenReaderText>
          <Icon glyph={cross} fillColor="#fff" />
        </CloseButton>
        <ContentContainer>{props.children}</ContentContainer>
      </OverlayContainer>
    </OverlayWrapper>
  );
};

Overlay.propTypes = propTypes;
Overlay.defaultProps = defaultProps;

export default Overlay;
