import express from "express"
import { localAuth } from "../../middlewares/auth.js"
const homeRouter = express.Router()
// Redirect to home
homeRouter.get("/", (req, res) => {
    res.status(302).redirect("/tohome")
})
// Getting user data when ok
homeRouter.get("/tohome", localAuth, (req, res) => {
    res.status(200).json({
        message: "OK",
        userData: {
            username: req.user.username
        }
    })
})
export default homeRouter