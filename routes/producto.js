const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// Ruta para el detalle de producto
router.get('/:id', async (req, res) => {
    const idProducto = req.params.id;
    const producto = await productoController.obtenerPorId(idProducto);
    res.render('producto', { title: 'Detalle del Producto', producto, user: req.user != null ? `${req.user.nombre}` : '' });
});

module.exports = router;