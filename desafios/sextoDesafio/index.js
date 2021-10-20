// Iniciando express
const express = require("express");
const app = express();
// http
const { Server: HttpServer } = require("http");
// Socket.io
const { Server: SocketServer } = require("socket.io");
// Requerir router
const productsRouter = require("./routers/products");
// Asignando puerto
const PORT = 8080;
// Instanciando http y socket io
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);
// Middleware json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Formateando motor de plantilla ejs
app.set("view engine", "ejs");
// Inicio y redirigiendo a formulario
app.get("/", (req, res) => {
    res.redirect("/form");
});
// Carpeta estatica public
app.use(express.static("public"));
// Exportando contenedor de productos
const Contenedor = require("./config/Contenedor");
const contenedor = new Contenedor("./data/products.json");
// Exportando mensajes
const Mensajes = require("./config/Mensajes");
const mensajes = new Mensajes("./data/messages.json");
// Llamando via socket
io.on("connection", async socket => {
    console.log("nueva llamada al socket", socket.id);
    // Obteniendo productos
    const getProducts = await contenedor.getAll();
    socket.emit("getProducts", getProducts);
    // Agregando productos
    socket.on("addProducts", async product => {
        await contenedor.save(product);
        io.sockets.emit("getProducts", getProducts);
    });
    // Obteniendo mensajes
    const getMessages = await mensajes.getMessages();
    socket.emit("getMessages", getMessages);
    // Agregando mensajes
    socket.on("addMessage", async message => {
        await mensajes.saveMessage(message);
        io.sockets.emit("getMessages", getMessages);
    });
});
// Accediendo al router
app.use("/", productsRouter);
// Sirviendo al puerto socket
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Sirviendo http con socket en el puerto: ${connectedServer.address().port}`);
})
// Manejo de errores
connectedServer.on("error", error => console.log("Error: ", error));