// routes/routes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware para proteger rutas

// Importa las rutas específicas
const index = require('./index');
const login = require('./login');
const registro = require('./registro');
const registrarUsuario = require('./registrar-usuario');
const catalogoRouter = require('./catalogo');
const buscarProductoRouter = require('./buscar-producto');
const productoRouter = require('./producto');
const carritoRouter = require('./carrito');
const detalleCompraRouter = require('./detalle-compra');
const agregarAlCarrito = require('./agregar-al-carrito');
const actualizarCantidadRouter = require('./actualizar-cantidad');
const eliminarDelCarritoRouter = require('./eliminar-del-carrito');
const procesarCompraRouter = require('./procesar-compra');

// Configura las rutas
router.use('/', index);
router.use('/login', login);
router.use('/registro', registro);
router.use('/registrar-usuario', registrarUsuario);
router.use('/catalogo', catalogoRouter);
router.use('/buscar-producto', buscarProductoRouter);
router.use('/producto', productoRouter);
router.use('/carrito', authMiddleware.authenticate, carritoRouter);
router.use('/detalle-compra', authMiddleware.authenticate, detalleCompraRouter);
router.use('/agregar-al-carrito', agregarAlCarrito);
router.use('/actualizar-cantidad', actualizarCantidadRouter);
router.use('/eliminar-del-carrito', eliminarDelCarritoRouter);
router.use('/procesar-compra', procesarCompraRouter);

module.exports = router;
