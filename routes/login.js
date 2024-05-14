//routes/login.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware para proteger rutas
const carritoController = require('../controllers/carritoController');

// Ruta para mostrar el formulario de login
router.get('/', (req, res) => {
  res.render('login', { title: 'Iniciar sesión', user: req.user != null ? `${req.user.nombre}` : '' });
});


router.post('/', passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true
}), async (req, res) => {
  // Si se autentica correctamente, crea un token JWT
  const token = authMiddleware.generateToken(req.user.id, '1h');

  res.cookie('token', token, { httpOnly: true, secure: false });

  let carrito = res.locals.carrito;

  if (carrito) {
    await duplicarCarritoEnDB(req.user.id, carrito, token);
  }

  res.redirect('/carrito');
});


async function duplicarCarritoEnDB(usuarioId, carrito, token) {
  for (const producto in carrito) {
    console.log('Producto: ' + carrito[producto].nombre);

    await carritoController.agregarProducto(usuarioId, carrito[producto].id, carrito[producto].cantidad, token);
  }
}

module.exports = router;