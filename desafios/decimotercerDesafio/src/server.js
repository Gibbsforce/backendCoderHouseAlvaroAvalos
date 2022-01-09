const express = require("express");
const cluster = require("cluster");

const app = express();
const numCPUs = require("os").cpus().length;
const isCluster = process.argv[2] === "CLUSTER";
const { PORT } = require("./utils/port");

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
        res.send(`Express server running on port ${PORT} - <b>PID ${process.pid}</b> - ${new Date().toLocaleString()}`);
    });
    app.use(require("./routers/info/info"));
    app.use(require("./routers/api/randoms"));
    app.listen(PORT, (error) => {
        if (!error) console.log(`Express server listening on port ${PORT} - PID Worker ${process.pid}`);
    });
    app.on("error", error => console.log("Error: ", error));
}