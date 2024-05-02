// controllers/productos.js
const productoModel = require('../models/productoModel');

async function obtenerTodos() {
  return await productoModel.obtenerTodos();
}

async function obtenerPorId(id) {
  return await productoModel.obtenerPorId(id);
}
async function actualizarCantidad(nuevaCantidad, productoId) {
  return await productoModel.actualizarCantidad(nuevaCantidad, productoId);
}

module.exports = {
  obtenerTodos,
  obtenerPorId,
  actualizarCantidad
};
