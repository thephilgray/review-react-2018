import React from 'react';
import { loadAlbums } from './lib/service';
import CardGrid from './components/CardGrid';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { albums: null };
  }

  componentDidMount() {
    loadAlbums().then(({ data }) => {
      this.setState({ albums: data });
    });
  }
  render() {
    return (
      <div>
        <CardGrid albums={this.state.albums} />
      </div>
    );
  }
}
