import userController from './../controllers/user.ctrl';

export default (router) => {
  router.route('/user/:id').get(userController.getUser);

  router.route('/user/profile/:id').get(userController.getUserProfile);

  router.route('/user').post(userController.addUser);

  router.route('/user/follow').post(userController.followUser);
};
