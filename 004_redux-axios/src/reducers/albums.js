import {
  FETCH_ONE_ALBUM,
  FETCH_ONE_ALBUM_SUCCESS,
  FETCH_ALBUMS_SUCCESS,
  DELETE_ALBUM_SUCCESS,
  ADD_ALBUM_SUCCESS,
  FETCH_ONE_ALBUM_FAILURE,
  UPDATE_ALBUM_SUCCESS
} from '../actions';

const initialState = {
  albums: [],
  activeAlbum: { album: {}, loading: false, error: null }
};

export default (state = initialState, action) => {
  let error;
  switch (action.type) {
    case FETCH_ONE_ALBUM:
      return {
        ...state,
        activeAlbum: { ...state.activeAlbum, loading: true }
      };
    case FETCH_ONE_ALBUM_SUCCESS:
      return {
        ...state,
        activeAlbum: {
          album: action.payload.album,
          loading: false,
          error: null
        }
      };

    case FETCH_ONE_ALBUM_FAILURE:
      error = action.payload || { message: action.payload.message };
      return {
        ...state,
        activeAlbum: { album: null, error, loading: false }
      };

    case ADD_ALBUM_SUCCESS:
      const albumsWithNewAlbum = [...state.albums];
      albumsWithNewAlbum.push(action.newAlbum);
      console.log(`${action.newAlbum.id} was added to ${albumsWithNewAlbum}`);
      return { ...state, albums: albumsWithNewAlbum };
    case FETCH_ALBUMS_SUCCESS:
      return {
        ...state,
        albums: action.albums
      };
    case DELETE_ALBUM_SUCCESS:
      console.log(`${action.deletedAlbumId} was deleted`);
      const updatedAlbums = state.albums.filter(
        album => album.id !== action.deletedAlbumId
      );
      return {
        ...state,
        albums: updatedAlbums
      };
    case UPDATE_ALBUM_SUCCESS:
      console.log(`${action.album.id} was updated`);
      const updateAlbumArray = [...state.albums];
      const albumToUpdateIndex = updateAlbumArray.findIndex(
        album => album.id === action.album.id
      );

      updateAlbumArray.splice(albumToUpdateIndex, 1, action.album);

      return {
        ...state,
        albums: [...updateAlbumArray]
      };

    default:
      return state;
  }
};
