// routes/usuariosRoutes.js

const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// Ruta para el catálogo de productos
router.get('/', async (req, res) => {
    const productos = await productoController.obtenerTodos();
    res.render('catalogo', { title: 'Catálogo de Productos', productos, user: req.user != null ? `${req.user.nombre}` : '' });
});

module.exports = router;
