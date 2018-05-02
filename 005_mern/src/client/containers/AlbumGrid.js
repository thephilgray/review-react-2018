import React from 'react';

import withAlbums from '../hocs/withAlbums';
import CardGrid from '../components/CardGrid';

export const AlbumGrid = props => (
  <div>
    <div>
      <button onClick={props.onSortByRatingAsc}>Sort By Rating (asc)</button>
      <button onClick={props.onSortByRatingDesc}>Sort By Rating (desc)</button>
      <button onClick={props.onSortByTitleAsc}>Sort By Title (asc)</button>
      <button onClick={props.onSortByTitleDesc}>Sort By Title (desc)</button>
      <p>{props.sortOrder}</p>
    </div>

    {props.albums ? <CardGrid items={props.albums} maxItemsPerPage={5} /> : null}
  </div>
);

export default withAlbums(AlbumGrid);
