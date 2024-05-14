const axios = require('axios');

class Usuario {
    constructor(id, nombre, email, password_hash) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.password_hash = password_hash;
    }
}

async function registrarUsuario(dataSegura) {
    try {
        await axios.post(`${process.env.BASE_URL}/usuarios/registrar`, { dataSegura });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        throw error;
    }
}

async function logearUsuario(dataSegura) {
    try {
        const response = await axios.post(`${process.env.BASE_URL}/usuarios/login`, {dataSegura});
        const usuario = response.data;
        return new Usuario(usuario.id, usuario.nombre, usuario.email, usuario.password_hash);
    } catch (error) {
        console.error('Error al obtener usuario por nombre:', error);
        throw error;
    }
}

module.exports = {
    registrarUsuario,
    logearUsuario
};
