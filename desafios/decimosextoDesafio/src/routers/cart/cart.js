import express from "express"
// Controllers
import cartController from "../../controllers/cart.js"
// Middlewares: Authentication
import { localAuth } from "../../middlewares/auth.js"
// Defining the router
const cartRouter = express.Router()
// Routers
cartRouter.post("/", cartController.createCart)
cartRouter.delete("/:id", cartController.deleteCartById)
cartRouter.get("/", cartController.getCarts)
cartRouter.get("/:id/products", cartController.getProductsFromACart)
cartRouter.post("/:id/products", cartController.addProductToCart)
cartRouter.delete("/:id/products/:productId", cartController.deleteProductFromCart)
cartRouter.post("/:id/complete", localAuth, cartController.finishCart)
// Exporting router
export default cartRouter