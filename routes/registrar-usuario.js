// routes/registrar-usuario.js
const express = require('express');
const router = express.Router();

// Ruta para manejar el registro de usuarios
router.post('/', (req, res) => {
    let usuarios = req.session.usuarios || []; // Obtiene los usuarios de la sesión del usuario, si no existe, crea una lista nueva de usuarios vacia
    const { nombre, email, password, confirmPassword } = req.body;

    // Verificar si la contraseña y su confirmación coinciden
    if (password !== confirmPassword) {
        return res.status(400).send('Las contraseñas no coinciden');
    }

    // Verificar si el usuario ya está registrado
    if (usuarios.find(usuario => usuario.email === email)) {
        return res.status(400).send('El usuario ya está registrado');
    }

    // Agregar el usuario a la lista de usuarios registrados
    usuarios.push({ nombre, email, password });
    req.session.usuarios = usuarios;
    // Redirigir al usuario a una página de éxito o a donde desees
    res.redirect('/login');
});

module.exports = router;