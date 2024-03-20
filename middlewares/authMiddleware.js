// authMiddleware.js

function authenticate(req, res, next) {
    if (req.session && req.session.user) {
        // El usuario está autenticado, continúa con la solicitud
        next();
    } else {
        // El usuario no está autenticado, redirigir al login
        res.redirect('/login');
    }
}

module.exports = {
    authenticate
};
