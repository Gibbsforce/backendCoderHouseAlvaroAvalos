import express from "express"
// Controllers
import authController from "../../controllers/auth.js"
// Middlewares: Upload avatar
import upload from "../../middlewares/uploadAvatar.js"
// Defining router
const authRouter = express.Router()
// Routers
authRouter.get("/login", authController.getLogin)
authRouter.get("/logout", authController.getLogOut)
authRouter.get("/loginfail", authController.failToLogin)
authRouter.get("/signupfail", authController.failToSignUp)
authRouter.post("/local/login", authController.loginAuth, authController.login)
authRouter.post(
  "/local/signup",
  upload.single("avatar"),
  authController.signupAuth,
  authController.signup
)
export default authRouter
