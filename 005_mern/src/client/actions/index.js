import {
  FETCH_ALBUMS_SUCCESS,
  FETCH_ALBUMS_FAILURE,
  SORT_BY_RATING_ASC,
  SORT_BY_RATING_DESC,
  SORT_BY_TITLE_ASC,
  SORT_BY_TITLE_DESC,
  CLEAR_SORT
} from '../lib/constants';
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

export const sortByTitleAsc = () => ({ type: SORT_BY_TITLE_ASC });
export const sortByTitleDesc = () => ({ type: SORT_BY_TITLE_DESC });
export const sortByRatingAsc = () => ({ type: SORT_BY_RATING_ASC });
export const sortByRatingDesc = () => ({ type: SORT_BY_RATING_DESC });
export const clearSort = () => ({ type: CLEAR_SORT });
