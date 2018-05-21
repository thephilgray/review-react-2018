import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import articles from './articles';
import authUser from './authUser';
import common from './common';

export default combineReducers({
  articles,
  authUser,
  common,
  router: routerReducer
});
