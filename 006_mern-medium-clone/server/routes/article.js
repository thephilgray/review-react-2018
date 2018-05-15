import multipart from 'connect-multiparty';
import articleController from './../controllers/article.ctrl';

const multipartWare = multipart();

export default (router) => {
  router.get('/articles', articleController.getAll);

  router.post('/article', multipartWare, articleController.addArticle);

  router.post('/article/clap', articleController.clapArticle);

  router.post('/article/comment', articleController.commentArticle);

  router.get('/article/:id', articleController.getArticle);
};
