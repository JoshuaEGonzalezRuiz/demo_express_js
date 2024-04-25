const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// Ruta para buscar productos
router.get('/', async (req, res) => {
    const query = req.query.q.toLowerCase();
    const productos = await productoController.obtenerTodos();
    const productosFiltrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(query) || producto.descripcion.toLowerCase().includes(query)
    );
    res.render('catalogo', { title: 'Resultados de la Búsqueda', productos: productosFiltrados, user: req.user != null ? `${req.user.nombre}` : '' });
});

module.exports = router;
