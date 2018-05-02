import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  fetchAlbums,
  sortByRatingAsc,
  sortByRatingDesc,
  sortByTitleAsc,
  sortByTitleDesc
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
    sortOrder: state.albums.sortOrder
  });
  const mapDispatchToProps = dispatch => ({
    loadAlbums: () => dispatch(fetchAlbums()),
    onSortByRatingAsc: () => dispatch(sortByRatingAsc()),
    onSortByRatingDesc: () => dispatch(sortByRatingDesc()),
    onSortByTitleAsc: () => dispatch(sortByTitleAsc()),
    onSortByTitleDesc: () => dispatch(sortByTitleDesc())
  });
  return connect(mapStateToProps, mapDispatchToProps)(WithAlbums);
};

export default withAlbums;
