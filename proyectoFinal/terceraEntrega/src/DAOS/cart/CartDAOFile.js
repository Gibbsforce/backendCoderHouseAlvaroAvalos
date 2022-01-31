import FileContainer from "../../containers/FileContainer.js"
class CartDAOFile extends FileContainer {
    constructor() {
        super("/cart.json")
    }
}
export default CartDAOFile