import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { fetchAlbums } from '../actions/';
import CardGrid from '../components/CardGrid';
import AddCard from '../components/AddCard';

const CardGridWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

class AlbumContainer extends React.Component {
  componentDidMount() {
    this.props.onFetchAlbums();
  }
  render() {
    return (
      <CardGridWrapper>
        <CardGrid cards={this.props.albums} />
        <AddCard />
      </CardGridWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    albums: state.albums.albums
  };
};

const mapDispatchToActions = dispatch => {
  return {
    onFetchAlbums: () => dispatch(fetchAlbums())
  };
};

export default connect(mapStateToProps, mapDispatchToActions)(AlbumContainer);
