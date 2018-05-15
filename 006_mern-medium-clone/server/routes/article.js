import multipart from 'connect-multiparty';
import articleController from './../controllers/article.ctrl';

const multipartWare = multipart();

export default (router) => {
  router.route('/articles').get(articleController.getAll);

  router.route('/article').post(multipartWare, articleController.addArticle);

  router.route('/article/clap').post(articleController.clapArticle);

  router.route('/article/comment').post(articleController.commentArticle);

  router.route('/article/:id').get(articleController.getArticle);
};
