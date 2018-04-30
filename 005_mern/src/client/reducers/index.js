import { combineReducers } from 'redux';
import albumsReducer from './albumsReducer';

export default combineReducers({ albums: albumsReducer });
