import React, { Component } from 'react';

import Header from './Header/Header';
import Order from './Order/Order';
import Inventory from './Inventory/Inventory';
import Fish from '../components/Fish/Fish';

import sampleFishes from '../sample-fishes';

class App extends Component {
  state = {
    fishes: {},
    order: {}
  };

  addFish = fish => {
    const fishes = { ...this.state.fishes };
    fishes[`fish${Date.now()}`] = fish;
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map((fish, index) => {
              return <Fish key={index} details={this.state.fishes[fish]} />;
            })}
          </ul>
        </div>

        <Order />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}

export default App;
