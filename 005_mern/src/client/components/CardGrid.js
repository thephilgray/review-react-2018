import React from 'react';
import PropTypes from 'prop-types';

import Card from './Card';
import withPages from './withPages';

const CardGrid = props => (
  <div data-cy="CardGrid">
    {props.items !== null ? props.items.map(album => <Card {...album} key={album._id} />) : null}
  </div>
);

CardGrid.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object)
};

CardGrid.defaultProps = {
  items: [{}]
};

export default withPages(CardGrid);
