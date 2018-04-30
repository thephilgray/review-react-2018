import React from 'react';
import { connect } from 'react-redux';

import { fetchAlbums } from './actions';
import CardGrid from './components/CardGrid';

class App extends React.Component {
  componentDidMount() {
    this.props.loadAlbums();
  }
  render() {
    return (
      <div>
        {this.props.albums !== null ? (
          <CardGrid items={this.props.albums} maxItemsPerPage={5} />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  albums: state.albums.albums
});
const mapDispatchToProps = dispatch => ({
  loadAlbums: () => dispatch(fetchAlbums())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
