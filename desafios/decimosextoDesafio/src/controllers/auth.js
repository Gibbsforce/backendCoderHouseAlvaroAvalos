// Logs
import logger from "../../logs/index.js"
// Passport
import passport from "passport"
import Strategy from "passport-local"
// DAOS
import DAOS from "../DAOS/index.js"
// Services
import { nodemailerTransporter, mailOptionsNewUser } from "../services/sendMail.js"
// Utils
import { isMobilePhone } from "../utils/isMobilePhone.js"
import createHash from "../utils/createHash.js"
import isValidPassword from "../utils/isValidPassword.js"
// Controllers
const LocalStrategy = Strategy.Strategy
const { UserDAO } = DAOS
// Serialize and deserialize
passport.serializeUser((user, done) => {
    done(null, user)
})
passport.deserializeUser((obj, done) => {
    done(null, obj)
})
const getLogin = (req, res) => {
    req.isAuthenticated() ? res.status(302).json({ user: req.user, message: "Found" }) : res.status(401).json({ message: "Unauthorized" })
}
const getLogOut = (req, res) => {
    // const name = req.user?.username ?? "Guest"
    req.logout()
    // res.status(200).json({
    //     message: "OK",
    //     guest: name,
    //     description: `${name} logged out`
    // })
    res.redirect("/login")
}
const failToLogin = (req, res) => {
    req.user
    ?
    res.status(200).json({
        message: "OK",
        description: "User logged in"
    })
    :
    res.status(401).json({
        message: "Unauthorized",
        description: "Invalid username or password"
    })
}
const failToSignUp = (req, res) => {
    req.user
    ?
    res.status(200).json({
        message: "OK",
        description: "User logged in"
    })
    :
    res.status(401).json({
        message: "Unauthorized",
        description: "Fail"
    })
}

// Passport login
passport.use("login", new LocalStrategy((username, password, done) => {
    UserDAO.findOne({ username }, (error, user) => {
        console.log({ user })
        if (error) return done(error)
        if (!user) {
            logger.warn(`User ${username} not found`)
            return done(null, false)
        }
        if (!isValidPassword(user, password)) {
            logger.warn(`User ${username} password invalid`)
            return done(null, false)
        }
        logger.info(`User ${username} logged in`)
        console.log({ error, user })
        return done(null, user)
        })
    })
)
// Passport signup
passport.use("signup", new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
        UserDAO.findOne({ username }, (error, user) => {
            if (error) {
                logger.warn(`Error in sign up: ${username}: ${error}`)
                return done(error)
            }
            if (user) {
                logger.warn(`User ${username} already exists`)
                return done(null, false)
            }
            if (!req.file) {
                logger.warn(`No image uploaded for ${username}`)
                return done(null, false)
            }
            if (!isMobilePhone(req.body.phone)) {
                logger.warn(`Invalid phone number: ${req.body.phone}`)
                return done(null, false)
            }
            const newUser = {
                username: username,
                password: createHash(password),
                name: req.body.name,
                lastname: req.body.lastname,
                address: req.body.address,
                age: req.body.age,
                phone: req.body.phone,
                avatar: `${req.protocol}://${req.get("host")}/images/${req.file?.filename}`
            }
            UserDAO.create(newUser, (err, userCreated) => {
            if (err) {
                logger.warn(`Error saving user: ${username}: ${err}`)
                return done(error)
            }
            console.log(user)
            console.log(`User created successfully: ${userCreated}`)
            logger.info(`User ${username} created`)
            return done(null, userCreated)
            })
        })
    })
)
const loginAuth = passport.authenticate("login", {
    failureRedirect: "/loginfail"
})
const signupAuth = passport.authenticate("signup", {
    failureRedirect: "/signupfail"
})
const login = (req, res) => {
    res.redirect("/user")
    // res.status(200).json({
    //     message: "OK",
    //     user: req.user,
    //     description: `${req.user.username} logged in`,
    // })
}
const signup = async (req, res) => {
    try {
        const info = await nodemailerTransporter.sendMail(mailOptionsNewUser(
            req.user.name,
            req.user.lastname,
            req.user.username,
            req.user.address,
            req.user.age,
            req.user.phone,
            `${req.protocol}://${req.get("host")}/images/${req.file?.filename}`))
        if (!info) return res.status(500).json({ message: "Error sending email" })
        res.redirect("/user")
        // res.status(200).json({
        //     message: "OK",
        //     user: req.user,
        //     description: `${req.user.username} signed up`
        // })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            description: error
        })
    }
}
export default {
    getLogin,
    getLogOut,
    failToLogin,
    failToSignUp,
    loginAuth,
    signupAuth,
    login,
    signup
}