import userRouter from './users/index';

export const ROOT_URL = `/api/v1`;

const router = app => {
  app.use(`${ROOT_URL}/users`, userRouter);
};

export default router;
