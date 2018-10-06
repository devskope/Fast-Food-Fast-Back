import { Pool } from 'pg';
import debug from 'debug';
import dotenv from 'dotenv';

const { env } = process;

const logger = debug('fff:queryRunner');
logger(`setup....`);

if (!env.DATABASE_URL) {
  dotenv.config();
}

const pool = new Pool({
  connectionString: env.DATABASE_URL
});

export default {
  query: (queryString, params) => pool.query(queryString, params)
};
