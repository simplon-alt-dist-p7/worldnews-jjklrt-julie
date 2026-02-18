require('dotenv').config({ path: '../.env' });
const { Pool } = require('pg');
 
const pool = new Pool({
  user: (process.env.DB_USER||'').trim(),
  password: (process.env.DB_PASSWORD||'').trim(),
  host: (process.env.DB_HOST||'').trim(),
  port: Number((process.env.DB_PORT||'').trim()) || 5432,
  database: (process.env.DB_NAME||'').trim(),
});

console.log('DB env types:', {
  DB_USER_type: typeof process.env.DB_USER,
  DB_PASSWORD_type: typeof process.env.DB_PASSWORD,
  DB_HOST_type: typeof process.env.DB_HOST,
  DB_PORT_type: typeof process.env.DB_PORT,
  raw_DB_PASSWORD: process.env.DB_PASSWORD,
});

(async () => {
  try {
    const res = await pool.query('SELECT * FROM reader.articles_lecture LIMIT 5');
    console.log('rows:', res.rows);
  } catch (err) {
    console.error('ERROR:', err.message);
    console.error(err);
  } finally {
    await pool.end();
  }
})();
