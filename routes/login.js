// routes/login.js
const express = require('express');
const router = express.Router();

// Ruta para mostrar el formulario de login
router.get('/', (req, res) => {
  res.render('login', { title: 'Iniciar sesión' });
});

// Ruta para manejar el inicio de sesión
router.post('/', (req, res) => {
  const { username, password } = req.body;
  let usuarios = req.session.usuarios || []; // Obtiene los usuarios de la sesión del usuario, si no existe, crea una lista nueva de usuarios vacia

  let usuario = usuarios.find(usuario => usuario.nombre == username);
  let contrasena = usuarios.find(usuario => usuario.password == password);
  // Verificar credenciales y autenticar al usuario
  if (usuario && contrasena) {
    req.session.user = { username }; // Almacenar información del usuario en la sesión
    return res.redirect('/'); // Redirigir al usuario a la página principal después del login
  } else {
    return res.render('login', { title: 'Iniciar sesión', error: 'Credenciales incorrectas' });
  }
});

module.exports = router;