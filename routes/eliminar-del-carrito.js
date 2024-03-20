const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

// Ruta para eliminar un producto del carrito
router.post('/:id', (req, res) => {
    const idProducto = req.params.id;
    let carrito = req.session.carrito || [];
    const itemIndex = carrito.findIndex(item => item.id === idProducto);
    if (itemIndex !== -1) {
      const removedItem = carrito.splice(itemIndex, 1)[0];
      const producto = productosController.getProductoPorId(idProducto);
      if (producto) {
        producto.cantidad += removedItem.cantidad;
      }
    }
    req.session.carrito = carrito;
    res.redirect('/carrito');
});

module.exports = router;
