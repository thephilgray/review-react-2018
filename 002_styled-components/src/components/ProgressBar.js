import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const propTypes = {
  percentage: PropTypes.number
};

const defaultProps = {
  percentage: 0
};

const ProgressBarWrapper = styled.div`
  position: relative;
  margin: 1em 0;
  width: 100%;
  height: 20px;
  border: 1px solid #555;
  background: #fff;
  overflow: hidden;
`;

const ProgressBarInner = styled.div`
  position: absolute;
  background: rgb(46, 140, 88);
  width: ${props => props.progress}%;
  height: 20px;
  transition: all 1s ease-in;
`;

const ProgressBar = ({ progress }) => {
  return (
    <ProgressBarWrapper>
      <ProgressBarInner progress={progress} />
    </ProgressBarWrapper>
  );
};

ProgressBar.propTypes = propTypes;
ProgressBar.defaultProps = defaultProps;

export default ProgressBar;
