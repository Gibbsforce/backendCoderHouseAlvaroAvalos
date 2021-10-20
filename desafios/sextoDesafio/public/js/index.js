// Socket del lado del cliente
const socket = io.connect();
// Creando tabla de productos
const renderProducts = tableData => {
    // Validando productos vacios
    if (tableData === null) return document.getElementById("rows").innerHTML = `<p>No hay productos</p>`;
    // Encabezado de la tabla
    const tableHead =
        `
            <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Foto</th>
            </tr>
        `;
    // Filas con los datos
    const tableRows = tableData.map(element => {
        return(
            `
                <tr>
                    <td>${element.title}</td>
                    <td>$ ${element.price}</td>
                    <td><img class="url-img" src="${element.thumbnail}"/></td>
                </tr>
            `
        );
    }).join("");
    // Concatenando cuerpo html
    const table = `${tableHead}${tableRows}`;
    // Agregando html
    document.getElementById("rows").innerHTML = table;
   
}
// Agregando nuevo productos
const addProducts = event => {
    event.preventDefault();
    const product = {
        title: document.getElementById("products-title").value,
        price: document.getElementById("products-price").value,
        thumbnail: document.getElementById("products-thumbnail").value
    }
    document.getElementById("products-title").value = "";
    document.getElementById("products-price").value = "";
    document.getElementById("products-thumbnail").value = "";
    socket.emit("addProducts", product);
}
// Ejecutando el formulario para agregar nuevo producto
const formProducts = document.getElementById("form-products");
formProducts.addEventListener("submit", addProducts);
// Agregando productos via sockets
socket.on("getProducts", data => {
    // console.log(data);
    renderProducts(data);
});
// Creando contenedor de mensajes
const renderMessages = messagesData => {
    if (messagesData === null) return ``;
    const messagesContainer = messagesData.map(element => {
        return(
            `
                <div class="messages-body">
                    <strong class="msg-email"><p class="msg-txt">${element.email}</p></strong>
                    <small class="msg-date"><p class="msg-txt">[${element.date}]:</p></small>
                    <em class="msg-text"><p class="msg-txt">${element.text}</p></em>
                </div>
            `
        );
    }).join("");
    document.getElementById("messages-container").innerHTML = messagesContainer;
}
// Agregando nuevo mensaje
const addMessage = event => {
    event.preventDefault();
    const date = new Date();
    const message = {
        email: document.getElementById("messages-email").value,
        text: document.getElementById("messages-text").value,
        date: `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }
    document.getElementById("messages-email").value = "";
    document.getElementById("messages-text").value = "";
    socket.emit("addMessage", message);
}
// Ejecutando el formulario para agregar nuevo mensaje
const formMessages = document.getElementById("form-messages");
formMessages.addEventListener("submit", addMessage);
// Enviando el mensaje via socket
socket.on("getMessages", data => {
    // console.log(data);
    renderMessages(data);
});