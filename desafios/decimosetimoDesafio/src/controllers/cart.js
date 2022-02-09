// DAOS
import persistence from "./index.js"
// Services
import { nodemailerTransporter, mailOptionsNewOrder } from "../services/sendMail.js"
import { client, options } from "../services/sendTMs.js"
// Utils
import { ADMIN_PHONE } from "../utils/globalConstants.js"
// Controllers
const cartDAO = persistence.cartDAO
// Defining controllers
const createCart = async (req, res) => {
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
}
const deleteCartById = async (req, res) => {
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
}
const getCarts = async (req, res) => {
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
}
const getProductsFromACart = async (req, res) => {
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
}
const addProductToCart = async (req, res) => {
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
}
const deleteProductFromCart = async (req, res) => {
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
}
const finishCart = async (req, res) => {
    try {
        const { id } = req.params
        const cart = await cartDAO.getById(id)
        if (!cart) return res.status(404).json({ message: "Cart not found" })
        if (cart.complete === true) return res.status(400).json({
            message: "Error",
            error: "The cart is already completed"
        })
        await nodemailerTransporter.sendMail(mailOptionsNewOrder(req.user.name, req.user.lastname, req.user.username, cart))
        if (process.argv[2] !== "file" && process.argv[2] !== "memory") {
            await client.messages.create(options(req.user.name, req.user.lastname, req.user.username, cart, ADMIN_PHONE || `+${req.user.phone}`))
        }
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
}
// Exporting controllers
export default {
    createCart,
    deleteCartById,
    getCarts,
    getProductsFromACart,
    addProductToCart,
    deleteProductFromCart,
    finishCart
}