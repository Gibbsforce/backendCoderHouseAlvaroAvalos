// Controllers
import cartController from "../../controllers/cart.js"
// Defining the router
import Router from "koa-router"
const cartRouter = new Router({
  prefix: "/cart",
})
// Routers
cartRouter.post("/", cartController.createCart)
cartRouter.delete("/:id", cartController.deleteCartById)
cartRouter.get("/", cartController.getCarts)
cartRouter.get("/:id/products", cartController.getProductsFromACart)
cartRouter.post("/:id/products", cartController.addProductToCart)
cartRouter.delete(
  "/:id/products/:productId",
  cartController.deleteProductFromCart
)
// Exporting router
export default cartRouter
