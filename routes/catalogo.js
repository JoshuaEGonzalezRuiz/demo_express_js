// routes/usuariosRoutes.js

const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

// Ruta para el catálogo de productos
router.get('/', (req, res) => {
    const productos = productosController.getProductos();
    res.render('catalogo', { title: 'Catálogo de Productos', productos });
});

module.exports = router;
