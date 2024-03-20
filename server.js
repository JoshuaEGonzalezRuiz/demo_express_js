const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const router = require('./routes/routes');

// Configurar middleware para manejar sesiones
app.use(session({
  secret: 'secreto', // Clave secreta para firmar la cookie de sesión
  resave: false,
  saveUninitialized: true
}));

app.use((req, res, next) => {
  res.locals.usuarios = req.session.usuarios || [];
  res.locals.usuario = req.session.usuario || '';
  res.locals.carrito = req.session.carrito || [];
  console.log(`Solicitud recibida: ${req.method} ${req.url}`);
  next();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal');
});

// Configuración de la plantilla Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware para procesar archivos estáticos en la carpeta 'public'
app.use(express.static('public'));
app.use(express.json());

app.use('/', router);

// Puerto en el que escucha el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
