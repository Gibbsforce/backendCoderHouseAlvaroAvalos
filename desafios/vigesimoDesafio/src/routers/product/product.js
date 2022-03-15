// Controllers
import productController from "../../controllers/product.js"
// Defining the router
import Router from "koa-router"
const productRouter = new Router({
  prefix: "/products",
})
// Routers
productRouter.get("/", productController.getProducts)
productRouter.get("/:id", productController.getProductById)
productRouter.get(
  "/localprice/products",
  productController.getProductsLocalPrice
)
productRouter.post("/", productController.createProduct)
productRouter.put("/:id", productController.updateProductById)
productRouter.delete("/:id", productController.deleteProductById)
productRouter.delete("/", productController.deleteProducts)
// Exporting router
export default productRouter
