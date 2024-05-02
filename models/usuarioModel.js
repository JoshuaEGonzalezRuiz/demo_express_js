const axios = require('axios');

class Usuario {
    constructor(id, nombre, email, password_hash) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.password_hash = password_hash;
    }
}

async function registrarUsuario(nombre, email, password) {
    try {
        await axios.post(`${process.env.BASE_URL}/usuarios/registrar`, { nombre, email, password });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        throw error;
    }
}

async function obtenerPorNombre(nombre) {
    try {
        const response = await axios.get(`${process.env.BASE_URL}/usuarios/${nombre}`);
        const usuario = response.data;
        return new Usuario(usuario.id, usuario.nombre, usuario.email, usuario.password_hash);
    } catch (error) {
        console.error('Error al obtener usuario por nombre:', error);
        throw error;
    }
}

async function obtenerPorId(id) {
    try {
        const response = await axios.get(`${process.env.BASE_URL}/usuarios/id/${id}`);
        const usuario = response.data;
        return new Usuario(usuario.id, usuario.nombre, usuario.email, usuario.password_hash);
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        throw error;
    }
}

module.exports = {
    registrarUsuario,
    obtenerPorNombre,
    obtenerPorId
};
