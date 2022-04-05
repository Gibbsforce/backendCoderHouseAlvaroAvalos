// DAOS
import persistence, { storage } from "./index.js"
// Services
import {
  nodemailerTransporter,
  mailOptionsNewOrder,
} from "../services/sendMail.js"
// import { client, options } from "../services/sendTMs.js"
// // Utils
// import { ADMIN_PHONE } from "../utils/globalConstants.js"
// Controllers
const { cartDAO } = persistence
// Defining controllers
const createCart = async (req, res) => {
  try {
    const emptyCart = new Object()
    emptyCart.products = new Array()
    emptyCart.complete = false
    const cart = await cartDAO.save(emptyCart)
    res.status(201).json({
      message: "OK",
      cart: cart,
    })
  } catch (error) {
    res.status(400).json({
      message: "Error",
      error: error.message,
    })
  }
}
const deleteCartById = async (req, res) => {
  try {
    const cart = await cartDAO.deleteById(req.params.id)
    if (cart === null)
      return res.status(404).json({ message: "Cart not found" })
    res.status(200).json({
      message: "OK",
      deleted: cart,
    })
  } catch (error) {
    res.status(400).json({
      message: "Error",
      error: error.message,
    })
  }
}
const getCarts = async (req, res) => {
  try {
    const cart = await cartDAO.getAll()
    res.status(200).json({
      message: "OK",
      cart: cart,
    })
  } catch (error) {
    res.status(400).json({
      message: "Error",
      error: error.message,
    })
  }
}
const getProductsFromACart = async (req, res) => {
  try {
    const cart = await cartDAO.getById(req.params.id)
    if (cart === null)
      return res.status(404).json({ message: "Cart not found" })
    const products = cart.products
    const complete = cart.complete
    res.status(200).json({
      message: "OK",
      products: products,
      complete: complete,
    })
  } catch (error) {
    res.status(400).json({
      message: "Error",
      error: error.message,
    })
  }
}
const addProductToCart = async (req, res) => {
  try {
    const updated = await cartDAO.addToCart(req.params.id, req.body)
    if (updated === undefined)
      return res.status(404).json({ message: "Cart not found" })
    if (updated === null)
      return res.status(400).json({
        message: "Error",
        error: "The cart is complete",
      })
    if (updated === false)
      return res.status(400).json({
        message: "Error",
        error: "Out of stock",
      })
    return res.status(201).json({
      message: "OK",
      cart: updated,
    })
  } catch (error) {
    res.status(400).json({
      message: "Error",
      error: error.message,
    })
  }
}
const deleteProductFromCart = async (req, res) => {
  try {
    const updated = await cartDAO.deleteFromCart(
      req.params.id,
      req.params.productId
    )
    if (updated === undefined)
      return res.status(404).json({ message: "Cart not found" })
    if (updated === null)
      return res.status(404).json({ message: "Product not found" })
    if (updated === false)
      return res.status(400).json({ message: "Cart is empty" })
    res.status(200).json({
      message: "OK",
      cart: updated,
    })
  } catch (error) {
    res.status(400).json({
      message: "Error",
      error: error.message,
    })
  }
}
const finishCart = async (req, res) => {
  try {
    const { id } = req.params
    const cart = await cartDAO.getById(id)
    if (!cart) return res.status(404).json({ message: "Cart not found" })
    if (cart.complete === true)
      return res.status(400).json({
        message: "Error",
        error: "The cart is already completed",
      })
    await nodemailerTransporter.sendMail(
      mailOptionsNewOrder(
        req.user.name,
        req.user.lastname,
        req.user.username,
        cart
      )
    )
    // if (storage !== "file" && storage !== "memory") {
    //   await client.messages.create(
    //     options(
    //       req.user.name,
    //       req.user.lastname,
    //       req.user.username,
    //       cart,
    //       ADMIN_PHONE || `+${req.user.phone}`
    //     )
    //   )
    // }
    cart.complete = true
    const cartComplete = await cartDAO.update(id, cart)
    res.status(200).json({
      message: "OK",
      cart: cartComplete,
    })
  } catch (error) {
    res.status(400).json({
      message: "Error",
      error: error.message,
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
  finishCart,
}
