import React from 'react';

import withAlbums from '../hocs/withAlbums';
import CardGrid from '../components/CardGrid';
import SearchSortControls from '../containers/SearchSortControls';

export const AlbumGrid = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
    this.search = this.search.bind(this);
  }

  search(event) {
    this.setState({ query: event.target.value }, () =>
      this.props.onFilterBySearchQuery(this.state.query));
  }
  render() {
    const { props } = this;
    let items;
    if (props.searchActive && this.state.query) {
      items = props.filteredAlbums;
    } else {
      items = props.albums;
    }
    return (
      <div>
        <SearchSortControls
          search={this.search}
          searchActive={props.searchActive}
          query={this.state.query}
          onToggleSearchActive={props.onToggleSearchActive}
          onSortByRatingAsc={props.onSortByRatingAsc}
          onSortByRatingDesc={props.onSortByRatingDesc}
          onSortByTitleAsc={props.onSortByTitleAsc}
          onSortByTitleDesc={props.onSortByTitleDesc}
          sortOrder={props.sortOrder}
        />
        {props.albums ? <CardGrid items={items} maxItemsPerPage={5} /> : null}
      </div>
    );
  }
};

export default withAlbums(AlbumGrid);
