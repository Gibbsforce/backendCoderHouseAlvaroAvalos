// socket para el chat
const socket = io.connect();
if (socket !== null) {
    
}
// Creando contenedor de mensajes
const renderMessages = messagesData => {
    if (messagesData === null) return ``;
    const messagesContainer = messagesData.map(({ email, date, message }) => {
        return(
            `
                <div class="messages-body">
                    <strong class="msg-email"><p class="msg-txt">${email}</p></strong>
                    <small class="msg-date"><p class="msg-txt">[${date}]:</p></small>
                    <em class="msg-text"><p class="msg-txt">${message}</p></em>
                </div>
            `
        );
    }).join("");
    document.getElementById("messages-container").innerHTML = messagesContainer;
}
// Agregando nuevo mensaje
const addMessage = async event => {
    event.preventDefault();
    const date = new Date();
    const message = {
        email: document.getElementById("messages-email").value,
        message: document.getElementById("messages-text").value,
        date: `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }
    document.getElementById("messages-email").value = "";
    document.getElementById("messages-text").value = "";
    // console.log(message);
    socket.emit("addMessage", message);
}

// Enviando el mensaje via socket
socket.on("getMessages", async data => {
    // console.log(data);
    renderMessages(data);
});
// Ejecutando el formulario para agregar nuevo mensaje
const formMessages = document.getElementById("form-messages");
formMessages.addEventListener("submit", addMessage);