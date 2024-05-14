const axios = require('axios');

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

async function agregarProducto(usuarioId, productoId, cantidad, token) {
    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        const response = await axios.post(`${process.env.BASE_URL}/carrito/agregar`, {
            usuarioId,
            productoId,
            cantidad
        }, axiosConfig);
        return response.data;
    } catch (error) {
        console.error('Error al agregar el producto al carrito:', error);
        throw error;
    }
}

async function obtenerProductos(usuarioId, token) {
    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        const response = await axios.get(`${process.env.BASE_URL}/carrito/${usuarioId}`, axiosConfig);
        return response.data.map(producto => new ProductoCarrito(
            producto.id,
            producto.nombre,
            producto.descripcion,
            producto.cantidad,
            producto.precio,
            producto.imagen
        ));
    } catch (error) {
        console.error('Error al obtener los productos del carrito:', error);
        throw error;
    }
}

async function actualizarCantidad(cantidad, usuarioId, productoId, token) {
    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        const response = await axios.put(`${process.env.BASE_URL}/carrito/actualizar-cantidad`, {
            cantidad,
            usuarioId,
            productoId
        }, axiosConfig);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar la cantidad en el carrito:', error);
        throw error;
    }
}

async function quitarProducto(usuarioId, productoId, token) {
    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        const response = await axios.delete(`${process.env.BASE_URL}/carrito/${usuarioId}/${productoId}`, axiosConfig);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el producto del carrito:', error);
        throw error;
    }
}

module.exports = {
    agregarProducto,
    obtenerProductos,
    actualizarCantidad,
    quitarProducto
};