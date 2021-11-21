const FileContainer = require("../../containers/FileContainer");
class CartDAOFile extends FileContainer {
    constructor() {
        super("/cart.json");
    }
}
module.exports = CartDAOFile;