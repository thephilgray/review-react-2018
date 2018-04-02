import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import styledProps from 'styled-props';
import { hideVisually } from 'polished';

import { background, color } from '../styles';
import Icon from './Icon';
import cross from '../icons/cross.svg';

const propTypes = {
  backgroundOpacity: PropTypes.number,
  toggled: PropTypes.bool,
  toggleHandler: PropTypes.func
};

const defaultProps = {
  backgroundOpacity: 0.9,
  toggled: false
};

const OverlayWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  top: 0;
  background: #000;
  position: ${props => (props.toggled ? 'absolute' : 'relative')}
  overflow: auto;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-out;
  opacity: ${props => (props.toggled ? 1 : 0)};
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
  transition: all 0.5s ease-out;
  transform: ${props =>
    props.toggled ? 'translateX(0)' : 'translateX(-101vw)'};
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

class Overlay extends React.Component {
  render() {
    return (
      <OverlayWrapper toggled={this.props.toggled}>
        <OverlayContainer primary role="dialog" toggled={this.props.toggled}>
          <CloseButton
            role="button"
            alt="Close menu"
            aria-label="Toggle navigation off"
            onClick={this.props.toggleHandler}
          >
            <CloseScreenReaderText>Toggle navigation</CloseScreenReaderText>
            <Icon glyph={cross} fillColor="#fff" />
          </CloseButton>
          <ContentContainer>{this.props.children}</ContentContainer>
        </OverlayContainer>
      </OverlayWrapper>
    );
  }
}

Overlay.propTypes = propTypes;
Overlay.defaultProps = defaultProps;

export default Overlay;
