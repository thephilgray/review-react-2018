import React, { Component } from 'react';

import Card from './components/Card';

import sampleCards from './stories/sampleCards';

class App extends Component {
  render() {
    return (
      <div>
        <Card card={sampleCards[0]} />
      </div>
    );
  }
}

export default App;
