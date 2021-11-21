const { Schema } = require("mongoose");
const MongoContainer = require("../../containers/MongoContainer");
class CartDAOMongoDB extends MongoContainer {
    constructor() {
        super("carts", new Schema({
            products: { type: Array, required: true }

        }));
    }
}
module.exports = CartDAOMongoDB;