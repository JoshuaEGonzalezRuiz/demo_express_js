const express = require('express');
const router = express.Router();

// Middleware para procesar la compra
router.post('/', (req, res) => {
    const carrito = req.session.carrito || [];

    // Aquí iría la lógica para procesar la compra, por ejemplo, actualizar la base de datos y vaciar el carrito

    // Vaciar el carrito después de procesar la compra
    req.session.carrito = [];

    res.render('confirmacion-compra', { title: 'Compra Exitosa', user: req.user != null ? `${req.user.nombre}` : '' });
});

module.exports = router;
