import axios from '../lib/albums';

export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';

const fetchAlbumsSuccess = albums => {
  return {
    type: FETCH_ALBUMS_SUCCESS,
    albums
  };
};

export const fetchAlbums = () => {
  return dispatch => {
    axios.get('/').then(response => {
      dispatch(fetchAlbumsSuccess(response.data));
    });
  };
};
