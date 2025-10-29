// create_db.js
// Create the alumni_db database if it doesn't exist. Reads credentials from server/.env
// Usage: node create_db.js

const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

(async ()=>{
  const host = process.env.MYSQLHOST || process.env.DB_HOST || 'localhost';
  const user = process.env.MYSQLUSER || process.env.DB_USER || 'root';
  const password = process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || 'mysql';
  const port = Number(process.env.MYSQLPORT || process.env.DB_PORT || 3306);
  try{
    console.log(`Connecting to MySQL on ${host}:${port} as ${user} ...`);
    const conn = await mysql.createConnection({ host, port, user, password, multipleStatements: true });
    await conn.query("CREATE DATABASE IF NOT EXISTS alumni_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;");
    console.log('Database created (or already exists): alumni_db');
    await conn.end();
  }catch(err){
    console.error('Failed to create database:', err.message);
    process.exit(1);
  }
})();
