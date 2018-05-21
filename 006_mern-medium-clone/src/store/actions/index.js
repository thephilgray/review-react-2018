import axios from 'axios';

const url = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api/';

export const loadArticles = () => (dispatch) => {
  axios
    .get(`${url}articles`)
    .then(({ data }) => {
      dispatch({ type: 'LOAD_ARTICLES', articles: data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUser = _id =>
  axios
    .get(`${url}user/${_id}`)
    .then(({ data }) => data)
    .catch(err => console.log(err));

export const getUserProfile = _id => (dispatch) => {
  axios
    .get(`${url}url/profile/${_id}`)
    .then(({ data }) => {
      dispatch({ type: 'SET_PROFILE', profile: data });
    })
    .catch(err => console.log(err));
};

export const getArticle = articleId => (dispatch) => {
  axios
    .get(`${url}article/${articleId}`)
    .then(({ data }) => {
      dispatch({ type: 'VIEW_ARTICLE', article: data });
    })
    .catch(err => console.log(err));
};

export const comment = () => () => {};

export const clap = articleId => (dispatch) => {
  axios
    .post(`${url}article/clap`, { articleId })
    .then(() => {
      dispatch({ type: 'CLAP_ARTICLE' });
    })
    .catch(err => console.log(err));
};

export const signInUser = userData => (dispatch) => {
  axios.post(`${url}user`, userData).then(({ data }) => {
    localStorage.setItem('Auth', JSON.stringify(data));
    dispatch({ type: 'SET_USER', user: data });
  });
};

export const toggleClose = () => (dispatch) => {
  dispatch({ type: 'TOGGLE_MODAL', modalMode: false });
};

export const toggleOpen = () => (dispatch) => {
  dispatch({ type: 'TOGGLE_MODAL', modalMode: true });
};
