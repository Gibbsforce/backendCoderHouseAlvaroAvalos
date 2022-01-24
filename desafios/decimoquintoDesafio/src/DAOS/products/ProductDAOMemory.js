const { ProductsContainer } = require("../../containers/MemoryContainer");
class ProductDAOMemory extends ProductsContainer {
    constructor() {
        super();
    }
}
module.exports = ProductDAOMemory;