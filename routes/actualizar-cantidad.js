const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

// Ruta para actualizar la cantidad de un producto en el carrito
router.post('/:id/:cantidad', (req, res) => {
    const idProducto = req.params.id;
    const cantidad = parseInt(req.params.cantidad);
    let carrito = req.session.carrito || [];
    const item = carrito.find(item => item.id === idProducto);
    const producto = productosController.getProductoPorId(idProducto);
    if (item) {
        const cantidadNueva = item.cantidad + cantidad;
        if (cantidadNueva > 0 && cantidad <= producto.cantidad) {
            item.cantidad = cantidadNueva;
            producto.cantidad -= cantidad;
            if (item.cantidad === 0) {
                carrito = carrito.filter(item => item.id !== idProducto);
            }
        }
    }
    req.session.carrito = carrito;
    res.redirect('/carrito');
});

module.exports = router;
