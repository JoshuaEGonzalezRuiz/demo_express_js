// controllers/productos.js
const productoModel = require('../models/productoModel');


async function obtenerTodos() {
  const productos = await productoModel.obtenerTodos();
  return productos;
}

async function obtenerPorId(id) {
  const producto = await productoModel.obtenerPorId(id);
  return producto;
}

async function actualizarCantidad(nuevaCantidad, productoId) {
  const resultado = await productoModel.actualizarCantidad(nuevaCantidad, productoId);
  return resultado;
}

module.exports = {
  obtenerTodos,
  obtenerPorId,
  actualizarCantidad
};
