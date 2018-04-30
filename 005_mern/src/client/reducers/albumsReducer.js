import { FETCH_ALBUMS_FAILURE, FETCH_ALBUMS_SUCCESS } from '../lib/constants';

const initialState = {
  albums: null,
  error: null
};

const albumsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALBUMS_FAILURE: {
      return { error: action.error };
    }
    case FETCH_ALBUMS_SUCCESS: {
      return { albums: action.albums };
    }
    default:
      return state;
  }
};

export default albumsReducer;
