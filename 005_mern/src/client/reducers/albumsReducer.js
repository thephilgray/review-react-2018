import {
  FETCH_ALBUMS_FAILURE,
  FETCH_ALBUMS_SUCCESS,
  TOGGLE_SEARCH_ACTIVE,
  SORT_BY_RATING_ASC,
  SORT_BY_RATING_DESC,
  SORT_BY_TITLE_ASC,
  SORT_BY_TITLE_DESC,
  FILTER_BY_SEARCH_QUERY
} from '../lib/constants';

const initialState = {
  albums: null,
  filteredAlbums: null,
  error: null,
  sortOrder: '',
  searchActive: false
};

const albumsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALBUMS_FAILURE: {
      return { ...state, error: action.error };
    }

    case FETCH_ALBUMS_SUCCESS: {
      return {
        ...state,
        albums: action.albums.sort((a, b) => {
          if (a.title > b.title) return 1;
          else if (a.title < b.title) return -1;
          return 0;
        }),
        sortOrder: SORT_BY_TITLE_ASC,
        searchActive: false
      };
    }

    case FILTER_BY_SEARCH_QUERY: {
      const filteredAlbums = state.albums.slice().filter((album) => {
        const re = new RegExp(action.query, 'gi');
        return album.title.match(re) || album.artist.match(re);
      });
      return { ...state, searchActive: true, filteredAlbums };
    }

    case TOGGLE_SEARCH_ACTIVE: {
      if (state.searchActive) {
        return { ...state, searchActive: false, filteredAlbums: null };
      }
      return { ...state, searchActive: true };
    }

    case SORT_BY_TITLE_ASC: {
      return {
        ...state,
        albums: state.albums.slice().sort((a, b) => {
          if (a.title > b.title) return 1;
          else if (a.title < b.title) return -1;
          return 0;
        }),
        sortOrder: SORT_BY_TITLE_ASC,
        searchActive: false
      };
    }

    case SORT_BY_TITLE_DESC: {
      return {
        ...state,
        albums: state.albums.slice().sort((a, b) => {
          if (a.title > b.title) return -1;
          else if (a.title < b.title) return 1;
          return 0;
        }),
        sortOrder: SORT_BY_TITLE_DESC,
        searchActive: false
      };
    }

    case SORT_BY_RATING_ASC: {
      return {
        ...state,
        albums: state.albums.slice().sort((a, b) => a.rating - b.rating),
        sortOrder: SORT_BY_RATING_ASC,
        searchActive: false
      };
    }
    case SORT_BY_RATING_DESC: {
      return {
        ...state,
        albums: state.albums.slice().sort((a, b) => b.rating - a.rating),
        sortOrder: SORT_BY_RATING_DESC,
        searchActive: false
      };
    }

    default:
      return state;
  }
};

export default albumsReducer;
