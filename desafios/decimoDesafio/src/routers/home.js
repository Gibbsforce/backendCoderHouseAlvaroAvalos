// Home router
const homeRouter = require("express").Router();
// requiring auth middleware
const auth = require("../middlewares/auth");
// path
const path = require("path");
// Getting home
homeRouter.get("/home", auth, (req, res) => {
    res.sendFile(path.join(process.cwd(), "public/homed.html"));
});
// Exporting home router
module.exports = homeRouter;