const { Schema } = require("mongoose");
const MongoContainer = require("../../containers/MongoContainer");
class ProductDAOMongoDB extends MongoContainer {
    constructor() {
        super("products", new Schema({
            title: { type: String, required: true },
            description: { type: String, required: true },
            code: { type: String, required: true },
            thumbnail: { type: String, required: true },
            price: { type: Number, required: true },
            stock: { type: Number, required: true }
        }));
    }
}
module.exports = ProductDAOMongoDB;