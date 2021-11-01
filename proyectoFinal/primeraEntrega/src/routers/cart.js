const cartRouter = require("express").Router();
const { createCart, deleteCart, getCartById, addToCart, deleteFromCart } = require("../controllers/cart");
cartRouter.post("/", async (req, res) => {
    try {
        const emptyCart = req.body;
        emptyCart.products = [];
        const cart = await createCart(emptyCart);
        res.status(201).json({ cart: cart });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
cartRouter.delete("/:id", async (req, res) => {
    try {
        const cart = await deleteCart(req.params.id);
        res.status(200).json({ deleted: cart });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
cartRouter.get("/:id/products", async (req, res) => {
    try {
        const cart = await getCartById(req.params.id);
        const products = cart.products;
        res.status(200).json({ products: products });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
cartRouter.post("/:id/products", async (req, res) => {
    try {
        const updated = await addToCart(req.params.id, req.body);
        if (!updated) return res.status(204).json({ error: "Item already added" });
        return res.status(201).json({ added: updated });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
cartRouter.delete("/:id/products/:productId", async (req, res) => {
    try {
        const updated = await deleteFromCart(req.params.id, req.params.productId);
        res.status(200).json({ deleted: updated });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
module.exports = cartRouter;