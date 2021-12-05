// Auth router
const authRouter = require("express").Router();
// Path
const path = require("path");
// Get hone from localhost
authRouter.get("/", (req, res) => {
    res.redirect("/home");
});
// Login
authRouter.get("/login", (req, res) => {
    const name = req.session?.name;
    name
        ?
        res.redirect(`/home?name=${name}`)
        :
        res.sendFile(path.join(process.cwd(), "public/logged.html"));
});
// Logout
authRouter.get("/logout", (req, res) => {
    const name = req.session?.name;
    !name
        ?
        res.redirect("/")
        :
        req.session.destroy(error => {
            !error
                ?
                res.redirect(`/loggedout?name=${name}`)
                :
                res.redirect("/");
        });
});
// Post login
authRouter.post("/login", (req, res) => {
    req.session.name = req.body.name;
    res.redirect(`/home?name=${req.body.name}`);
});
// Exporting the auth router
module.exports = authRouter;