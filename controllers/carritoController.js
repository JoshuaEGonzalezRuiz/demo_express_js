// controllers/carrito.js
const carritoModel = require('../models/carritoModel');

async function agregarProducto(usuarioId, productoId, cantidad) {
    return await carritoModel.agregarProducto(usuarioId, productoId, cantidad);
}

async function obtenerProductos(usuarioId) {
    return await carritoModel.obtenerProductos(usuarioId);
}

async function actualizarCantidad(cantidad, usuarioId, productoId) {
    return await carritoModel.actualizarCantidad(cantidad, usuarioId, productoId);
}

async function quitarProducto(usuarioId, productoId) {
    return await carritoModel.quitarProducto(usuarioId, productoId);
}

module.exports = {
    agregarProducto,
    obtenerProductos,
    actualizarCantidad,
    quitarProducto
};
