import {
  FETCH_ALBUMS_FAILURE,
  FETCH_ALBUMS_SUCCESS,
  SORT_BY_RATING_ASC,
  SORT_BY_RATING_DESC,
  SORT_BY_TITLE_ASC,
  SORT_BY_TITLE_DESC
} from '../lib/constants';

const initialState = {
  albums: null,
  error: null,
  sortOrder: ''
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
        sortOrder: SORT_BY_TITLE_ASC
      };
    }
    case SORT_BY_TITLE_ASC: {
      return {
        ...state,
        albums: state.albums.slice().sort((a, b) => {
          if (a.title > b.title) return 1;
          else if (a.title < b.title) return -1;
          return 0;
        }),
        sortOrder: SORT_BY_TITLE_ASC
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
        sortOrder: SORT_BY_TITLE_DESC
      };
    }

    case SORT_BY_RATING_ASC: {
      return {
        ...state,
        albums: state.albums.slice().sort((a, b) => a.rating - b.rating),
        sortOrder: SORT_BY_RATING_ASC
      };
    }
    case SORT_BY_RATING_DESC: {
      return {
        ...state,
        albums: state.albums.slice().sort((a, b) => b.rating - a.rating),
        sortOrder: SORT_BY_RATING_DESC
      };
    }

    default:
      return state;
  }
};

export default albumsReducer;
