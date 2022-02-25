import logger from "../../logs/index.js"
// Messages Controller
import { getMessages, saveMessage } from "../controllers/messages.js"
export const chat = (io) => {
    return async (socket) => {
        logger.info(`Socket connected, new call: ${socket.id}`)
        const getMessage = await getMessages()
        socket.emit("getMessages", getMessage)
        socket.on("addMessage", async message => {
            await saveMessage(message)
            const getMessage = await getMessages()
            io.sockets.emit("getMessages", getMessage)
        })
    }
}