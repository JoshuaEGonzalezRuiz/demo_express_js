const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

// Ruta para buscar productos
router.get('/', (req, res) => {
    const query = req.query.q.toLowerCase();
    const productos = productosController.getProductos();
    const productosFiltrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(query) || producto.descripcion.toLowerCase().includes(query)
    );
    res.render('catalogo', { title: 'Resultados de la Búsqueda', productos: productosFiltrados });
});

module.exports = router;
