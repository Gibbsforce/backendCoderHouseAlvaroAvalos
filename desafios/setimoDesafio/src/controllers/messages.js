// Exportando el contenedor de items
const Contenedor = require("../../config/Contenedor");
// Asignando un motor de base de datos
const { optionSQLite } = require("../../options/databases");
// Creando la table si no existe
const { createMessagesTable } = require("../../scripts/createTables");
createMessagesTable();
// Instanciando el motor de base de datos y la tabla mensajes creada al contenedor
const messageContainer = new Contenedor(optionSQLite, "messages");
// Obtiene todos los mensajes
const getMessages = async () => {
    try {
        const getMessages = await messageContainer.getAll();
        return getMessages;
    } catch (error) {
        console.log(error);
    }
}
// Guarda los mensajes
const saveMessage = async message => {
    try {
        const saveMessage = await messageContainer.save(message);
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