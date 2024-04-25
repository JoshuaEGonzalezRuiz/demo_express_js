const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const carritoController = require('../controllers/carritoController');

// Ruta para eliminar un producto del carrito
router.post('/:id', async (req, res) => {
    const idProducto = parseInt(req.params.id);
    let carrito = res.locals.carrito;
    const itemIndex = carrito.findIndex(item => parseInt(item.id) === idProducto);
    if (itemIndex !== -1) {
      const removedItem = carrito.splice(itemIndex, 1)[0];
      await carritoController.quitarProducto(req.user.id, idProducto);
      const producto = await productoController.obtenerPorId(idProducto);
      if (producto) {
        producto.cantidad += removedItem.cantidad;
        await productoController.actualizarCantidad(producto.cantidad, idProducto);
      }
    }
    res.locals.carrito = carrito;
    res.redirect('/carrito');
});

module.exports = router;
