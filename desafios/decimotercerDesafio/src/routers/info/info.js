const infoRuter = require("express").Router();
const { PORT } = require("../../utils/port");

infoRuter.get("/info", (req, res) => {
    res.json({
        firstInfo: {
            inputArguments: process.argv,
            OS: process.platform,
            nodeVersion: process.version,
            totalReservedMemory: process.memoryUsage().heapTotal,
            runningPath: __dirname,
            PID: process.pid,
            projectFolder: process.cwd()
        },
        secondInfo: {
            PORT: PORT,
            PID: process.pid,
            Date: new Date().toLocaleString(),
            CPUs: require("os").cpus().length
        }
    });
});

module.exports = infoRuter;