## Redux Basic - 003_redux

### Create a new project with Create React App

```bash
npx create-react-app <project-name>
```

### Install testing tools

* Install enzyme and adapter

```bash
yarn add enzyme enzyme-adapter-react-16 enzyme-to-json
```

* Create `setupTests.js` file for enzyme:

```js
// src/setupTests.js

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
```

* Rut tests

```bash
yarn test
```

### Routing

```bash
yarn add react-router-dom react-router
```

#### Import BrowserRouter and wrap main component with it

* Import `BrowserRouter` from react-router-dom
* Create a new const and in it, wrap top-level app component with <BrowserRouter/> component
* Replace the first argument of render() with the new Browser-wrapped const

```js
//index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
```

#### Create routes

* Remove boilerplate. Create the following files and folders:

```txt
├─┬ components
├─┬ containers
│ ├─┬ Dashboard
│ │ └── Dashboard.js
│ │ └── Dashboard.test.js
│ ├─┬ LaningPage
│ │ └── LaningPage.js
│ │ └── LaningPage.test.js
```

* Create the Dashboard component

```js
// src/containers/Dashboard/Dashboard.test.js

import React from 'react';
import { shallow } from 'enzyme';

import Dashboard from './Dashboard';

it('renders the Dashboard component', () => {
  const wrapper = shallow(<Dashboard />);
  expect(wrapper).toMatchSnapshot();
});
```

```js
// src/containers/Dashboard/Dashboard.js

import React, { Component } from 'react';
class Dashboard extends Component {
  render() {
    return <div>Dashboard</div>;
  }
}
export default Dashboard;
```

#### Setup Switch on top level component

* Import `Route` and `Switch` from `react-router-dom`
* Import top-level components (containers) to use in routing
* Return a `Switch` component with Routes inside.
* There’s a fallback system, so order matters. Use “/” as the default path and include it last.

```js
// App.test.js
import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router';

import Dashboard from './containers/Dashboard/Dashboard';
import LandingPage from './containers/LandingPage/LandingPage';
import App from './App';

it('renders the `App` component properly', () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toMatchSnapshot();
});

it('renders the `LandingPage` component at `/`', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  expect(wrapper.find(Dashboard)).toHaveLength(0);
  expect(wrapper.find(LandingPage)).toHaveLength(1);
});

it('renders the `Dashboard` component at `/dashboard`', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/dashboard']}>
      <App />
    </MemoryRouter>
  );

  expect(wrapper.find(Dashboard)).toHaveLength(1);
  expect(wrapper.find(LandingPage)).toHaveLength(0);
});
```

```js
//App.js
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
```

### State management with Redux

#### Create the `reducer.js` boilerplate

* Declare an initial state object
* Declare a reducer function with the parameters state and action. Set the initial state object as the default value for the state parameter.
* Create a switch statement on `action.type`
* Create a default case that returns state
* Export reducer

```js
// src/reducers/reducer.js
const initialState = {};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
export default reducer;
```

#### Create `actionTypes`

* Create boilerplate action types, INCREMENT and DECREMENT.

```js
// /src/store/actions/actionTypes.js
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
```

#### Create action creators

* Create action creators in actions.js

```js
// /src/store/actions/actions.test.js
import { INCREMENT, DECREMENT } from './actionTypes';
import { increment, decrement } from './actions';

it('creates an action to increment the counter', () => {
  const expected = { type: INCREMENT };
  expect(increment()).toEqual(expected);
});
it('creates an action to decrement the counter', () => {
  const expected = { type: DECREMENT };
  expect(decrement()).toEqual(expected);
});
```

```js
// /src/store/actions/actions.js
import { INCREMENT, DECREMENT } from './actionTypes';
export const increment = () => {
  return {
    type: INCREMENT
  };
};
export const decrement = () => {
  return {
    type: DECREMENT
  };
};
```

#### Create reducer

* Create a redux state value to manage in the initialState object that gets passed into the reducer.
* Create cases for action types, shallow copy the state, and return it immutably.
* NOTE: You can generate simple reducer tests from redux dev tools.

