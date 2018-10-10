import express from 'express';
import debug from 'debug';
import morgan from 'morgan';
import env from './config/envConf';
import routes from './routes/index';

const app = express();
const logger = debug('fff:server');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
routes(app);
app.listen(env.PORT, () => logger(`Running on ${env.PORT}`));

export default app;
