import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string
};

const defaultProps = {
  title: 'Logo'
};

const LogoWrapper = styled.div`
  padding: 1em;
  text-align: center;
  cursor: pointer;
  margin: 0 auto;
`;

const Logo = ({ image, title }) => {
  return (
    <LogoWrapper>
      <img src={image} alt={title} />
    </LogoWrapper>
  );
};
Logo.propTypes = propTypes;
Logo.defaultProps = defaultProps;

export default Logo;
