const isAdmin = true;
const admin = (req, res, next) => {
    if (isAdmin) return next();
    return res
        .status(403)
        .json({
            error: -1,
            description: `No tienes permiso para acceder a esta ruta: ${req.baseUrl}${req.path} metodo: ${req.method}`
    });
};
module.exports = {
    admin
};