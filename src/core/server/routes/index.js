import userRouter from './user';

export default function routes(app, router) {
  router.use('/users', userRouter());
  app.use('/api', router);
}
