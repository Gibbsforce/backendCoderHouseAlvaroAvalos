// Iniciando express
const express = require("express");
const app = express();
// http
const { Server: HttpServer } = require("http");
// Socket.io
const { Server: SocketServer } = require("socket.io");
// Instanciando http y socket io
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);
// Middleware json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Redirigiendo
app.get("/", (req, res) => {
    res.redirect("http://localhost:8080/add");
});
// Carpeta estatica y formateando extension html
app.use(express.static("./public", { extensions: ["html"] }));
// Socket para mensajes
const { getMessages, saveMessage } = require("./controllers/messages");
io.on("connection", async socket => {
    console.log("nueva llamada al socket", socket.id);
    // Obteniendo mensajes
    const getMessage = await getMessages();
    socket.emit("getMessages", getMessage);
    // Agregando mensajes
    socket.on("addMessage", async message => {
        await saveMessage(message);
        const getMessage = await getMessages();
        io.sockets.emit("getMessages", getMessage);
    });
});
// Router
app.use("/api/products", require("./routers/product"));
// Asignando puerto
const PORT = process.env.PORT || 8080;
// Escuchando al puerto socket
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Escuchando http con socket en el puerto: ${connectedServer.address().port}`);
})
// Manejo de errores
connectedServer.on("error", error => console.log("Error: ", error));