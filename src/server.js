import dotenv from 'dotenv';
import express from 'express';
import debug from 'debug';
import morgan from 'morgan';
import { user } from './datastores/userData';
import r from './routes/index';

const app = express();
const { env } = process;

if (!env.NODE_ENV) {
  dotenv.config();
}

const logger = debug('ff:server');

if (env.NODE_ENV === `production`) {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = user;
  res.locals.user = req.user;
  next();
});
r(app);
app.listen(env.PORT, () => logger(`Running on ${env.PORT}`));

export default app;
