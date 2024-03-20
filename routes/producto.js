const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

// Ruta para el detalle de producto
router.get('/:id', (req, res) => {
    const idProducto = req.params.id;
    const producto = productosController.getProductoPorId(idProducto);
    res.render('producto', { title: 'Detalle del Producto', producto });
});

module.exports = router;