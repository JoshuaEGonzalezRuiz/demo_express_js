const usuarioModel = require('../models/usuarioModel');

async function registrarUsuario(nombre, email, password_hash) {
    return await usuarioModel.registrarUsuario(nombre, email, password_hash);
}

async function obtenerUsuarioPorNombre(nombre) {
    return await usuarioModel.obtenerPorNombre(nombre);
}

async function obtenerUsuarioPorId(id) {
    return await usuarioModel.obtenerPorId(id);
}

module.exports = {
    registrarUsuario,
    obtenerUsuarioPorNombre,
    obtenerUsuarioPorId
};
