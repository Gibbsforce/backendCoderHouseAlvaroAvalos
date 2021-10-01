// Iniciando express
const express = require("express");
// Iniciendo el router
const productsRouter = express.Router();
// Accediendo al contenedor de productos
const Contenedor = require("../components/Contenedor");
const productsContent = new Contenedor("./data/products.json");
// Mostrando todos los productos
productsRouter.get("/", async (req, res) => {
    const products = await productsContent.getAll();
    res.send(products);
});
// Mostrando producto por id
productsRouter.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const product = await productsContent.getById(id);
    if (product === null) return res.send({ error: "cannot find product" });
    res.send(product);
});
// Agregando nuevo producto
productsRouter.post("/", async (req, res) => {
    const newProduct = req.body;
    await productsContent.save(newProduct);
    res.send(
        {
            message: "product added"
        }
    );
});
// Actualizando producto por id
productsRouter.put("/:id", async (req, res) => {
    const updateProduct = req.body;
    const id = Number(req.params.id);
    updateProduct.id = id;
    const updating = await productsContent.update(id, updateProduct);
    if (updating === null) return res.send({ error: "cannot find product" });
    res.send(
        {
            message: "product updated"
        }
    );
});
// Eliminando producto por id
productsRouter.delete("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const deleting = await productsContent.deleteById(id);
    if (deleting === null) return res.send({ error: "cannot find product" });
    res.send(
        {
            message: "product deleted"
        }
    );
});
// Exportando el router
module.exports = productsRouter;