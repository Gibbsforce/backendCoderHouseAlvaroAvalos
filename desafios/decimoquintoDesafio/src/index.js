const dotenv = require("./env");
const httpServer = require("./server");
const PORT = process.env.PORT || 8080;
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Listenning to http socket on port: ${connectedServer.address().port}`);
})
connectedServer.on("error", error => console.log("Error: ", error));