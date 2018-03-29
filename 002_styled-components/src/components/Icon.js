import React from 'react';
import styled from 'styled-components';

const Icon = styled.svg`
  color: inherit;
  fill: currentColor;
  width: inherit;
  height: inherit;
`;
const IconSmall = styled.div`
  display: inline-block;
  margin: 8px;
  color: #1abc9c;
  width: 16px;
  height: 16px;
`;

export default ({ glyph }) => (
  <IconSmall>
    <Icon>
      <use xlinkHref={glyph} />
    </Icon>
  </IconSmall>
);
