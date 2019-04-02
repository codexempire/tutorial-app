// imports
import { Pool, Client } from 'pg';
import { config } from 'dotenv';

config();
const pool = new Pool({ connectionString: process.env.DATABASE_URL, });
pool.connect(err => { if (!err) { console.log('Pool connected'); } });

export default pool;
