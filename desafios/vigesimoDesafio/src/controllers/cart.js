// DAOS
import persistence from "./index.js"
// Controllers
const { cartDAO } = persistence
// Defining controllers
const createCart = async (ctx) => {
  try {
    const emptyCart = new Object()
    emptyCart.products = new Array()
    emptyCart.complete = false
    const cart = await cartDAO.save(emptyCart)
    ctx.response.status = 201
    ctx.body = {
      message: "OK",
      cart: cart,
    }
  } catch (error) {
    ctx.response.status = 500
    ctx.body = {
      message: "Error",
      error: error.message,
    }
  }
}
const deleteCartById = async (ctx) => {
  try {
    const cart = await cartDAO.deleteById(ctx.params.id)
    if (cart === null) {
      ctx.response.status = 404
      return (ctx.body = { message: "Cart not found" })
    }
    ctx.response.status = 200
    ctx.body = {
      message: "OK",
      deleted: cart,
    }
  } catch (error) {
    ctx.response.status = 400
    ctx.body = {
      message: "Error",
      error: error.message,
    }
  }
}
const getCarts = async (ctx) => {
  try {
    const cart = await cartDAO.getAll()
    ctx.response.status = 200
    ctx.body = {
      message: "OK",
      cart: cart,
    }
  } catch (error) {
    ctx.response.status = 400
    ctx.body = {
      message: "Error",
      error: error.message,
    }
  }
}
const getProductsFromACart = async (ctx) => {
  try {
    const cart = await cartDAO.getById(ctx.params.id)
    if (cart === null) {
      ctx.response.status = 404
      return (ctx.body = { message: "Cart not found" })
    }
    const products = cart.products
    const complete = cart.complete
    ctx.response.status = 200
    ctx.body = {
      message: "OK",
      products: products,
      complete: complete,
    }
  } catch (error) {
    ctx.response.status = 400
    ctx.body = {
      message: "Error",
      error: error.message,
    }
  }
}
const addProductToCart = async (ctx) => {
  try {
    const updated = await cartDAO.addToCart(ctx.params.id, ctx.request.body)
    if (updated === undefined) {
      ctx.response.status = 404
      return (ctx.body = { message: "Cart not found" })
    }
    if (updated === null) {
      ctx.response.status = 400
      return (ctx.body = {
        message: "Error",
        error: "The cart is complete",
      })
    }
    if (updated === false) {
      ctx.response.status = 400

      return (ctx.body = {
        message: "Error",
        error: "Out of stock",
      })
    }
    ctx.response.status = 201
    ctx.body = {
      message: "OK",
      cart: updated,
    }
  } catch (error) {
    ctx.response.status = 400
    ctx.body = {
      message: "Error",
      error: error.message,
    }
  }
}
const deleteProductFromCart = async (ctx) => {
  try {
    const updated = await cartDAO.deleteFromCart(
      ctx.params.id,
      ctx.params.productId
    )
    if (updated === undefined) {
      ctx.response.status = 404
      return (ctx.body = { message: "Cart not found" })
    }
    if (updated === null) {
      ctx.response.status = 404
      return (ctx.body = { message: "Product not found" })
    }
    if (updated === false) {
      ctx.response.status = 400
      return (ctx.body = { message: "Cart is empty" })
    }
    ctx.response.status = 200
    ctx.body = {
      message: "OK",
      cart: updated,
    }
  } catch (error) {
    ctx.response.status = 400
    ctx.body = {
      message: "Error",
      error: error.message,
    }
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
}
