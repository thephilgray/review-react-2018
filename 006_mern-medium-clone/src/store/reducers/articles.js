const initialState = {
  articles: [],
  article: {}
};

export default (state = initialState, action) => {
  const article = Object.assign({}, state.article);
  switch (action.type) {
    case 'LOAD_ARTICLES':
      return {
        ...state,
        articles: action.articles
      };
    case 'VIEW_ARTICLE':
      return {
        ...state,
        article: action.article
      };
    //
    case 'CLAP_ARTICLE':
      article.claps += 1;
      console.log(article);
      return {
        ...state,
        article
      };
    default:
      return state;
  }
};
