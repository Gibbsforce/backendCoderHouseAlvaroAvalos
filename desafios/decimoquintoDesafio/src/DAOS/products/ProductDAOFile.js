const FileContainer = require("../../containers/FileContainer");
class ProductDAOFile extends FileContainer {
    constructor() {
        super("/products.json");
    }
}
module.exports = ProductDAOFile;