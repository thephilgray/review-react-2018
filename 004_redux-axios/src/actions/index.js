import axios from '../lib/albums';

export const ADD_ALBUM_SUCCESS = 'ADD_ALBUM_SUCCESS';
export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';
export const FETCH_ONE_ALBUM = 'FETCH_ONE_ALBUM';
export const FETCH_ONE_ALBUM_SUCCESS = 'FETCH_ONE_ALBUM_SUCCESS';
export const FETCH_ONE_ALBUM_FAILURE = 'FETCH_ONE_ALBUM_FAILURE';
export const UPDATE_ALBUM_SUCCESS = 'UPDATE_ALBUM_SUCCESS';
export const DELETE_ALBUM_SUCCESS = 'DELETE_ALBUM_SUCCESS';

const addAlbumSuccess = newAlbum => {
  return {
    type: ADD_ALBUM_SUCCESS,
    newAlbum
  };
};

export const fetchOneAlbumSuccess = activeAlbum => {
  return {
    type: FETCH_ONE_ALBUM_SUCCESS,
    payload: activeAlbum
  };
};

export const fetchOneAlbumFailure = error => {
  return {
    type: FETCH_ONE_ALBUM_FAILURE,
    payload: error
  };
};

export const fetchOneAlbum = albumId => {
  const request = axios.get(`/${albumId}`);
  return dispatch => {
    dispatch({
      type: FETCH_ONE_ALBUM,
      payload: request
    });
  };

  // return dispatch => {
  //   axios
  //     .get(`/${albumId}`)
  //     .then(response => {
  //       dispatch(fetchAlbumsSuccess(response.data));
  //     })
  //     .catch(error => {
  //       dispatch(fetchOneAlbumFailure(error));
  //     });
  // };
};

const fetchAlbumsSuccess = albums => {
  return {
    type: FETCH_ALBUMS_SUCCESS,
    albums
  };
};

const updateAlbumSuccess = album => {
  return {
    type: UPDATE_ALBUM_SUCCESS,
    album
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

export const updateAlbum = album => {
  return dispatch => {
    axios.patch(`/${album.id}`, album).then(response => {
      dispatch(updateAlbumSuccess(response.data));
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
