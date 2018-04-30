import { FETCH_ALBUMS_SUCCESS, FETCH_ALBUMS_FAILURE } from '../lib/constants';
import { loadAlbums } from '../lib/service';

const fetchAlbumsFailure = error => ({
  type: FETCH_ALBUMS_FAILURE,
  error
});

const fetchAlbumsSuccess = albums => ({
  type: FETCH_ALBUMS_SUCCESS,
  albums
});

export const fetchAlbums = () => (dispatch) => {
  loadAlbums()
    .then(({ data }) => dispatch(fetchAlbumsSuccess(data)))
    .catch(error => dispatch(fetchAlbumsFailure(error)));
};
