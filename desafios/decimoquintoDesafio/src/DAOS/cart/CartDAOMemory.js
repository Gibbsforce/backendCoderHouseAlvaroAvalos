const { CartContainer } = require("../../containers/MemoryContainer");
class CartDAOMemory extends CartContainer {
    constructor() {
        super();
    }
}
module.exports = CartDAOMemory;