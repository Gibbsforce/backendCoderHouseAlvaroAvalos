// DAOS
const { MessageDAO } = require("../DAOS");
const messageDAO = new MessageDAO();
const { normalizeMessages } = require("../utils/normalize");
const getMessages = async () => {
    try {
        const getMessages = await messageDAO.getAll();
        return normalizeMessages({ id: "messages", messages: getMessages });
    } catch (error) {
        console.log(error);
    }
}
const saveMessage = async message => {
    try {
        const saveMessage = await messageDAO.save(message);
        return saveMessage;
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getMessages,
    saveMessage
}