// routes/logout.js
const express = require('express');
const router = express.Router();

// Ruta para cerrar sesión
router.get('/', (req, res) => {
    req.session.destroy(); // Destruir la sesión para cerrar sesión

    req.user = '';
    
    res.redirect('/'); // Redirigir al usuario a la página principal después de cerrar sesión
});

module.exports = router;