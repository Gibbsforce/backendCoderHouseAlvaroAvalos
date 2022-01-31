import FileContainer from "../../containers/FileContainer.js"
class MessageDAOFile extends FileContainer {
    constructor() {
        super("/messages.json")
    }
}
export default MessageDAOFile