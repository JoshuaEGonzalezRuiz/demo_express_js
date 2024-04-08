// routes/registrar-usuario.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // Reemplaza esto con la ruta correcta a tu archivo db.js

// Ruta para manejar el registro de usuarios
router.post('/', (req, res) => {
    const { nombre, email, password, confirmPassword } = req.body;

    // Verificar si la contraseña y su confirmación coinciden
    if (password !== confirmPassword) {
        return res.status(400).send('Las contraseñas no coinciden');
    }

    // Verificar si el usuario ya está registrado
    db.obtenerUsuarioPorNombre(nombre, (err, usuarioExistente) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }
        if (usuarioExistente) {
            return res.status(400).send('El usuario ya está registrado');
        }

        db.registrarUsuario(nombre, email, password)
        .then(() => {
            // Usuario insertado correctamente
            res.redirect('/login');
        })
        .catch((err) => {
            // Error al insertar usuario
            return res.status(500).send('Error interno del servidor');
        });

    });
});

module.exports = router;