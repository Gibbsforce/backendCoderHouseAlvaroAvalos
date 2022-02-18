// DAOS
import persistence from "./index.js"
// DTOS
import { ProductDTO, Quoter } from "../DTOS/index.js"
// Controllers
const { productDAO } = persistence
// Defining controllers
const getProducts = async (req, res) => {
    try {
        const products = await productDAO.getAll()
        res.status(200).json({
            message: "OK",
            products: products
        })
    } catch (error) {
        res.status(500).json({
            message: "Error",
            error: error.message
        })
    }
}
const getProductById = async (req, res) => {
    try {
        const product = await productDAO.getById(req.params.id)
        res.status(200).json({
            message: "OK",
            product: product
        })
    } catch (error) {
        res.status(500).json({
            message: "Error",
            error: error.message
        })
    }
}
const getProductsLocalPrice = async (req, res) => {
    try {
        const products = await productDAO.getAll()
        const productsDTO = products.map(product => {
            const quoters = {
                localPrice: new Quoter().getLocalPrice(product.price, "USD")
            }
            const productDTO = new ProductDTO(product, quoters)
            return productDTO
        })
        res.status(200).json({
            message: "OK",
            product: productsDTO
        })
    } catch (error) {
        res.status(500).json({
            message: "Error",
            error: error.message
        })
    }
}
const createProduct = async (req, res) => {
    try {
        const dataId = await productDAO.save(req.body)
        res.status(201).json({
            message: "OK",
            created: dataId,
            product: req.body
        })
    } catch (error) {
        res.status(500).json({
            message: "Error",
            error: error.message
        })
    }
}
const updateProductById = async (req, res) => {
    try {
        const id = req.params.id
        const update = req.body
        const data = await productDAO.update(id, update)
        res.status(200).json({
            message: "OK",
            updated: data
        })
    } catch (error) {
        res.status(500).json({
            message: "Error",
            error: error.message
        })
    }
}
const deleteProductById = async (req, res) => {
    try {
        const data = await productDAO.deleteById(req.params.id)
        res.status(200).json({
            message: "OK",
            deleted: data,
            id: req.params.id
        })
    } catch (error) {
        res.status(500).json({
            message: "Error",
            error: error.message
        })
    }
}
const deleteProducts = async (req, res) => {
    try {
        const data = await productDAO.deleteAll()
        res.status(200).json({
            message: "OK",
            deletedAll: data
        })
    } catch (error) {
        res.status(500).json({
            message: "Error",
            error: error.message
        })
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
    deleteProducts
}