const mysql2 = require('mysql2');
const dotenv = require('dotenv');

//Configura DotEnv
dotenv.config();

// Crear conexión a la base de datos MySQL
const connection = mysql2.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Función para insertar un nuevo usuario en la base de datos MySQL
async function registrarUsuario(nombre, email, password) {
    return new Promise((resolve, reject) => {
        connection.query(
            'INSERT INTO usuarios (nombre, email, password_hash) VALUES (?, ?, ?)',
            [nombre, email, password],
            (err, results) => {
            if (err) {
                console.error(err.message);
                reject(err);
            } else {
                console.log('Usuario insertado correctamente');
                resolve();
            }
        });
    });
}

// Función para obtener un usuario por su nombre de usuario
async function obtenerUsuarioPorNombre(nombre) {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT * FROM usuarios WHERE nombre = ?',
            [nombre],
            (err, results) => {
            if (err) {
                console.error(err.message);
                reject(err);
            } else {
                resolve(results[0]);
            }
        });
    });
}

// Función para obtener un usuario por su ID
async function getUserById(id) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, results) => {
            if (err) {
                console.error(err.message);
                reject(err);
            } else {
                resolve(results[0]);
            }
        });
    });
}

connection.end();

module.exports = {
    registrarUsuario,
    obtenerUsuarioPorNombre,
    getUserById
};