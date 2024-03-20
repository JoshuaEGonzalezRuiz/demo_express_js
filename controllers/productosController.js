// controllers/productos.js
const productoModel = require('../models/productoModel');


function getProductos() {
  const productos = productoModel.obtenerTodos();
  return productos;
}

function getProductoPorId(id) {
  const producto = productoModel.obtenerPorId(id);
  return producto;
}

module.exports = {
  getProductos,
  getProductoPorId
};
