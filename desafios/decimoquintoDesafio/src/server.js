const express = require("express");
const app = express();
const { Server: HttpServer } = require("http");
const { Server: SocketServer } = require("socket.io");
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.redirect(`${req.protocol}://${req.hostname}/products`);
});
app.use(express.static("./public", { extensions: ["html"] }));
const { getMessages, saveMessage } = require("./controllers/messages");
io.on("connection", async socket => {
    console.log("nueva llamada al socket", socket.id);
    const getMessage = await getMessages();
    socket.emit("getMessages", getMessage);
    socket.on("addMessage", async message => {
        await saveMessage(message);
        const getMessage = await getMessages();
        io.sockets.emit("getMessages", getMessage);
    });
});
app.use("/api/products", require("./routers/product"));
app.use("/api/cart", require("./routers/cart"));
app.use("/api/products-test", require("./routers/productTest"));
module.exports = httpServer;