const FirestoreContainer = require("../../containers/FirestoreContainer");
class CartDAOFirestore extends FirestoreContainer {
    constructor() {
        super("carts");
    }
}
module.exports = CartDAOFirestore;