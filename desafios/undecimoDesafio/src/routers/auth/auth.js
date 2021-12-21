const authRouter = require("express").Router();

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const { UserDAO } = require("../../DAOS");
const createHash = require("../../utils/createHash");
const isValidPassword = require("../../utils/isValidPassword.js");

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

authRouter.get("/login", (req, res) => {
    req.isAuthenticated() ? res.redirect("/") : res.redirect("/logged");
});

authRouter.get("/logout", (req, res) => {
    const name = req.user?.displayName ?? "visitor";
    req.logout();
    res.json({
        message: `${name} logged out`
    })
});

authRouter.get("/faillogin", (req, res) => {
    res.send("fail-login");
});

authRouter.get("/failsignup", (req, res) => {
    res.send("fail-signup");
});

passport.use("login", new LocalStrategy((username, password, done) => {

    UserDAO.findOne({ email: username }, (error, user) => {
        console.log({ user });

        if (error) return done(error);

        if (!user) {
            console.log(`User not found: ${username}`);
            return done(null, false);
        }

        if (!isValidPassword(user, password)) {
            console.log("Invalid Password");
            return done(null, false);
        }

        console.log({ error, user });
        return done(null, {});
    });
}));

passport.use("signup", new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
        UserDAO.findOne({ email: username }, (err, user) => {

            if (err) {
                console.log(`Error in Sign Up: ${err}`);
                return done(err);
            }

            if (user) {
                console.log("User already exists");
                return done(null, false);
            }

            const newUser = {
                username: username,
                name: req.body.name,
                lastname: req.body.lastname,
                email: req.body.email,
                password: createHash(password),
                createdAt: Date.now(),
                updatedAt: Date.now()
            }

            UserDAO.create(newUser, (error, userCreated) => {
                if (error) {
                    console.log(`Error in saving user: ${err}`);
                    return done(err);
                }
                console.log(user);
                console.log(`User created succesfully: ${userCreated}`);
                return done(null, userCreated);
            });
        });
    })
);

authRouter.post("/auth/local",
    passport.authenticate("login",
        { failureRedirect: "/faillogin" }),
    (req, res) => {
        res.redirect("/");
    }
);

authRouter.post("/signup/local",
    passport.authenticate("signup",
        { failureRedirect: "/failsignup" }),
    (req, res) => {
        res.redirect("/")
    }
);

module.exports = authRouter