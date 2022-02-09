import express from "express"
// Routers
import productRouter from "./product/product.js"
import productRouterTest from "./product/productTest.js"
import cartRouter from "./cart/cart.js"
import authRouter from "./auth/auth.js"
// Global router
const router = express.Router()
// Routes
router.use("/products", productRouter)
router.use("/products-test", productRouterTest)
router.use("/cart", cartRouter)
router.use("/auth", authRouter)
// Exporting router
export default router