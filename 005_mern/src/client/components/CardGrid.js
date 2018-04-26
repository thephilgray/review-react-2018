import React from 'react';
import PropTypes from 'prop-types';

import Card from './Card';

const CardGrid = props => (
  <div data-cy="CardGrid">
    {props.albums !== null ? props.albums.map(album => <Card {...album} key={album.id} />) : null}
  </div>
);

CardGrid.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object)
};

CardGrid.defaultProps = {
  albums: [{}]
};

export default CardGrid;
