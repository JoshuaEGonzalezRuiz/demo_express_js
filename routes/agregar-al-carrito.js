const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const carritoController = require('../controllers/carritoController');

// Ruta para agregar un producto al carrito
router.post('/:id', async (req, res) => {
    const idProducto = req.params.id;
    const producto = await productoController.obtenerPorId(idProducto);
    if (producto && producto.cantidad > 0) {
        let carrito;
        if(res.locals.carrito.length > 0){
            carrito = res.locals.carrito;
        } else {
            carrito = req.session.carrito || [];
        }
        let productoEnCarrito = carrito.find(item => parseInt(item.id) === parseInt(idProducto));
        if (productoEnCarrito) {
            productoEnCarrito.cantidad++;
            if(req.hasOwnProperty('user')){
                await carritoController.agregarProducto(req.user.id, idProducto, productoEnCarrito.cantidad, req.cookies.token);
            }
        } else {
            carrito.push({ id: idProducto, nombre: producto.nombre, precio: producto.precio, cantidad: 1 , imagen: producto.imagen});
            if(req.hasOwnProperty('user')){
                await carritoController.agregarProducto(req.user.id, idProducto, 1, req.cookies.token);
            }
        }
        producto.cantidad--;
        if(req.hasOwnProperty('user')){
            await productoController.actualizarCantidad(producto.cantidad, idProducto, req.cookies.token);
        }
        if(res.locals.carrito.length > 0){
            res.locals.carrito = carrito;
        } else {
            req.session.carrito = carrito;
        }
        res.redirect('/catalogo');
    } else {
        res.status(404).send('Producto no encontrado o no disponible');
    }
  });  

module.exports = router;
