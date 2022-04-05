import FileContainer from "../../models/FileContainer.js"
class MessageDAOFile extends FileContainer {
  constructor() {
    super("/messages.json")
  }
}
export default MessageDAOFile
