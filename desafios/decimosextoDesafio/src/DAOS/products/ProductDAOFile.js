import FileContainer from "../../models/FileContainer.js"
class ProductDAOFile extends FileContainer {
    constructor() {
        super("/products.json")
    }
}
export default ProductDAOFile