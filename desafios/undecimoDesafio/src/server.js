// Env variables
require("dotenv").config();
// Initializing the server express
const express = require("express");
const app = express();
// Express session
const session = require("express-session");
// Mongostore
const MongoStore = require("connect-mongo");
// Passport
const passport = require("passport");
// Config
const config = require("./config");
// Mongoose
const mongoose = require("mongoose");
// Middleware json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Static folder and formating the html extension
app.use(express.static("./public", { extensions: ["html"] }));
// Setting the session
app.use(session({
    store: MongoStore.create({
        mongoUrl: config.mongoLocal.cnxStr
    }),
    secret: "shhhhhhh",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 1000 * 60 * 10
    }
}));
// Initializing the passport and the session
app.use(passport.initialize());
app.use(passport.session());
// Routers
app.use(require("./routers/auth/auth"));
app.use(require("./routers/auth/home"));
// PORT
const PORT = 8080 || process.env.PORT;
// Initializing the server
mongoose.connect(config.mongoLocal.cnxStr, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
    // Error
    if (error) {
        console.log("Error: ", error);
    }
    // Listen to port
    app.listen(PORT, () => {
        console.log(`Listening server in PORT: ${PORT}`);
    });
    // Handling errors
    app.on("error", error => console.log("Error: ", error));
});