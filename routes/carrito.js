const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware para proteger rutas

// Ruta para el carrito de compra
router.get('/', authMiddleware.authenticate, (req, res) => {
    let carrito = req.session.carrito || []; // Obtiene el carrito de la sesión del usuario, si no existe, crea un nuevo carrito vacío
    res.render('carrito', { title: 'Carrito de Compra', carrito });
});

module.exports = router;
