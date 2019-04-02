import { Pool } from 'pg';
import { config } from 'dotenv';

config();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const createUserTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY, 
        firstname VARCHAR(15) NOT NULL, 
        lastname VARCHAR(15) NOT NULL, 
        address VARCHAR(40) NOT NULL,
        phone VARCHAR(11) UNIQUE NOT NULL,
        dob DATE NOT NULL, 
        gender VARCHAR(11) NOT NULL,
        password TEXT NOT NULL,
        isAdmin boolean DEFAULT false
        )`;

  pool
    .query(queryText)
    .then(res => {
      console.log(200);
    })
    .catch(err => {
      console.log(500);
    });
};

// Create the tables
createUserTable();
