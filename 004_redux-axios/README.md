* Bootstap with CRA
* Remove boilerplate content
* Create `components` and `containers` directories
* Install json-server
* Create `db.json`
* Add `json-server --watch db.json --port 4000` to `package.json` scripts
* Start `json-server`
* Install redux react-redux redux-thunk axios
* Create a redux store

```js
// src/store/index.js

import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
export default store;
```

* Create an axios instance for the endpoint (in this case it's `localhost:4000`)

```js
// src/lib/albums.js

import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://localhost:4000/'
});
export default instance;
```

* Create an action

```js
// src/actions.index.js

import axios from '../lib/albums';

export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';

const fetchAlbumsSuccess = albums => {
  return {
    type: FETCH_ALBUMS_SUCCESS,
    albums
  };
};

export const fetchAlbums = () => {
  return async dispatch => {
    const albums = await axios.get('albums');
    dispatch(fetchAlbumsSuccess(albums));
  };
};
```

* Creat a reducer

```js
// src/reducers/albums.js
import { FETCH_ALBUMS_SUCCESS } from '../actions';

const initialState = {
  albums: []
};

const albums = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALBUMS_SUCCESS:
      return {
        ...state,
        albums: action.albums
      };
    default:
      return state;
  }
};

export default albums;



// src/reducers/index.js

import { combineReducers } from 'redux';
import albums from './albums';

export default combineReducers({
  albums
});
```

* Use the provider from `react-redux` to connect the store to the app

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import registerServiceWorker from './registerServiceWorker';
import App from './containers/App';

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();

```
* Connect app container to store
