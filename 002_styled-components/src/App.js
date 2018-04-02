import React, { Component } from 'react';

import Card from './components/Card';
import Logo from './graphics/logo-menu.svg';
import question from './icons/question.svg';
import sampleCards from './stories/sampleCards';

class App extends Component {
  render() {
    return (
      <div>
        <Card card={sampleCards[0]} />
        {/** demo both svg uses **/}
        <img src={Logo} alt="" />

        <svg>
          <use xlinkHref={question} />
        </svg>
      </div>
    );
  }
}

export default App;
