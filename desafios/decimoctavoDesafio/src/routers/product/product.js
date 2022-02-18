import express from "express"
// Controllers
import productController from "../../controllers/product.js"
// Middlewares
import { admin } from "../../middlewares/admin.js"
// Defining the router
const productRouter = express.Router()
// Routers
productRouter.get("/", productController.getProducts)
productRouter.get("/:id", productController.getProductById)
productRouter.get("/localprice/products", productController.getProductsLocalPrice)
productRouter.post("/", admin, productController.createProduct)
productRouter.put("/:id", admin, productController.updateProductById)
productRouter.delete("/:id", admin, productController.deleteProductById)
productRouter.delete("/", admin, productController.deleteProducts)
// Exporting router
export default productRouter