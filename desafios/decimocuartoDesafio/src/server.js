const express = require("express");
const cluster = require("cluster");
const compression = require("compression");
const logger = require("../logs");

const app = express();
app.use(compression());

const isCluster = process.argv[2] === "CLUSTER";
const { PORT, numCPUs } = require("./utils/helpers");

if (cluster.isMaster && isCluster) {
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on("exit", (worker) => {
        console.log(`Worker ${worker.process.pid} died ${new Date().toLocaleString()}`);
        cluster.fork();
    });
} else {
    app.get("/", (req, res) => {
        logger.info(`Request method: ${req.method} - Request route: ${req.originalUrl}`);
        res.send(`Express server running on port ${PORT} - <b>PID ${process.pid}</b> - ${new Date().toLocaleString()}`);
    });
    app.use(require("./routers/info/info"));
    // app.use(require("./routers/api/randoms"));
    app.get("*", (req, res) => {
        res.status(404).send("404 - Not Found");
        logger.warn(`The ${req.method} request to ${req.path} was not found`);
    });
    app.listen(PORT, (error) => {
        if (!error) console.log(`Express server listening on port ${PORT} - PID Worker ${process.pid}`);
    });
    app.on("error", error => console.log("Error: ", error));
}