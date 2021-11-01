const productRouter = require("express").Router();
const { admin } = require("../middlewares/admin");
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require("../controllers/product");
productRouter.get("/", async (req, res) => {
    try {
        const products = await getProducts();
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
productRouter.get("/:id", async (req, res) => {
    try {
        const product = await getProduct(req.params.id);
        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
productRouter.post("/", admin, async (req, res) => {
    try {
        const dataId = await createProduct(req.body);
        res.status(201).json({ created: dataId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
productRouter.put("/:id", admin, async (req, res) => {
    try {
        const id = Number(req.params.id);
        const update = req.body;
        update.id = id;
        const data = await updateProduct(id, update);
        res.status(200).json({ updated: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
productRouter.delete("/:id", admin, async (req, res) => {
    try {
        const data = await deleteProduct(req.params.id);
        res.status(200).json({ deleted: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = productRouter;