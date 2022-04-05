import mongoose from "mongoose"
const Schema = mongoose.Schema
import MongoContainer from "../../models/MongoContainer.js"
class OrderDAOMongoDB extends MongoContainer {
  constructor() {
    super(
      "orders",
      new Schema({
        cartId: { type: String, required: true },
        items: { type: Array, required: true },
        date: { type: Date, default: Date.now },
        status: { type: String, required: true },
        userId: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      })
    )
  }
}
export default OrderDAOMongoDB
