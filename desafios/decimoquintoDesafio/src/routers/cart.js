const cartRouter = require("express").Router();
// DAOS
const { CartDAO } = require("../DAOS");
const cartDAO = new CartDAO();
cartRouter.post("/", async (req, res) => {
    try {
        const emptyCart = req.body;
        emptyCart.products = [];
        const cart = await cartDAO.save(emptyCart);
        res.status(201).json({ cart: cart });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
cartRouter.delete("/:id", async (req, res) => {
    try {
        const cart = await cartDAO.deleteById(req.params.id);
        res.status(200).json({ deleted: cart });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
cartRouter.get("/", async (req, res) => {
    try {
        const cart = await cartDAO.getAll();
        res.status(200).json({ cart: cart });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})
cartRouter.get("/:id/products", async (req, res) => {
    try {
        const cart = await cartDAO.getById(req.params.id);
        const products = cart.products;
        res.status(200).json({ products: products });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
cartRouter.post("/:id/products", async (req, res) => {
    try {
        const updated = await cartDAO.addToCart(req.params.id, req.body);
        if (!updated) return res.status(204).json({ error: "Item already added" });
        return res.status(201).json({ added: updated });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
cartRouter.delete("/:id/products/:productId", async (req, res) => {
    try {
        const updated = await cartDAO.deleteFromCart(req.params.id, req.params.productId);
        res.status(200).json({ deleted: updated });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
module.exports = cartRouter;