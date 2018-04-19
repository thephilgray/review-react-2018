import {
  FETCH_ALBUMS_SUCCESS,
  DELETE_ALBUM_SUCCESS,
  ADD_ALBUM_SUCCESS
} from '../actions';

const albums = (state = {}, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default albums;
