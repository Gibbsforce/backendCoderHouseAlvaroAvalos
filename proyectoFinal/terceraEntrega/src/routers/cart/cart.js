import express from "express"
// DAOS
import DAOS from "../../DAOS/index.js"
// Utils
import { nodemailerTransporter, mailOptionsNewOrder } from "../../utils/sendMail.js"
import { client, options } from "../../utils/sendTMs.js"
import { ADMIN_PHONE } from "../../utils/globalConstants.js"
// Authentication
import { localAuth } from "../../middlewares/auth.js"
// Controllers
const cartRouter = express.Router()
const { CartDAO } = DAOS
const cartDAO = new CartDAO()
cartRouter.post("/", async (req, res) => {
    try {
        const emptyCart = req.body
        emptyCart.products = []
        emptyCart.complete = false
        const cart = await cartDAO.save(emptyCart)
        res.status(201).json({
            message: "OK",
            cart: cart
        })
    } catch (error) {
        res.status(400).json({
            message: "Error",
            error: error.message
        })
    }
})
cartRouter.post("/:id/complete", localAuth, async (req, res) => {
    try {
        const { id } = req.params
        const cart = await cartDAO.getById(id)
        if (!cart) return res.status(404).json({ message: "Cart not found" })
        if (cart.complete === true) return res.status(400).json({
            message: "Error",
            error: "The cart is already completed"
        })
        await nodemailerTransporter.sendMail(mailOptionsNewOrder(req.user.name, req.user.lastname, req.user.username, cart))
        await client.messages.create(options(req.user.name, req.user.lastname, req.user.username, cart, ADMIN_PHONE || `+${req.user.phone}`))
        cart.complete = true
        const cartComplete = await cartDAO.update(id, cart)
        res.status(200).json({
            message: "OK",
            cart: cartComplete
        })   
    } catch (error) {
        res.status(400).json({
            message: "Error",
            error: error.message
        })
    }
})
cartRouter.delete("/:id", async (req, res) => {
    try {
        const cart = await cartDAO.deleteById(req.params.id)
        res.status(200).json({
            message: "OK",
            deleted: cart
        })
    } catch (error) {
        res.status(400).json({
            message: "Error",
            error: error.message
        })
    }
})
cartRouter.get("/", async (req, res) => {
    try {
        const cart = await cartDAO.getAll()
        res.status(200).json({
            message: "OK",
            cart: cart
        })
    } catch (error) {
        res.status(400).json({
            message: "Error",
            error: error.message
        })
    }
})
cartRouter.get("/:id/products", async (req, res) => {
    try {
        const cart = await cartDAO.getById(req.params.id)
        const products = cart.products
        const complete = cart.complete
        res.status(200).json({
            message: "OK",
            products: products,
            complete: complete
        })
    } catch (error) {
        res.status(400).json({
            message: "Error",
            error: error.message
        })
    }
})
cartRouter.post("/:id/products", async (req, res) => {
    try {
        const updated = await cartDAO.addToCart(req.params.id, req.body)
        if (updated === null) return res.status(400).json({
            message: "Error",
            error: "The cart is complete"
        })
        if (!updated) return res.status(400).json({
            message: "Error",
            error: "Out of stock"
        })
        return res.status(201).json({
            message: "OK",
            cart: updated
        })
    } catch (error) {
        res.status(400).json({
            message: "Error",
            error: error.message
        })
    }
})
cartRouter.delete("/:id/products/:productId", async (req, res) => {
    try {
        const updated = await cartDAO.deleteFromCart(req.params.id, req.params.productId)
        res.status(200).json({
            message: "OK",
            cart: updated
        })
    } catch (error) {
        res.status(400).json({
            message: "Error",
            error: error.message
        })
    }
})
export default cartRouter