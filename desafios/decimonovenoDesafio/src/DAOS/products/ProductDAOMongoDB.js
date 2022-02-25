import mongoose from "mongoose"
const Schema = mongoose.Schema
import MongoContainer from "../../models/MongoContainer.js"
class ProductDAOMongoDB extends MongoContainer {
    constructor() {
        super("products", new Schema({
            title: { type: String, required: true },
            description: { type: String, required: true },
            code: { type: String, required: true },
            timestamp: { type: Date, default: Date.now },
            thumbnail: { type: String, required: true },
            price: { type: Number, required: true },
            stock: { type: Number, required: true }
        }))
    }
}
export default ProductDAOMongoDB