import dotenv from 'dotenv';
import express from 'express';
import debug from 'debug';
import morgan from 'morgan';
import routes from './routes/index';

const app = express();
const { env } = process;

if (!env.NODE_ENV) {
  dotenv.config();
}

const logger = debug('fff:server');

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
routes(app);
app.listen(env.PORT, () => logger(`Running on ${env.PORT}`));

export default app;
