// controllers/carrito.js
const carritoModel = require('../models/carritoModel');

async function agregarProducto(usuarioId, productoId, cantidad, token) {
    return await carritoModel.agregarProducto(usuarioId, productoId, cantidad, token);
}

async function obtenerProductos(usuarioId, token) {
    return await carritoModel.obtenerProductos(usuarioId, token);
}

async function actualizarCantidad(cantidad, usuarioId, productoId, token) {
    return await carritoModel.actualizarCantidad(cantidad, usuarioId, productoId, token);
}

async function quitarProducto(usuarioId, productoId, token) {
    return await carritoModel.quitarProducto(usuarioId, productoId, token);
}

module.exports = {
    agregarProducto,
    obtenerProductos,
    actualizarCantidad,
    quitarProducto
};
