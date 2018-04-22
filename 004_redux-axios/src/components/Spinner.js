import React from 'react';

import styled, { keyframes } from 'styled-components';
import Icon from './Icon';
import spinner6 from '../icons/spinner6.svg';

const rotate360 = keyframes`
from {
    transform: rotate(0deg);
}
to {
    transform: rotate(360deg);
}
`;

const SpinnerIcon = styled(Icon)`
  display: block;
  position: absolute;
  animation: ${rotate360} 2s linear infinite;
  margin: auto;
  //  padding: 1em;
`;

const Spinner = () => {
  return <SpinnerIcon glyph={spinner6} size="32" />;
};

export default Spinner;
