import React from 'react';
import PropTypes from 'prop-types';

import Card from './Card';

const CardGrid = props => (
  <div data-cy="CardGrid">
    {props.albums ? props.albums.map(album => <Card {...album} key={album._id} />) : null}
  </div>
);

CardGrid.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object)
};

CardGrid.defaultProps = {
  albums: [{}]
};

export default CardGrid;
