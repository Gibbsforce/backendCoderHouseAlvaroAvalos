const productRouter = require("express").Router();
// DAOS
const { ProductDAO } = require("../DAOS");
const productDAO = new ProductDAO();
const { admin } = require("../middlewares/admin");
productRouter.get("/", async (req, res) => {
    try {
        const products = await productDAO.getAll();
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
productRouter.get("/:id", async (req, res) => {
    try {
        const product = await productDAO.getById(req.params.id);
        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
productRouter.post("/", admin, async (req, res) => {
    try {
        const dataId = await productDAO.save(req.body);
        res.status(201).json({ created: dataId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
productRouter.put("/:id", admin, async (req, res) => {
    try {
        const id = req.params.id;
        const update = req.body;
        const data = await productDAO.update(id, update);
        res.status(200).json({ updated: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
productRouter.delete("/:id", admin, async (req, res) => {
    try {
        const data = await productDAO.deleteById(req.params.id);
        res.status(200).json({ deleted: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
productRouter.delete("/", admin, async (req, res) => {
    try {
        const data = await productDAO.deleteAll();
        res.status(200).json({ deleted: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = productRouter;