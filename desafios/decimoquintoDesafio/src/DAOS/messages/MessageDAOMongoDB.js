const { Schema } = require("mongoose");
const MongoContainer = require("../../containers/MongoContainer");
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
        }));
    }
}
module.exports = MessageDAOMongoDB;