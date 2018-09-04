import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import r from './routes/index';

const app = express();
const { env } = process;

if (!env.NODE_ENV) {
  dotenv.config();
}
const port = env.PORT;
if (env.NODE_ENV === `production`) {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
r(app);
app.listen(port);

const ok = name => `${name}'s Okayy!`;

export default ok;
