import express from "express"
// Controllers
import authController from "../../controllers/auth.js"
// Middlewares: Upload avatar
import upload from "../../middlewares/uploadAvatar.js"
// Defining router
const authRouter = express.Router()
// Routers
// Get login
authRouter.get("/login", authController.getLogin)
// Get logoout
authRouter.get("/logout", authController.getLogOut)
// Get fail to login
authRouter.get("/loginfail", authController.failToLogin)
// Get fail to sign up
authRouter.get("/signupfail", authController.failToSignUp)
// Post login
authRouter.post("/local/login", authController.loginAuth, authController.login)
// Post sign up
authRouter.post("/local/signup", upload.single("avatar"), authController.signupAuth, authController.signup)
// Exporting router
export default authRouter
