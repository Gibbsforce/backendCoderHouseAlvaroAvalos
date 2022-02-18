import dotenv from "./env.js"
import { IS_CLUSTER, nCPUs, PORT } from "./utils/globalConstants.js"
import logger from "../logs/index.js"
import server from "./server.js"
import cluster from "cluster"
if (cluster.isPrimary && IS_CLUSTER) {
    for (let i = 0; i < nCPUs; i++) {
        cluster.fork();
    }
    cluster.on("exit", (worker) => {
        logger.warn(`Worker ${worker.process.pid} died ${new Date().toLocaleString()}`)
        cluster.fork()
    })
} else {
    const connectedServer = server.listen(PORT, () => {
        logger.info(`Listenning to http socket server with express: http://localhost:${PORT} on port: ${connectedServer.address().port}`)
    })
    connectedServer.on("error", error => logger.error(error))
}