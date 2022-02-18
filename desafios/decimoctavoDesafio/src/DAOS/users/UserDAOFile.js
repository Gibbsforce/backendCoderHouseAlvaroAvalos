import FileContainer from "../../models/FileContainer.js"
class UserDAOFile extends FileContainer {
    constructor() {
        super("/users.json")
    }
}
export default UserDAOFile