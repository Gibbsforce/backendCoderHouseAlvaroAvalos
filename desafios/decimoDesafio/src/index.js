// Express app
const express = require("express");
const app = express();
// Express session
const session = require("express-session");
// Middleware json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Static folder and formatting html extension
app.use(express.static("public", { extensions: ["html"] }));
// Session setup
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 }
}));
// Auth and home routes
app.use(require("./routers/auth"));
app.use(require("./routers/home"));
// Port
const PORT = process.env.PORT || 8080;
// Serving the app
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
// Handling errors
app.on("error", error => console.log("Error: ", error));