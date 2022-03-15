// Routers
import productRouter from "./product/product.js"
import productRouterTest from "./product/productTest.js"
import cartRouter from "./cart/cart.js"
// Global router
import Router from "koa-router"
const router = new Router({
  prefix: "/api",
})
// Routes
router.use(productRouter.routes())
router.use(productRouterTest.routes())
router.use(cartRouter.routes())
// Exporting router
export default router
