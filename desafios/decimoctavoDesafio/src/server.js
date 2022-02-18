import express from "express"
import cors from "cors"
import logger from "../logs/index.js"
// Server socket
import { Server as HttpServer } from "http"
import { Server as SocketServer } from "socket.io"
// Session - Auth
import session from "express-session"
import MongoStore from "connect-mongo"
import passport from "passport"
import options from "./config.js"
// Routers
import router from "./routers/index.js"
// Messages Controller
import { getMessages, saveMessage } from "./controllers/messages.js"
// Servers
const app = express()
const server = new HttpServer(app)
const io = new SocketServer(server)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./public", { extensions: ["html"] }))
// Setting the session
app.use(session({
    store: MongoStore.create({
        mongoUrl: options.mongodb.cnxStr
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 1000 * 60 * 30
    }
}))
app.use(passport.initialize())
app.use(passport.session())
// CORS
app.use(cors())
// To login
app.get("/", (req, res) => {
    res.redirect("/login")
})
io.on("connection", async socket => {
    logger.info(`Socket connected, new call: ${socket.id}`)
    const getMessage = await getMessages()
    socket.emit("getMessages", getMessage)
    socket.on("addMessage", async message => {
        await saveMessage(message)
        const getMessage = await getMessages()
        io.sockets.emit("getMessages", getMessage)
    })
})
// Using the routers
app.use("/api", router)
app.get("*", (req, res) => res.status(404).json({ message: "Not Found" }))
// Exporting the server
export default server