```js
// /src/store/reducers/reducer.test.js
import reducer from './reducer';
import { INCREMENT, DECREMENT } from '../store/actions/actionTypes';

describe('reducer', () => {
  it('increments the counter by 1', () => {
    const expected = 1;
    const actual = reducer(undefined, { type: INCREMENT }).counter;
    expect(actual).toEqual(expected);
  });

  it('decrements the counter by 1', () => {
    const expected = -1;
    const actual = reducer(undefined, { type: DECREMENT }).counter;
    expect(actual).toEqual(expected);
  });

  it('returns the default counter value if no action is specified', () => {
    const expected = 0;
    const actual = reducer(undefined, {}).counter;
    expect(actual).toEqual(expected);
  });
});
```

```js
// /src/store/reducers/reducer.js
import { INCREMENT, DECREMENT } from '../store/actions/actionTypes';
const initialState = {
  counter: 0
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        counter: state.counter + 1
      };
    case DECREMENT:
      return {
        ...state,
        counter: state.counter - 1
      };
    default:
      return state;
  }
};
export default reducer;
```

#### Setup store

```bash
yarn add react-redux redux
```

##### Create store

* Import `createStore` from redux
* Import reducer
* Create a new const and call `createStore`, passing in the reducer. (For multiple reducers, use `combineReducers` from redux).
* Export `store`

```js
// src/store/store.js
import { createStore } from 'redux';
import reducer from '../reducers/reducer';
const store = createStore(reducer);
export default store;
```

##### Hookup store to app

* Import `Provider` from `react-redux`.
* Import `store`
* Create a new const and in it, wrap top-level app component with `<Provider/>` component
* Set the `store` prop value to the imported `store`
* Replace the first argument of `render()` with the new Provider-wrapped const

```js
//index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/store';
import registerServiceWorker from './registerServiceWorker';
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
```

#### Install redux dev tools

* Install redux dev tools browser extension
* Import `compose` from redux
* Create const `composeEnhancers`
* Call `composeEnhancers()` as the second argument of `createStore()`
* Test in the browser. Open dev tools and click the Redux tab.

```js
// store/store.js
import { createStore, compose } from 'redux';
import reducer from './reducers/reducer';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers());
export default store;
```

#### Hookup redux to components

* Import `connect` from `react-redux`
* Import `actions`
* Declare `mapStateToProps` const and `mapDispatchToActions` const
* Use redux state as props within the component
* Use `connect` to inject redux mapped props into component
* Make sure to export the unconnected component class, and import this into the test (may break some previous tests; may need to wrap with `Provider`, passing in store)

```js
// src/containers/Dashboard.test.js
import React from 'react';

import { shallow, mount } from 'enzyme';

import { Dashboard } from './Dashboard';

describe('Dashboard', () => {
  it('renders the Dashboard component', () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper).toMatchSnapshot();
  });

  it('displays the counter from props', () => {
    const props = { counter: 0 };
    const wrapper = mount(<Dashboard {...props} />);
    expect(wrapper.find('h3').text()).toContain('0');
  });

  it('calls the increment action when the increment button is clicked', () => {
    const mockIncrement = jest.fn();
    const props = { counter: 0, increment: mockIncrement };
    const wrapper = mount(<Dashboard {...props} />);
    wrapper.find('.dashboard__buttonIncrement').simulate('click');
    expect(mockIncrement).toHaveBeenCalled();
  });
  it('calls the decrement action when the decrement button is clicked', () => {
    const mockDecrement = jest.fn();
    const props = { counter: 0, decrement: mockDecrement };
    const wrapper = mount(<Dashboard {...props} />);
    wrapper.find('.dashboard__buttonDecrement').simulate('click');
    expect(mockDecrement).toHaveBeenCalled();
  });
});
```

```js
// src/containers/Dashboard.js

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from '../../store/actions/actions';

// export class
export class Dashboard extends Component {
  render() {
    return (
      <div>
        <h2>Dashboard</h2>
        <h3>{this.props.counter}</h3>
        <button
          className="dashboard__button dashboard__buttonIncrement"
          onClick={() => this.props.increment()}
        >
          increment
        </button>
        <button
          className="dashboard__button dashboard__buttonDecrement"
          onClick={() => this.props.decrement()}
        >
          decrement
        </button>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    counter: state.counter
  };
};
const mapDispatchToActions = dispatch => {
  return {
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement())
  };
};
export default connect(mapStateToProps, mapDispatchToActions)(Dashboard);
```
