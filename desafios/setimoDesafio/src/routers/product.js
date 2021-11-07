// Requiriendo el router de express
const productRouter = require("express").Router();
// Exportando el middleware de autenticacion/adminisrador como admin
const { admin } = require("../middlewares/admin");
// Exportando los controladores de los productos
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct, deleteProducts } = require("../controllers/product");
// Router para obtener todos los productos
productRouter.get("/", async (req, res) => {
    try {
        const products = await getProducts();
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Router para obtener un producto
productRouter.get("/:id", async (req, res) => {
    try {
        const product = await getProduct(req.params.id);
        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Router para crear un producto y agregando el middleware de admin
productRouter.post("/", admin, async (req, res) => {
    try {
        const dataId = await createProduct(req.body);
        res.status(201).json({ created: dataId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Router para actualizar un producto y agregando el middleware de admin
productRouter.put("/:id", admin, async (req, res) => {
    try {
        const id = Number(req.params.id);
        const update = req.body;
        const data = await updateProduct(id, update);
        res.status(200).json({ updated: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Router para eliminar un producto y agregando el middleware de admin
productRouter.delete("/:id", admin, async (req, res) => {
    try {
        const data = await deleteProduct(req.params.id);
        res.status(200).json({ deleted: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Router para eliminar todos los productos y agregando el middleware de admin
productRouter.delete("/", admin, async (req, res) => {
    try {
        const data = await deleteProducts();
        res.status(200).json({ deleted: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Exportando el router como productRouter
module.exports = productRouter;