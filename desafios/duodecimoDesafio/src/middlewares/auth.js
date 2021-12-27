// To login if authenticated from local
const webAuth = (req, res, next) => {
    req.isAuthenticated()
        ? next()
        : res.redirect("/login");
}
// Error if not authenticated from api
const apiAuth = (req, res, next) => {
    req.isAuthenticated()
        ? next()
        : res.status(401).json({ error: "coudln't authenticate" });
}
// Exporting
module.exports = {
    webAuth,
    apiAuth
}