// controllers/carrito.js
const carritoModel = require('../models/carritoModel');


async function agregarProducto(usuarioId, productoId, cantidad) {
    const resultado = await carritoModel.agregarProducto(usuarioId, productoId, cantidad);
    return resultado;
}

async function obtenerProductos(usuarioId) {
    const productos = await carritoModel.obtenerProductos(usuarioId);
    return productos;
}

async function actualizarCantidad(cantidad, usuarioId, productoId) {
    const resultado = await carritoModel.actualizarCantidad(cantidad, usuarioId, productoId);
    return resultado;
}

async function quitarProducto(usuarioId, productoId) {
    const resultado = await carritoModel.quitarProducto(usuarioId, productoId);
    return resultado;
}

module.exports = {
    agregarProducto,
    obtenerProductos,
    actualizarCantidad,
    quitarProducto
};
