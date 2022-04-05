// Logs
import logger from "../../logs/index.js"
// Passport
import passport from "passport"
import Strategy from "passport-local"
// DAOS
import persistence from "./index.js"
// Services
import {
  nodemailerTransporter,
  mailOptionsNewUser,
} from "../services/sendMail.js"
// Utils
import { isMobilePhone } from "../utils/isMobilePhone.js"
import createHash from "../utils/createHash.js"
import isValidPassword from "../utils/isValidPassword.js"
// Controllers
const LocalStrategy = Strategy.Strategy
const { userDAO } = persistence
// Serialize and deserialize
passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((obj, done) => {
  done(null, obj)
})
const getLogin = (req, res) => {
  req.isAuthenticated()
    ? res.status(302).json({ user: req.user, message: "Found" })
    : res.status(401).json({ message: "Unauthorized" })
}
const getLogOut = (req, res) => {
  req.logout()
  res.redirect("/login")
}
const failToLogin = (req, res) => {
  req.user
    ? res.status(200).json({
        message: "OK",
        description: "User logged in",
      })
    : res.status(401).json({
        message: "Unauthorized",
        description: "Invalid username or password",
      })
}
const failToSignUp = (req, res) => {
  req.user
    ? res.status(200).json({
        message: "OK",
        description: "User logged in",
      })
    : res.status(401).json({
        message: "Unauthorized",
        description: "Fail",
      })
}

// Passport login
passport.use(
  "login",
  new LocalStrategy(async (username, password, done) => {
    const user = await userDAO.getUser(username)
    if (!user) return done(null, false, { message: "Intern Error" })
    if (user === null) {
      logger.warn(`User ${username} not found`)
      return done(null, false)
    }
    if (!isValidPassword(user, password)) {
      logger.warn(`User ${username} password not valid`)
      return done(null, false)
    }
    console.log({ user })
    logger.info(`User ${username} logged in`)
    return done(null, user)
  })
)
// Passport signup
passport.use(
  "signup",
  new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
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
        avatar: `${req.protocol}://${req.get("host")}/images/${
          req.file?.filename
        }`,
      }
      const { user, createdUser, created, message } = await userDAO.createUser(
        username,
        newUser
      )
      if (user === true) {
        logger.warn(`${message}: ${username}`)
        return done(null, false)
      }
      if (user === false) {
        logger.warn(`${message}: ${username}`)
        return done(null, false)
      }
      if (created !== true) return done(null, false)
      console.log(`${message}: ${createdUser}`)
      logger.info(`${username} signed up`)
      return done(null, createdUser)
    }
  )
)
const loginAuth = await passport.authenticate("login", {
  failureRedirect: "/loginfail",
})
const signupAuth = await passport.authenticate("signup", {
  failureRedirect: "/signupfail",
})
// Login
const login = (req, res) => {
  res.redirect("/cart")
}
// Signup
const signup = async (req, res) => {
  try {
    const info = await nodemailerTransporter.sendMail(
      mailOptionsNewUser(
        req.user.name,
        req.user.lastname,
        req.user.username,
        req.user.address,
        req.user.age,
        req.user.phone,
        `${req.protocol}://${req.get("host")}/images/${req.file?.filename}`
      )
    )
    if (!info) return res.status(500).json({ message: "Error sending email" })
    res.redirect("/cart")
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      description: error,
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
  signup,
}
