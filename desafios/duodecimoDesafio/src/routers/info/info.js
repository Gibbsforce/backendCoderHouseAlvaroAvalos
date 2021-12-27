const infoRuter = require("express").Router();

infoRuter.get("/info", (req, res) => {
    res.json({
        inputArguments: process.argv,
        OS: process.platform,
        nodeVersion: process.version,
        totalReservedMemory: process.memoryUsage().heapTotal,
        runningPath: __dirname,
        PID: process.pid,
        projectFolder: process.cwd()
    });
});

module.exports = infoRuter;