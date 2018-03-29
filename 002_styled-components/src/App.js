import React, { Component } from 'react';
import Icon from './components/Icon';
import pencil from '../src/icons/pencil.svg';
import Card from './components/Card';

const card = {
  id: '1521567322',
  title: 'Space is the Place',
  artist: 'Sun Ra',
  art:
    'https://upload.wikimedia.org/wikipedia/en/6/6c/Space_Is_The_Place_album_cover.jpg',
  year: '1973',
  rating: 5
};
class App extends Component {
  render() {
    return (
      <div>
        <Card card={card} />
      </div>
    );
  }
}

export default App;
