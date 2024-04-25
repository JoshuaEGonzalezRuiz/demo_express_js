const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const carritoController = require('../controllers/carritoController');

// Ruta para actualizar la cantidad de un producto en el carrito
router.post('/:id/:cantidad', async (req, res) => {
    const idProducto = req.params.id;
    const cantidad = parseInt(req.params.cantidad);
    let carrito = res.locals.carrito;
    const item = carrito.find(item => parseInt(item.id) === parseInt(idProducto));
    const producto = await productoController.obtenerPorId(idProducto);
    if (item) {
        const cantidadNueva = item.cantidad + cantidad;
        if (cantidadNueva > 0 && cantidad <= producto.cantidad) {
            item.cantidad = cantidadNueva;
            producto.cantidad -= cantidad;
            if (item.cantidad === 0) {
                carrito = carrito.filter(item => item.id !== parseInt(idProducto));
            }
            // Actualizar la cantidad del producto en la base de datos
            await carritoController.actualizarCantidad(cantidadNueva, req.user.id, idProducto);
            await productoController.actualizarCantidad(producto.cantidad, idProducto);
        }
    }
    res.locals.carrito = carrito;
    res.redirect('/carrito');
});

module.exports = router;
