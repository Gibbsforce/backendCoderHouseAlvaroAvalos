export const localAuth = (req, res, next) => {
    req.isAuthenticated()
        ? next()
        : res.status(401).json({ message: "Unauthorized" });
}
export const oAuth = (req, res, next) => {
    req.isAuthenticated()
        ? next()
        : res.status(401).json({ message: "Unauthorized" })
}