// print_alumni.js
// Prints recent rows from the alumni table using mysql2.
// Usage: node print_alumni.js

const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

(async ()=>{
  const pool = mysql.createPool({
    host: process.env.MYSQLHOST || process.env.DB_HOST || 'localhost',
    user: process.env.MYSQLUSER || process.env.DB_USER || 'root',
    password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '',
    database: process.env.MYSQLDATABASE || process.env.DB_NAME || 'alumni_db',
    port: Number(process.env.MYSQLPORT || process.env.DB_PORT || 3306),
    waitForConnections: true,
    connectionLimit: 5
  });
  try{
    const [rows] = await pool.query('SELECT id, name, login_id, branch, batch, company, CHAR_LENGTH(image) AS image_len FROM alumni ORDER BY id DESC LIMIT 20');
    console.table(rows);
  }catch(err){
    console.error('DB error:', err.message);
  }finally{
    pool.end();
  }
})();
