// socket para el chat
const socket = io.connect()
// Creando contenedor de mensajes
const renderMessages = messagesData => {
    if (messagesData === null) return ``
    let messagesContainer
    if (messagesData[0]._doc) {
        messagesContainer = messagesData.map(({ _doc }) => _doc).map(({ author, timestamp, message }) => {
            return (
                `
                    <div class="messages-body">
                        <strong class="msg-email"><p class="msg-txt">${author.id}</p></strong>
                        <!--<strong class="msg-email"><p class="msg-txt">${author.name}</p></strong>
                        <strong class="msg-email"><p class="msg-txt">${author.lastname}</p></strong>
                        <strong class="msg-email"><p class="msg-txt">${author.age}</p></strong>
                        <strong class="msg-email"><p class="msg-txt">${author.username}</p></strong>
                        <strong class="msg-email"><p class="msg-txt">${author.avatar}</p></strong>-->
                        <small class="msg-date"><p class="msg-txt">[${timestamp}]:</p></small>
                        <em class="msg-text"><p class="msg-txt">${message}</p></em>
                    </div>
                `
            );
        }).join("")
    } else {
        messagesContainer = messagesData.map(({ author, timestamp, message }) => {
            return (
                `
                    <div class="messages-body">
                        <strong class="msg-email"><p class="msg-txt">${author.id}</p></strong>
                        <!--<strong class="msg-email"><p class="msg-txt">${author.name}</p></strong>
                        <strong class="msg-email"><p class="msg-txt">${author.lastname}</p></strong>
                        <strong class="msg-email"><p class="msg-txt">${author.age}</p></strong>
                        <strong class="msg-email"><p class="msg-txt">${author.username}</p></strong>
                        <strong class="msg-email"><p class="msg-txt">${author.avatar}</p></strong>-->
                        <small class="msg-date"><p class="msg-txt">[${timestamp}]:</p></small>
                        <em class="msg-text"><p class="msg-txt">${message}</p></em>
                    </div>
                `
            );
        }).join("")
    }

    document.getElementById("messages-container").innerHTML = messagesContainer
}
// Agregando nuevo mensaje
const addMessage = async event => {
    event.preventDefault()
    const message = {
        author: {
            id: document.getElementById("messages-email").value,
            name: document.getElementById("messages-name").value,
            lastname: document.getElementById("messages-lastname").value,
            age: document.getElementById("messages-age").value,
            username: document.getElementById("messages-username").value,
            avatar: document.getElementById("messages-avatar").value
        },
        message: document.getElementById("messages-text").value
    }
    // document.getElementById("messages-email").value = ""
    // document.getElementById("messages-name").value = ""
    // document.getElementById("messages-lastname").value = ""
    // document.getElementById("messages-age").value = ""
    // document.getElementById("messages-username").value = ""
    // document.getElementById("messages-avatar").value = ""
    // document.getElementById("messages-text").value = ""
    socket.emit("addMessage", message)
}
// Desnormalizando los mensajes
const schemaAuthor = new normalizr.schema.Entity("author", {}, { idAttribute: "id" })
const schemaMessage = new normalizr.schema.Entity("message", {
    author: schemaAuthor
}, { idAttribute: "_id" })
const schemaMessages = new normalizr.schema.Entity("messages", {
    messages: [schemaMessage]
})
// Enviando el mensaje via socket
socket.on("getMessages", async data => {
    const { messages } = normalizr.denormalize(data.result, schemaMessages, data.entities);
    if (messages[0]._doc) {
        const normalizedLength = JSON.stringify(data).length;
        const denormalizedLength = JSON.stringify(messages).length;
        const percentage = ((denormalizedLength / normalizedLength) * 100).toFixed(2);denormalizedLength
        document.getElementById("percentage-nrmlzd-dnrmlzd").innerHTML = `(Comprension: ${percentage}%)`
        renderMessages(messages)
    } else {
        const normalizedLength = JSON.stringify(data).length;
        const denormalizedLength = JSON.stringify(messages).length;
        const percentage = ((normalizedLength / denormalizedLength) * 100).toFixed(2);
        document.getElementById("percentage-nrmlzd-dnrmlzd").innerHTML = `(Comprension: ${percentage}%)`
        renderMessages(messages)
    }
})
// Ejecutando el formulario para agregar nuevo mensaje
const formMessages = document.getElementById("form-messages")
formMessages.addEventListener("submit", addMessage)