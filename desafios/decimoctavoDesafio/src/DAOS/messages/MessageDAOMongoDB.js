import mongoose from "mongoose"
const Schema = mongoose.Schema
import MongoContainer from "../../models/MongoContainer.js"
class MessageDAOMongoDB extends MongoContainer {
    constructor() {
        super("messages", new Schema({
            author: {
                id: { type: String, required: true },
                name: { type: String, required: true },
                lastname: { type: String, required: true },
                age: { type: Number, required: true },
                username: { type: String, required: true },
                avatar: { type: String, required: true }
            },
            message: { type: String, required: true },
            timestamp: { type: Date, default: Date.now }
        }))
    }
}
export default MessageDAOMongoDB