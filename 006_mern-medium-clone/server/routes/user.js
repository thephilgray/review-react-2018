import userController from './../controllers/user.ctrl';

export default (router) => {
  router.get('/user/:id', userController.getUser);

  router.get('/user/profile/:id', userController.getUserProfile);

  router.post('/user', userController.addUser);

  router.post('/user/follow', userController.followUser);
};
