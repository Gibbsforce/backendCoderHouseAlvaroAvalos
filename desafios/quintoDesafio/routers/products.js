// Iniciando express
const express = require("express");
// Iniciando el router
const productsRouter = express.Router();
// Accediendo al contenedor de productos
const Contenedor = require("../config/Contenedor");
const productsContent = new Contenedor("./data/products.json");
// Mostrando todos los productos y renderizando
productsRouter.get("/list-products", async (req, res) => {
    const products = await productsContent.getAll();
    let emptyFile = false;
    products === null ? emptyFile = true : emptyFile = false;
    res.render("pages/list-products", {
        products,
        emptyFile
    });
});
// Agregando nuevo producto y redirigiendo a la lista de products
productsRouter.post("/products", async (req, res) => {
    const newProduct = req.body;
    await productsContent.save(newProduct);
    res.redirect("/list-products");
});
// Exportando el router
module.exports = productsRouter;