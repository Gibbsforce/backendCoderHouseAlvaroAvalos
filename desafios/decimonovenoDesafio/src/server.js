// Server App: Express, cors, http socket server, session - passport, api global router, swagger docs and middlewares (session settings and chat)
import express from "express"
import cors from "cors"
import { Server as HttpServer } from "http"
import { Server as SocketServer } from "socket.io"
import session from "express-session"
import passport from "passport"
import router from "./routers/index.js"
import swaggerUi from "swagger-ui-express"
import { readFile } from "fs/promises"
import { sessionSettings } from "./middlewares/sessionSettings.js"
import { chat } from "./middlewares/chat.js"
// Server config: socket http server in express app and swagger documentation
const app = express()
const server = new HttpServer(app)
const io = new SocketServer(server)
const jsonSpec = JSON.parse(await readFile(new URL("../docs/doc.json", import.meta.url)))
// Middlewares: json, public static, session - passport, cors
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./public", { extensions: ["html"] }))
app.use(session({ ...sessionSettings }))
app.use(passport.initialize())
app.use(passport.session())
app.use(cors())
// Routes: redirect to login, chat, docs, api and 404
app.get("/", (req, res) => res.redirect("/login"))
io.on("connection", chat(io))
app.use("/docs", swaggerUi.serve, swaggerUi.setup(jsonSpec))
app.use("/api", router)
app.get("*", (req, res) => res.status(404).json({ message: "Not Found" }))
// Exporting the server app
export default server