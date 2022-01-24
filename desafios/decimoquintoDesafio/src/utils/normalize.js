const { normalize, schema } = require("normalizr");
const author = new schema.Entity("author", {}, { idAttribute: "id" });
const message = new schema.Entity("message", {
    author: author
}, { idAttribute: "_id" });
const messages = new schema.Entity("messages", {
    messages: [message]
});
const normalizeMessages = (msg) => normalize(msg, messages);
module.exports = {
    normalizeMessages
}