// DAOS
import persistence from "./index.js"
// DTOS
import { ProductDTO, Quoter } from "../DTOS/index.js"
// Controllers
const { productDAO } = persistence
// Defining controllers
const getProducts = async (ctx) => {
  try {
    const products = await productDAO.getAll()
    ctx.response.status = 200
    ctx.body = {
      message: "OK",
      products: products,
    }
  } catch (error) {
    ctx.response.status = 500
    ctx.body = {
      message: "Error",
      error: error.message,
    }
  }
}
const getProductById = async (ctx) => {
  try {
    const product = await productDAO.getById(ctx.params.id)
    if (product === null) {
      ctx.response.status = 404
      return (ctx.body = { message: "Not found" })
    }
    ctx.response.status = 200
    ctx.body = {
      message: "OK",
      product: product,
    }
  } catch (error) {
    ctx.response.status = 500
    ctx.body = {
      message: "Error",
      error: error.message,
    }
  }
}
const getProductsLocalPrice = async (ctx) => {
  try {
    const products = await productDAO.getAll()
    const productsDTO = products.map((product) => {
      const quoters = {
        localPrice: new Quoter().getLocalPrice(product.price, "USD"),
      }
      const productDTO = new ProductDTO(product, quoters)
      return productDTO
    })
    ctx.response.status = 200
    ctx.body = {
      message: "OK",
      product: productsDTO,
    }
  } catch (error) {
    ctx.response.status = 500
    ctx.body = {
      message: "Error",
      error: error.message,
    }
  }
}
const createProduct = async (ctx) => {
  try {
    const dataId = await productDAO.save(ctx.request.body)
    ctx.response.status = 201
    ctx.body = {
      message: "OK",
      created: dataId,
      product: ctx.request.body,
    }
  } catch (error) {
    ctx.response.status = 500
    ctx.body = {
      message: "Error",
      error: error.message,
    }
  }
}
const updateProductById = async (ctx) => {
  try {
    const id = ctx.params.id
    const update = ctx.request.body
    const data = await productDAO.update(id, update)
    if (data === null) {
      ctx.response.status = 404
      return (ctx.body = { message: "Not found" })
    }
    ctx.response.status = 200
    ctx.body = {
      message: "OK",
      updated: data,
    }
  } catch (error) {
    ctx.response.status = 500
    ctx.body = {
      message: "Error",
      error: error.message,
    }
  }
}
const deleteProductById = async (ctx) => {
  try {
    const data = await productDAO.deleteById(ctx.params.id)
    if (data === null) {
      ctx.response.status = 404
      return (ctx.body = { message: "Not found" })
    }
    ctx.response.status = 200
    ctx.body = {
      message: "OK",
      deleted: data,
      id: ctx.params.id,
    }
  } catch (error) {
    ctx.response.status = 500
    ctx.body = {
      message: "Error",
      error: error.message,
    }
  }
}
const deleteProducts = async (ctx) => {
  try {
    const data = await productDAO.deleteAll()
    ctx.response.status = 200
    ctx.body = {
      message: "OK",
      deletedAll: data,
    }
  } catch (error) {
    ctx.response.status = 500
    ctx.body = {
      message: "Error",
      error: error.message,
    }
  }
}
// Exporting controllers
export default {
  getProducts,
  getProductById,
  getProductsLocalPrice,
  createProduct,
  updateProductById,
  deleteProductById,
  deleteProducts,
}
