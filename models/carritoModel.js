const carritoDB = require('../database/tables/carrito');

class ProductoCarrito {
    constructor(id, nombre, descripcion, cantidad, precio, imagen) {
      this.id = id;
      this.nombre = nombre;
      this.descripcion = descripcion;
      this.cantidad = cantidad;
      this.precio = precio;
      this.imagen = imagen;
    }
  }

async function agregarProducto(usuarioId, productoId, cantidad) {
    try {
        return await carritoDB.agregarProducto(usuarioId, parseInt(productoId), cantidad);
    } catch(error) {
        console.error('Error al agregar el producto al carrito:', error);
        throw error;
    }
}

async function obtenerProductos(usuarioId) {
    try {
        const productos = await carritoDB.obtenerProductos(usuarioId);
        if(productos.length > 0){
            return productos.map(producto => new ProductoCarrito(producto.id,
                producto.nombre, producto.descripcion, producto.cantidad,
                producto.precio, producto.imagen));
        } else {
            return [];
        }
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        throw error;
      }
}

async function actualizarCantidad(cantidad, usuarioId, productoId) {
    try {
        return await carritoDB.actualizarCantidad(cantidad, usuarioId, parseInt(productoId));
    } catch(error) {
        console.error('Error al agregar el producto al carrito:', error);
        throw error;
    }
}

async function quitarProducto(usuarioId, productoId) {
    try {
        return await carritoDB.quitarProducto(usuarioId, productoId);
    } catch(error) {
        console.error('Error al agregar el producto al carrito:', error);
        throw error;
    }
}

module.exports = {
    agregarProducto,
    obtenerProductos,
    actualizarCantidad,
    quitarProducto
  };
  