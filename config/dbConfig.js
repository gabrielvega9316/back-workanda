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
  console.error('Error en la conexión de la base de datos:', err.code);
});

// Comprueba la conexión inicial al crear el pool
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
    connection.release();
  }
});

module.exports = pool;

