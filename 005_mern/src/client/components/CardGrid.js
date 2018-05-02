import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Card from './Card';
import withPages from '../hocs/withPages';

const CardGridWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const CardGrid = props => (
  <CardGridWrapper data-cy="CardGrid">
    {props.items.map(album => <Card {...album} key={album._id} />)}
  </CardGridWrapper>
);

CardGrid.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object)
};

CardGrid.defaultProps = {
  items: [{}]
};

export default withPages(CardGrid);
