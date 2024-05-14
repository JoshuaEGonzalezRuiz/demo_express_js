const axios = require('axios');
const dotenv = require('dotenv');

//Configura DotEnv
dotenv.config();

class Producto {
  constructor(id, nombre, descripcion, cantidad, precio, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.cantidad = cantidad;
    this.precio = precio;
    this.imagen = imagen;
  }
}

async function obtenerTodos() {
  try {
    const response = await axios.get(`${process.env.BASE_URL}/productos`);
    const productos = response.data;
    return productos.map(producto => new Producto(producto.id,
      producto.nombre, producto.descripcion, producto.cantidad,
      producto.precio, producto.imagen));
  } catch (error) {
    console.error('Error al obtener todos los productos:', error);
    throw error;
  }
}

async function obtenerPorId(id) {
  try {
    const response = await axios.get(`${process.env.BASE_URL}/productos/${id}`);
    const producto = response.data;
    return new Producto(producto.id, producto.nombre,
      producto.descripcion, producto.cantidad, producto.precio, producto.imagen);
  } catch (error) {
    console.error('Error al obtener el producto por ID:', error);
    throw error;
  }
}

async function actualizarCantidad(nuevaCantidad, productoId, token) {
  const axiosConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  try {
    await axios.put(`${process.env.BASE_URL}/productos/actualizar-cantidad`, { nuevaCantidad, productoId }, axiosConfig);
    console.log('Cantidad de producto actualizada');
  } catch (error) {
    console.error('Error al actualizar la cantidad del producto:', error);
    throw error;
  }
}

module.exports = {
  obtenerTodos,
  obtenerPorId,
  actualizarCantidad
};