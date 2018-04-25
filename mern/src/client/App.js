import React from 'react';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { albums: null };
  }
  componentDidMount() {
    axios.get('/api/albums').then(res => this.setState({ albums: res.data.albums }));
  }
  render() {
    return (
      <div>
        {this.state.albums !== null ? (
          this.state.albums.map(album => <h2 key={album.id}>{album.title}</h2>)
        ) : (
          <p>Loading....</p>
        )}
      </div>
    );
  }
}
