// Controllers
import productTestController from "../../controllers/productTest.js"
// Defining the router
import Router from "koa-router"
const productRouterTest = new Router({
  prefix: "/products-test",
})
// Routers
productRouterTest.get("/", productTestController.gettingProductsTest)
// Exporting router
export default productRouterTest
