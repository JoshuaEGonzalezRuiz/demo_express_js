const mysql2 = require('mysql2');
const dotenv = require('dotenv');

// Configura DotEnv
dotenv.config();

// Crear pool de conexiones a la base de datos MySQL
const pool = mysql2.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Obtener una conexión del pool
function obtenerConexion() {
    return pool.promise().getConnection();
}

module.exports = {
    obtenerConexion
};