const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware para proteger rutas

// Ruta para el carrito de compra
router.get('/', authMiddleware.authenticate, async (req, res) => {
    let carrito = res.locals.carrito;

    res.render('carrito', { title: 'CARRITO', carrito, user: req.user != null ? `${req.user.nombre}` : '' });
});

module.exports = router;
