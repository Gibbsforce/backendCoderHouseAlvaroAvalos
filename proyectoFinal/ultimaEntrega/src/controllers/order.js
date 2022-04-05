// DAOS
import persistence from "./index.js"
// Controllers
const { orderDAO } = persistence
// Defining controllers
const createOrder = async (req, res) => {
  try {
    const order = await orderDAO.createOrder(req.body)
    res.status(201).json({
      message: "OK",
      order: order,
    })
  } catch (error) {
    res.status(500).json({
      message: "Error",
      error: error.message,
    })
  }
}
const getOrders = async (req, res) => {
  try {
    const orders = await orderDAO.getOrders(req.params.id)
    if (orders === null)
      return res.status(404).json({ message: "Orders not found" })
    res.status(200).json({
      message: "OK",
      orders: orders,
    })
  } catch (error) {
    res.status(500).json({
      message: "Error",
      error: error.message,
    })
  }
}
// Exporting controllers
export default {
  createOrder,
  getOrders,
}
