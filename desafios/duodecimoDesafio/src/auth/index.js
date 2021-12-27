// To login if authenticated from local
export const webAuth = (req, res, next) => {
    req.isAuthenticated()
        ? next()
        : res.redirect("/login");
}
// Error if not authenticated from api
export const apiAuth = (req, res, next) => {
    req.isAuthenticated()
        ? next()
        : res.status(401).json({ error: "coudln't authenticate" });
}