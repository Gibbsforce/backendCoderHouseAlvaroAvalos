// Session
import MongoStore from "connect-mongo"
import options from "../config.js"
// Session settings
export const sessionSettings = {
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
}