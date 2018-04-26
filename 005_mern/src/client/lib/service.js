import axios from 'axios';

export const loadAlbums = () => axios.get('/api/albums'); //eslint-disable-line
