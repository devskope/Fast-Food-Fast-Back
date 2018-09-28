import userRouter from './users/index';
import orderRouter from './orders/index';

export const ROOT_URL = `/api/v1`;

const router = app => {
  app.use(`${ROOT_URL}/users`, userRouter);
  app.use(`${ROOT_URL}/orders`, orderRouter);
};

export default router;
