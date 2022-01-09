const randomsRouter = require("express").Router();
const { fork } = require("child_process");

const DEFAULT_QTY = 100000000;

randomsRouter.get("/api/randoms", (req, res) => {
    const { cant = DEFAULT_QTY } = req.query;
    const compute = fork("./src/utils/randoms.js");
    compute.on("message", msg => {
        if (msg === "ready") {
            compute.send(cant);
        } else {
            res.send(msg);
        }
    });
});

module.exports = randomsRouter;