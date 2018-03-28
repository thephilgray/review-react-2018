import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './containers/Dashboard/Dashboard';
import LandingPage from './containers/LandingPage/LandingPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </div>
    );
  }
}
export default App;
