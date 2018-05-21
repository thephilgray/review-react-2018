import { applyMiddleware, createStore } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';

import reducer from './reducers/';

export const history = createHistory();

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
