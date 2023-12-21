const mysql = require('mysql2');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

const pool = mysql.createPool(dbConfig);

// Manejo de errores en la evento "error" del pool
pool.on('error', (err) => {
  console.error('Error in the database connection:', err.code);
});

// Comprueba la conexión inicial al crear el pool
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error in the database connection:', err);
  } else {
    console.log('Successful connection to the database');
    connection.release();
  }
});

module.exports = pool;

