const express = require("express");

const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
    res.send(`Express server <span style="color:blueviolet;">(Nginx)</span> in port ${PORT} - <b>PID ${process.pid}</b> - ${new Date().toLocaleString()}`);
});

app.listen(PORT, (error) => {
    if (!error) console.log(`Express server listening on port ${PORT} - PID Worker ${process.pid}`);
});

app.on("error", error => console.log("Error: ", error));