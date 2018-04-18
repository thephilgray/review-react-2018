import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import questionIcon from '../icons/question.svg';

const propTypes = {
  glyph: PropTypes.object,
  size: PropTypes.string,
  inverted: PropTypes.bool,
  fillColor: PropTypes.string,
  strokeColor: PropTypes.string,
  altText: PropTypes.string
};

const defaultProps = {
  glyph: questionIcon,
  size: '24',
  inverted: false,
  fillColor: 'currentColor',
  strokeColor: 'currentColor',
  altText: ''
};

const SvgIcon = styled.svg`
  color: ${props => props.fillColor};
  stroke: ${props => props.strokeColor};
  fill: ${props => (props.inverted ? 'transparent' : props.fillColor)};
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  transition: all 0.25s ease-in-out;
`;

const Icon = ({
  className,
  children,
  glyph,
  inverted,
  altText,
  fillColor,
  strokeColor,
  size
}) => (
  <SvgIcon
    inverted={inverted}
    fillColor={fillColor}
    strokeColor={strokeColor}
    viewBox={`${glyph.viewBox}`}
    size={size}
    className={className}
  >
    <title>{altText ? altText : glyph.id}</title>
    <use xlinkHref={`#${glyph.id}`} />
  </SvgIcon>
);

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;
