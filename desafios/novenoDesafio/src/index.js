// Requiriendo el server
const httpServer = require("./server");
// Asignando puerto
const PORT = process.env.PORT || 8080;
// Escuchando al puerto socket
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Escuchando http con socket en el puerto: ${connectedServer.address().port}`);
})
// Manejo de errores
connectedServer.on("error", error => console.log("Error: ", error));