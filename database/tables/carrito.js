const { obtenerConexion } = require('../conexion');

// Función para verificar si un producto está en el carrito de un usuario
async function verificarProductoEnCarrito(usuarioId, productoId) {
    const conexion = await obtenerConexion();
    try {
        const [results] = await conexion.query(
            'SELECT * FROM carrito WHERE usuario_id = ? AND producto_id = ?',
            [usuarioId, productoId]
        );
        return results.length > 0;
    } catch (error) {
        console.error('Error al verificar el producto en el carrito:', error.message);
        throw error;
    } finally {
        conexion.release(); // Liberar la conexión al finalizar
    }
}

// Función para agregar un producto al carrito de un usuario
async function agregarProducto(usuarioId, productoId, cantidad) {
    const productoEnCarrito = await verificarProductoEnCarrito(usuarioId, productoId);

    if (productoEnCarrito) {
        await actualizarCantidad(cantidad, productoId);
    } else {
        const conexion = await obtenerConexion();
        try {
            await conexion.query(
                `INSERT INTO carrito (usuario_id, producto_id, cantidad) VALUES (?, ?, ?)`,
                [usuarioId, productoId, cantidad]
            );
            console.log('Producto agregado al carrito correctamente');
        } catch (error) {
            console.error('Error al agregar el producto al carrito:', error.message);
            throw error;
        } finally {
            conexion.release(); // Liberar la conexión al finalizar
        }
    }
}

async function actualizarCantidad(cantidad, usuarioId, productoId) {
    if (cantidad < 1) {
        await quitarProducto(usuarioId, productoId);
    } else {
        const conexion = await obtenerConexion();
        try {
            await conexion.query(
                `UPDATE carrito SET cantidad = ? WHERE usuario_id = ? AND producto_id = ?`,
                [cantidad, usuarioId, productoId]
            );
            console.log('Cantidad de producto en el carrito actualizada');
        } catch (error) {
            console.error('Error al actualizar la cantidad en el carrito:', error.message);
            throw error;
        } finally {
            conexion.release(); // Liberar la conexión al finalizar
        }
    }
}

// Función para quitar algún producto del carrito de compras de un usuario
async function quitarProducto(usuarioId, productoId) {
    const conexion = await obtenerConexion();
    try {
        await conexion.query(
            `DELETE FROM carrito WHERE usuario_id = ? AND producto_id = ?`,
            [usuarioId, productoId]
        );
        console.log('Producto eliminado del carrito correctamente');
    } catch (error) {
        console.error('Error al eliminar el producto del carrito:', error.message);
        throw error;
    } finally {
        conexion.release(); // Liberar la conexión al finalizar
    }
}

// Función para obtener los productos del carrito de compras de un usuario
async function obtenerProductos(usuarioId) {
    const conexion = await obtenerConexion();
    try {
        const [results] = await conexion.query(
            `
            SELECT productos.id, productos.nombre, productos.descripcion, carrito.cantidad, productos.precio, productos.imagen
            FROM carrito
            JOIN productos ON carrito.producto_id = productos.id
            WHERE carrito.usuario_id = ?
            `,
            [usuarioId]
        );
        return results;
    } catch (error) {
        console.error('Error al obtener los productos del usuario ID:', error.message);
        throw error;
    } finally {
        conexion.release(); // Liberar la conexión al finalizar
    }
}

module.exports = {
    agregarProducto,
    obtenerProductos,
    actualizarCantidad,
    quitarProducto
};