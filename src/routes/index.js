import orderRouter from './orders/index';
import authRouter from './auth/index';

export const ROOT_URL = `/api/v1`;

const router = app => {
  app.use(`${ROOT_URL}/auth`, authRouter);
  app.use(`${ROOT_URL}/orders`, orderRouter);
};

export default router;
