import express from "express"
// Controllers
import orderController from "../../controllers/order.js"
// Middlewares
import { admin } from "../../middlewares/admin.js"
// Defining the router
const orderRouter = express.Router()
// Routers
orderRouter.post("/", admin, orderController.createOrder)
orderRouter.get("/:id", orderController.getOrders)
// Exporting router
export default orderRouter
