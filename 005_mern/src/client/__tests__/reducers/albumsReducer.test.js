import { escapeRegExp } from 'lodash';
import albumsReducer from '../../reducers/albumsReducer';
import * as constants from '../../lib/constants';
import sampleData from '../../../server/sampledata.json';

describe('albumsReducer', () => {
  let loadedState;
  beforeEach(() => {
    loadedState = albumsReducer(undefined, {
      type: constants.FETCH_ALBUMS_SUCCESS,
      albums: sampleData
    });
  });
  it('loads the albums from the server', () => {
    expect(loadedState.albums.length).toBe(sampleData.length);
  });
  it('should sort the albums by title in ascending order', () => {
    const sortedByTitleAsc = sampleData.sort((a, b) => a.title - b.title);
    const sortedState = albumsReducer(loadedState, {
      type: constants.SORT_BY_TITLE_ASC
    });
    expect(sortedState.albums).toMatchObject(sortedByTitleAsc);
  });

  it('should sort the albums by title in descending order', () => {
    const sortedByTitleDesc = sampleData.sort((a, b) => {
      if (a.title > b.title) return -1;
      else if (a.title < b.title) return 1;
      return 0;
    });
    const sortedState = albumsReducer(loadedState, {
      type: constants.SORT_BY_TITLE_DESC
    });
    expect(sortedState.albums).toMatchObject(sortedByTitleDesc);
  });

  it('should sort the albums by rating in ascending order', () => {
    const sortedState = albumsReducer(loadedState, {
      type: constants.SORT_BY_RATING_ASC
    });
    const firstItem = sortedState.albums[0].rating;
    const lastItem = sortedState.albums[sortedState.albums.length - 1].rating;
    expect(lastItem).toBeGreaterThanOrEqual(firstItem);
  });

  it('should sort the albums by rating in descending order', () => {
    const sortedState = albumsReducer(loadedState, {
      type: constants.SORT_BY_RATING_DESC
    });
    const firstItem = sortedState.albums[0].rating;
    const lastItem = sortedState.albums[sortedState.albums.length - 1].rating;
    expect(firstItem).toBeGreaterThanOrEqual(lastItem);
  });

  it('should filter artists by artist and title', () => {
    const query = 'space';
    const filteredState = albumsReducer(loadedState, {
      type: constants.FILTER_BY_SEARCH_QUERY,
      query
    });
    const expected = sampleData.filter((album) => {
      const re = new RegExp(query, 'gi');
      return album.title.match(re) || album.artist.match(re);
    });
    expect(filteredState.filteredAlbums).toMatchObject(expected);
  });

  it('should escape user input that includes special characters', () => {
    const query = '(space';
    const filteredState = albumsReducer(loadedState, {
      type: constants.FILTER_BY_SEARCH_QUERY,
      query
    });

    const escapedQuery = escapeRegExp(query);
    const expected = sampleData.filter((album) => {
      const re = new RegExp(escapedQuery, 'gi');
      return album.title.match(re) || album.artist.match(re);
    });
    expect(filteredState.filteredAlbums).toMatchObject(expected);
  });
});
