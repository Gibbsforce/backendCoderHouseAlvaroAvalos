import FileContainer from "../../models/FileContainer.js"
class CartDAOFile extends FileContainer {
    constructor() {
        super("/cart.json")
    }
}
export default CartDAOFile