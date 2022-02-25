import mongoose from "mongoose"
const Schema = mongoose.Schema
import MongoContainer from "../../models/MongoContainer.js"
class CartDAOMongoDB extends MongoContainer {
    constructor() {
        super("carts", new Schema({
            products: { type: Array, required: true },
            complete: { type: Boolean, required: true }
        }))
    }
}
export default CartDAOMongoDB