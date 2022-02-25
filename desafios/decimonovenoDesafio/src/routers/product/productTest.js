import express from "express"
// Controllers
import productTestController from "../../controllers/productTest.js"
// Defining the router
const productRouterTest = express.Router()
// Routers
productRouterTest.get("/", productTestController.gettingProductsTest)
// Exporting router
export default productRouterTest