// Requiriendo normalizador y el esquema
const { normalize, schema } = require("normalizr");
// Schema del autor
const author = new schema.Entity("author", {}, { idAttribute: "id" });
// Schema del mensaje
const message = new schema.Entity("message", {
    author: author
}, { idAttribute: "_id" });
// Schema para el array
const messages = new schema.Entity("messages", {
    messages: [message]
});
// Definiendo el normalizador
const normalizeMessages = (msg) => normalize(msg, messages);
// Exportando el normalizador
module.exports = {
    normalizeMessages
}