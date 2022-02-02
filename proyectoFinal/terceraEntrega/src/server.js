import express from "express"
// CORS
import cors from "cors"
// logs
import logger from "../logs/index.js"
// const { Server: HttpServer } = require("http");
import { Server as HttpServer } from "http"
// const { Server: SocketServer } = require("socket.io");
import { Server as SocketServer } from "socket.io"
// Express session
import session from "express-session"
// Mongostore
import MongoStore from "connect-mongo"
// Passport
import passport from "passport"
// Config
import options from "./config.js"
// Routers
import productRouter from "./routers/product/product.js"
import cartRouter from "./routers/cart/cart.js"
import productRouterTest from "./routers/product/productTest.js"
import authRouter from "./routers/auth/auth.js"
import homeRouter from "./routers/home/home.js"
// Servers
const app = express()
const server = new HttpServer(app)
const io = new SocketServer(server)
// Middleware json
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Static folder and formating the html extension
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
        maxAge: 1000 * 60 * 30 // 30 minutes
    }
}))
// Initializing the passport and the session
app.use(passport.initialize());
app.use(passport.session());
// CORS
app.use(cors())
// Home
app.get("/", (req, res) => {
    res.redirect("/login")
})
import { getMessages, saveMessage } from "./controllers/messages.js"
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
app.use("/api/products", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/products-test", productRouterTest)
app.use("/api/auth", authRouter)
app.use("/api/home", homeRouter)
// Exporting the server
export default server