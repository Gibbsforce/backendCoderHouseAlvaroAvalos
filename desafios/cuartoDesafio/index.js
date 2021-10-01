// Iniciando express
const express = require("express");
const app = express();
// Requerir router
const productsRouter = require("./routers/products");
// Asignando puerto
const PORT = 8080;
// Middleware json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Carpeta estatica
app.use(express.static("public"));
// Inicio
app.get("/", (req, res) => {
    res.send("<h2>Desafio 4</h2>");
});
// Accediendo al router
app.use("/api/products", productsRouter);
// Sirviendo al puerto
app.listen(PORT, () => console.log(`Sirviendo puerto: ${PORT}`));
// Manejo de errores
app.on("error", error => console.log("Error: ", error));
