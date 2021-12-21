const userRouter = require("express").Router();
const { webAuth } = require("../../middlewares/auth");

// Redirect to home
userRouter.get("/", (req, res) => {
    res.redirect("/homed");
});

// Giving the user data
userRouter.get("/home", webAuth, (req, res) => {
    res.json({
        userData: {
            username: req.user.username,
            email: req.user.email
        }
    });
});

// The views
// userRouter.get("/products", (req, res) => {
//     res.send("Products");
// });

module.exports = userRouter;