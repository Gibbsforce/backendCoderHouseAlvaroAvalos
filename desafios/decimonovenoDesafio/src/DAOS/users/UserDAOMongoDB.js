import mongoose from "mongoose"
const Schema = mongoose.Schema
import MongoContainer from "../../models/MongoContainer.js"
class UserDAOMongoDB extends MongoContainer {
    constructor() {
        super("users", new Schema({
            name: { type: String, required: true },
            lastname: { type: String, required: true },
            username: { type: String, required: true },
            password: { type: String, required: true },
            address: { type: String, required: true },
            age: { type: Number, required: true },
            phone: { type: Number, required: true },
            avatar: { type: String, required: true },
            createdAt: { type: Date, default: new Date() },
            updatedAt: { type: Date, default: new Date() }
        }))
    }
}
export default UserDAOMongoDB