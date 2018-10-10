import { Pool } from 'pg';
import debug from 'debug';
import env from '../config/envConf';

const logger = debug('fff:queryRunner');
logger(`setup....`);

const pool = new Pool({
  connectionString: env.DATABASE_URL
});

export default {
  query: (queryString, params) => pool.query(queryString, params)
};
