import express from "express"
// Routers
import productRouter from "./product/product.js"
// import productRouter from "../GraphQL/productGraphQL.js"
import productRouterTest from "./product/productTest.js"
import cartRouter from "./cart/cart.js"
import orderRouter from "./order/order.js"
import authRouter from "./auth/auth.js"
// Global router
const router = express.Router()
// Routes
router.use("/products", productRouter)
router.use("/products-test", productRouterTest)
router.use("/cart", cartRouter)
router.use("/orders", orderRouter)
router.use("/auth", authRouter)
// Exporting router
export default router
