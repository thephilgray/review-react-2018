import React from 'react';
import styled from 'styled-components';

const Icon = styled.svg`
  color: inherit;
  stroke: currentColor;
  fill: ${props => (props.noFill ? 'transparent' : 'currentColor')};
  width: inherit;
  height: inherit;
  transition: all .25s ease-in-out;
`;
const SmallWrapper = styled.div`
  display: inline-block;
  // margin: 8px;
  color: #1abc9c;
  width: 2em;
  height: 2em;
`;

const LargeWrapper = styled.div`
display: inline-block;
margin: 8px;
color: #1abc9c;
width: 24px;
height: 24px;
`;


export const IconLarge = ({ glyph, noFill, altText }) => (
  <LargeWrapper>
    <Icon noFill={noFill}>
      <title>{altText}</title>
      <use xlinkHref={glyph} />
    </Icon>
  </LargeWrapper>
);


export default ({ glyph, noFill, altText }) => (
  <SmallWrapper>
    <Icon noFill={noFill}>
      <title>{altText}</title>
      <use xlinkHref={glyph} />
    </Icon>
  </SmallWrapper>
);
