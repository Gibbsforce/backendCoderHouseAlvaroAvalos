// Logs
import logger from "../../logs/index.js"
// DAOS
import persistence from "./index.js"
import { normalizeMessages } from "../utils/normalize.js"
// Controllers
const messageDAO = persistence.messageDAO
export const getMessages = async () => {
    try {
        const getMessages = await messageDAO.getAll()
        return normalizeMessages({ id: "messages", messages: getMessages })
    } catch (error) {
        logger.error(`Error at getting messages: ${error}`)
    }
}
export const saveMessage = async message => {
    try {
        const saveMessage = await messageDAO.save(message)
        return saveMessage
    } catch (error) {
        logger.error(`Error at saving message: ${error}`)
    }
}