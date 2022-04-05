// Session
import MongoStore from "connect-mongo"
import options from "../config.js"
// Session settings
export const sessionSettings = {
  store:
    process.env.STORAGE === "file" || process.env.STORAGE === "memory"
      ? undefined
      : MongoStore.create({
          mongoUrl: options.mongodb.cnxStr,
        }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 1000 * 60 * process.env.MAX_AGE_MIN,
  },
}
