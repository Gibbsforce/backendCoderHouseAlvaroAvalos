// DAOS
const { MessageDAO } = require("../DAOS");
const messageDAO = new MessageDAO();
// Normalizando los mensajes
const { normalizeMessages } = require("../utils/normalize");
// Obtiene todos los mensajes
const getMessages = async () => {
    try {
        const getMessages = await messageDAO.getAll();
        return normalizeMessages({ id: "messages", messages: getMessages });
    } catch (error) {
        console.log(error);
    }
}
// Guarda los mensajes
const saveMessage = async message => {
    try {
        const saveMessage = await messageDAO.save(message);
        return saveMessage;
    } catch (error) {
        console.log(error);
    }
}
// Exportando
module.exports = {
    getMessages,
    saveMessage
}