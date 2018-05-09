import axios from 'axios';
import config from '../env';

const { API_URI } = config[process.env.REACT_APP_ENV || 'development'];

const instance = axios.create({
  baseURL: `${API_URI}/albums`
});
export default instance;
