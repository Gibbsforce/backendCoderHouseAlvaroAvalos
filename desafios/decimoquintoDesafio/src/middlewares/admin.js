const isAdmin = true;
const admin = (req, res, next) => {
    if (isAdmin) return next();
    return res
        .status(403)
        .json({
            error: -1,
            description: `Not authorized on route: ${req.baseUrl}${req.path} and method: ${req.method}`
    });
};
module.exports = {
    admin
};