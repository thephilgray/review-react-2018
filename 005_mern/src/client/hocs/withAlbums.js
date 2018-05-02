import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  fetchAlbums,
  toggleSearchActive,
  sortByRatingAsc,
  sortByRatingDesc,
  sortByTitleAsc,
  sortByTitleDesc,
  filterBySearchQuery
} from '../actions';

const withAlbums = (WrappedComponent) => {
  class WithAlbums extends React.Component {
    componentDidMount() {
      this.props.loadAlbums();
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  WithAlbums.propTypes = {
    loadAlbums: PropTypes.func.isRequired
  };
  const mapStateToProps = state => ({
    albums: state.albums.albums,
    filteredAlbums: state.albums.filteredAlbums,
    searchActive: state.albums.searchActive,
    sortOrder: state.albums.sortOrder
  });
  const mapDispatchToActions = dispatch => ({
    loadAlbums: () => dispatch(fetchAlbums()),
    onFilterBySearchQuery: query => dispatch(filterBySearchQuery(query)),
    onToggleSearchActive: () => dispatch(toggleSearchActive()),
    onSortByRatingAsc: () => dispatch(sortByRatingAsc()),
    onSortByRatingDesc: () => dispatch(sortByRatingDesc()),
    onSortByTitleAsc: () => dispatch(sortByTitleAsc()),
    onSortByTitleDesc: () => dispatch(sortByTitleDesc())
  });
  return connect(mapStateToProps, mapDispatchToActions)(WithAlbums);
};

export default withAlbums;
