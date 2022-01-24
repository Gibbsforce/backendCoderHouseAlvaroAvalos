const FirestoreContainer = require("../../containers/FirestoreContainer");
class ProductDAOFirestore extends FirestoreContainer {
    constructor() {
        super("products");
    }
}
module.exports = ProductDAOFirestore;