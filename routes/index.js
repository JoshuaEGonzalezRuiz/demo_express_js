// routes/index.js
const express = require('express');
const router = express.Router();

// Rutas públicas
router.get('/', (req, res) => {
  res.render('index', { title: req.user != null ? `Bienvenido ${req.user.nombre}` : 'Dev Cosmetics' , user: req.user != null ? `Bienvenido ${req.user.nombre}` : ''});
});

module.exports = router;