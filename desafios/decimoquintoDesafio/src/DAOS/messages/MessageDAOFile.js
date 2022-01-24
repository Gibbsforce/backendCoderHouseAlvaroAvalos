const FileContainer = require("../../containers/FileContainer");
class MessageDAOFile extends FileContainer {
    constructor() {
        super("/messages.json");
    }
}
module.exports = MessageDAOFile;