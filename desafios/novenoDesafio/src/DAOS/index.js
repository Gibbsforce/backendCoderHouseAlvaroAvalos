// Requiring DAOS messages
const MessageDAOFile = require("./messages/MessageDAOFile");

const DAOS = {}

// Messages
if (process.env.STORAGE === "file") DAOS["MessageDAO"] = MessageDAOFile;

module.exports = DAOS;