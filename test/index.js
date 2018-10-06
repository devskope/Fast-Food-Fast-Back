import chai from 'chai';
import chaiHttp from 'chai-http';
import debug from 'debug';
import server from '../src/server';
import dbconnect from './1_db.spec';
import userTests from './2_users.spec';
import orderTests from './3_orders.spec';

const logger = debug('fff:test');
logger(`Initializing tests....`);

const { expect } = chai;
chai.use(chaiHttp);

const ROOT_URL = `/api/v1`;

dbconnect(expect);
userTests(ROOT_URL, server, chai, expect, logger);
orderTests(ROOT_URL, server, chai, expect, logger);
