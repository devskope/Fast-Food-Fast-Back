import debug from 'debug';
import db from './index';
import User from '../models/users';

const logger = debug('fff:db-init');
logger(`db setup....`);

const { exit } = process;

const Models = {
  userModel: `
    CREATE TABLE f3.users
      (
       id       SERIAL PRIMARY KEY,
       is_admin BOOL,
       email    VARCHAR,
       username VARCHAR UNIQUE not null,
       password VARCHAR not null
      )`,

  orderModel: `
    CREATE TABLE f3.orders
      (
       id       SERIAL PRIMARY KEY,
       owner    VARCHAR not null,
       status   VARCHAR not null,
       name     VARCHAR not null,
       qty      INTEGER not null,
       category VARCHAR not null,
       topping  VARCHAR
      )`
};

const create = async (creationQuery, name, mode) => {
  const what = mode === 0 ? 'Schema' : 'Table';
  try {
    const created = await db.query(creationQuery);
    setTimeout(() => {}, 2000);
    if (created) logger(`${what}'${name}'created successfully`);
  } catch ({ message }) {
    logger(`Skipping create${what} step – Reason: ${message}`);
  }
};

const dbInit = async () => {
  const { userModel, orderModel } = Models;
  const superUser = new User({
    username: 'admin',
    password: '$2a$10$4DhhXb8vXCMh/Xf1p3VuzeFdBqzJJkCwwhTXE55PLpYrkeuNQQci6',
    email: 'max@fff.chow'
  });

  try {
    await create(`create schema f3`, 'f3', 0);
    await create(userModel, 'Users');
    await create(orderModel, 'Orders');
    await superUser.save(0);
    exit(0);
    // or close database connection
  } catch ({ message }) {
    logger(message);
    exit(1);
  }
};
dbInit();

export default dbInit;
