const usuarioModel = require('../models/usuarioModel');
const authMiddleWare = require('../middlewares/authMiddleware');

// Función asincrónica para registrar un usuario
async function registrarUsuario(nombre, email, password_hash) {
    // Se encriptan el nombre, email y hash de la contraseña de forma paralela
    let [nombreSeguro, emailSeguro, passwordHashSeguro] = await Promise.all([
        authMiddleWare.encryptData(nombre),
        authMiddleWare.encryptData(email),
        authMiddleWare.encryptData(password_hash)
    ]);

    // Se registra al usuario en la base de datos
    return await usuarioModel.registrarUsuario(`${nombreSeguro},${emailSeguro},${passwordHashSeguro}`);
}

// Función asincrónica para logear a un usuario
async function logearUsuario(nombre, password) {
    // Se encriptan el nombre y la contraseña de forma paralela
    let [nombreSeguro, passwordSeguro] = await Promise.all([
        authMiddleWare.encryptData(nombre),
        authMiddleWare.encryptData(password)
    ]);

    // Se intenta logear al usuario en la aplicación
    return await usuarioModel.logearUsuario(`${nombreSeguro},${passwordSeguro}`);
}

module.exports = {
    registrarUsuario,
    logearUsuario
};
