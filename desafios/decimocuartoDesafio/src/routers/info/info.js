const infoRuter = require("express").Router();
const { PORT, numCPUs } = require("../../utils/helpers");
const logger = require("../../../logs");

infoRuter.get("/info", (req, res) => {
    console.log("Info Route for Perfomance Analysis");
    res.status(200).json({
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
            CPUs: numCPUs
        }
    });
    logger.info(`Request method: ${req.method} - Request route: ${req.originalUrl}`);
    if (res.statusCode === 500) {
        logger.error(`Error! Time at: ${new Date().toLocaleString()}`);
    }
});

module.exports = infoRuter;