// Iniciando express
const express = require("express");
const app = express();
const PORT = 8080;
// Accediendo al contenedor de productos
const Contenedor = require("../desafioRefactored/Contenedor");
const contenedor = new Contenedor("products.json");
// Pagina de inicio
app.get("/", (req, res) => {
    res.send("<h2>Desafio 3</h2>");
});
// Mostrando todos los productos
app.get("/productos", async (req, res) => {
    const productos = await contenedor.getAll();
    res.send(productos);
});
// Mostrando productos al azar
app.get("/productoRandom", async (req, res) => {
    const productos = await contenedor.getAll();
    const idRandom = Math.round(Math.random()*(productos.length -1) + 1);
    const getProducto = await contenedor.getById(idRandom);
    res.send(getProducto);
});
// Sirviendo al puerto
app.listen(PORT, () => {
    console.log(`Sirviendo en el puerto: ${PORT}`);
});
// Manejo de errores
app.on("error", error => console.log("Error: ", error));
