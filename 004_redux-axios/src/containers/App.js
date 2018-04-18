import React from 'react';

import AlbumContainer from './AlbumContainer';
import NavBar from '../components/NavBar';
import Overlay from '../components/Overlay';
import Navigation from '../components/Navigation';
class App extends React.Component {
  state = {
    toggled: false
  };
  toggleHandler = () => {
    this.setState(prevState => {
      return { toggled: !prevState.toggled };
    });
  };
  render() {
    return (
      <div>
        <Overlay
          toggleHandler={this.toggleHandler}
          toggled={this.state.toggled}
        >
          <Navigation />
        </Overlay>

        <NavBar toggleHandler={this.toggleHandler} />
        <AlbumContainer />
      </div>
    );
  }
}

export default App;
