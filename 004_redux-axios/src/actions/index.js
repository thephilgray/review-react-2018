import axios from '../lib/albums';

export const ADD_ALBUM_SUCCESS = 'ADD_ALBUM_SUCCESS';
export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';
export const DELETE_ALBUM_SUCCESS = 'DELETE_ALBUM_SUCCESS';

const addAlbumSuccess = newAlbum => {
  return {
    type: ADD_ALBUM_SUCCESS,
    newAlbum
  };
};

const fetchAlbumsSuccess = albums => {
  return {
    type: FETCH_ALBUMS_SUCCESS,
    albums
  };
};

const deleteAlbumSuccess = deletedAlbumId => {
  return {
    type: DELETE_ALBUM_SUCCESS,
    deletedAlbumId
  };
};

export const addAlbum = newAlbum => {
  return dispatch => {
    axios
      .post('/', newAlbum)
      .then(response => {
        dispatch(addAlbumSuccess(newAlbum));
      })
      .catch(error => console.log(error));
  };
};

export const fetchAlbums = () => {
  return dispatch => {
    axios.get('/').then(response => {
      dispatch(fetchAlbumsSuccess(response.data));
    });
  };
};

export const deleteAlbum = id => {
  return dispatch => {
    axios.delete(`/${id}`).then(response => {
      dispatch(deleteAlbumSuccess(id));
    });
  };
};
