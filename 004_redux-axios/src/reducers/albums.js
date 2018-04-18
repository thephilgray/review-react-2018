import { FETCH_ALBUMS_SUCCESS } from '../actions';

const albums = (state = {}, action) => {
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
