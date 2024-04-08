const sqlite3 = require('sqlite3').verbose();

// Crear conexión a la base de datos
const db = new sqlite3.Database('database.sqlite');

// Crear tabla de usuarios si no existe
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    email TEXT UNIQUE,
    password TEXT
  )`);
});

// Función para insertar un nuevo usuario en la base de datos
function registrarUsuario(nombre, email, password) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare('INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)');
        stmt.run(nombre, email, password, (err) => {
            if (err) {
                console.error(err.message);
                reject(err);
            } else {
                console.log('Usuario insertado correctamente');
                resolve();
            }
            stmt.finalize();
        });
    });
}

// Función para obtener un usuario por su email
function obtenerUsuarioPorNombre(nombre, callback) {
    db.get('SELECT * FROM usuarios WHERE nombre = ?', [nombre], (err, row) => {
        if (err) {
            console.error(err.message);
            callback(err, null);
        } else {
            callback(null, row);
        }
    });
}

// Función para obtener un usuario por su ID
function getUserById(id, callback) {
    db.get('SELECT * FROM usuarios WHERE id = ?', [id], (err, row) => {
        if (err) {
            console.error(err.message);
            callback(err, null);
        } else {
            callback(null, row);
        }
    });
}

module.exports = {
    registrarUsuario,
    obtenerUsuarioPorNombre,
    getUserById
};