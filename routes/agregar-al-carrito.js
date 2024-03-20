const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

// Ruta para agregar un producto al carrito
router.post('/:id', (req, res) => {
    const idProducto = req.params.id;
    const producto = productosController.getProductoPorId(idProducto);
    if (producto && producto.cantidad > 0) {
        let carrito = req.session.carrito || [];
        let productoEnCarrito = carrito.find(item => item.id === idProducto);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad++;
        } else {
            carrito.push({ id: idProducto, nombre: producto.nombre, precio: producto.precio, cantidad: 1 });
        }
        producto.cantidad--;
        req.session.carrito = carrito;
        res.redirect('/catalogo');
    } else {
        res.status(404).send('Producto no encontrado o no disponible');
    }
  });  

module.exports = router;
