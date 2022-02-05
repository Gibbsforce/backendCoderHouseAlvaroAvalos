// Logs
import logger from "../../../logs/index.js"
// Import config
import options from "../../config.js"
// Import mongoose
import mongoose from "mongoose"
// Import Schema and model from mongoose
const Schema = mongoose.Schema
const model = mongoose.model
// Create a new schema for the user
const UserSchema = new Schema({
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
})
// Model
const UserDAOMongoDB = model("users", UserSchema)
// Connect to mongoose
mongoose.connect(options.mongodb.cnxStr, options.mongodb.options, (error) => {
    if (error) {
        logger.error(`Error conneting to the DB: ${error}`)
        return
    }
})
// Export the model
export default UserDAOMongoDB