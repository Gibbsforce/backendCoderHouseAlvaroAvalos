// DAOS
import persistence from "../controllers/index.js"
// DTOS
import { ProductDTO, Quoter } from "../DTOS/index.js"
// Controllers
const { productDAO } = persistence
// Defining controllers
const getProducts = async () => {
    try {
        const products = await productDAO.getAll()
        return [{
            message: "OK",
            products: products
        }]
    } catch (error) {
        return [{
            message: "Error",
            error: error.message
        }]
    }
}
const getProductById = async ({ id }) => {
    try {
        const product = await productDAO.getById(id)
        if (product === null) return [{ message: "Not found" }]
        return [{
            message: "OK",
            product: product
        }]
    } catch (error) {
        return [{
            message: "Error",
            error: error.message
        }]
    }
}
const getProductsLocalPrice = async () => {
    try {
        const products = await productDAO.getAll()
        const productsDTO = products.map(product => {
            const quoters = {
                localPrice: new Quoter().getLocalPrice(product.price, "USD")
            }
            const productDTO = new ProductDTO(product, quoters)
            return productDTO
        })
        return [{
            message: "OK",
            product: productsDTO
        }]
    } catch (error) {
        return [{
            message: "Error",
            error: error.message
        }]
    }
}
const createProduct = async ({ data }) => {
    try {
        const dataId = await productDAO.save(data)
        return [{
            message: "OK",
            created: dataId,
            product: data
        }]
    } catch (error) {
        return [{
            message: "Error",
            error: error.message
        }]
    }
}
const updateProductById = async ({ id, data }) => {
    try {
        const _id = id
        const update = data
        const _data = await productDAO.update(_id, update)
        if (_data === null) return [{ message: "Not found" }]
        return [{
            message: "OK",
            updated: _data
        }]
    } catch (error) {
        return [{
            message: "Error",
            error: error.message
        }]
    }
}
const deleteProductById = async ({ id }) => {
    try {
        const data = await productDAO.deleteById(id)
        if (data === null) return [{ message: "Not found" }]
        return [{
            message: "OK",
            deleted: data,
            id: id
        }]
    } catch (error) {
        return [{
            message: "Error",
            error: error.message
        }]
    }
}
const deleteProducts = async () => {
    try {
        const data = await productDAO.deleteAll()
        if (data?._readableState?.objectMode === true ) return [{ message: "There's nothing to delete" }]
        return [{
            message: "OK",
            deletedAll: data
        }]
    } catch (error) {
        return [{
            message: "Error",
            error: error.message
        }]
    }
}
// Exporting controllers
export {
    getProducts,
    getProductById,
    getProductsLocalPrice,
    createProduct,
    updateProductById,
    deleteProductById,
    deleteProducts
}