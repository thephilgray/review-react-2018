import React from 'react';

import NavBar from '../components/NavBar';
import Overlay from '../components/Overlay';
import Navigation from '../components/Navigation';
import { BrowserRouter as Router } from 'react-router-dom';
import routes from '../routes';
class Home extends React.Component {
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
      <Router>
        <div>
          <Overlay
            toggleHandler={this.toggleHandler}
            toggled={this.state.toggled}
          >
            <Navigation />
          </Overlay>

          <NavBar toggleHandler={this.toggleHandler} />
          {routes()}
        </div>
      </Router>
    );
  }
}

export default Home;
