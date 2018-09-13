import fs from 'fs';
import path from 'path';
import { Converter } from 'showdown';

import userRouter from './users/index';
import orderRouter from './orders/index';
import adminRouter from './admin/index';

export const ROOT_URL = `/api/v1`;

const converter = new Converter();
converter.setFlavor('github');

const router = app => {
  app.use(`${ROOT_URL}/users`, userRouter);
  app.use(`${ROOT_URL}/orders`, orderRouter);
  app.use(`${ROOT_URL}`, res => {
    fs.readFile(path.join(__dirname, '../../docs/doc.md'), (err, data) => {
      if (err) throw err;
      res.status(200).send(converter.makeHtml(data.toString()));
    });
  });
  app.use(`/super`, adminRouter);
};

export default router;
