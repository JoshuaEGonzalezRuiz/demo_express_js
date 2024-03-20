function mostrarContrasena() {
    const contrasenaInput = document.getElementById('contrasena');
    const botonMostrarContrasena = document.getElementById('mostrarContrasena');
    if (contrasenaInput.type === 'password') {
        contrasenaInput.type = 'text';
        botonMostrarContrasena.innerHTML = '<i class="material-symbols-rounded">visibility</i>';
    } else {
        contrasenaInput.type = 'password';
        botonMostrarContrasena.innerHTML = '<i class="material-symbols-rounded">visibility_off</i>';
    }
}


module.exports = {
    mostrarContrasena
};  