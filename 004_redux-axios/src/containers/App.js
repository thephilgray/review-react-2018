import React from 'react';
import { connect } from 'react-redux';
import { fetchAlbums } from '../actions/';
import CardGrid from '../components/CardGrid';

class App extends React.Component {
  componentDidMount() {
    this.props.onFetchAlbums();
  }
  render() {
    return (
      <div>
        <CardGrid cards={this.props.albums} />
      </div>
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

export default connect(mapStateToProps, mapDispatchToActions)(App);
