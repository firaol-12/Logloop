import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

async function test() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('DB connected!', res.rows);
  } catch (err) {
    console.error('DB connection failed:', err);
  } finally {
    pool.end();
  }
}

test();
