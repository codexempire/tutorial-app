import { Pool } from 'pg';
import { config } from 'dotenv';
import debug from 'debug';

config();

const debugg = debug('drop');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const dropUsersTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users';
  pool
    .query(queryText)
    .then(res => {
      pool.end();
    })
    .catch(err => {
      console.log('500');
    });
};

dropUsersTable();
