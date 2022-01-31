// Requiring DAOS Products
import ProductDAOFile from "./products/ProductDAOFile.js"
import ProductDAOMongoDB from "./products/ProductDAOMongoDB.js"
// Requiring DAOS Cart
import CartDAOFile from "./cart/CartDAOFile.js"
import CartDAOMongoDB from "./cart/CartDAOMongoDB.js"
// Requiring DAOS messages
import MessageDAOFile from "./messages/MessageDAOFile.js"
import MessageDAOMongoDB from "./messages/MessageDAOMongoDB.js"
// Users
import UserDAOMongoDB from "./users/UserDAOMongoDB.js"

const DAOS = {}

// Products
if (process.env.STORAGE === "file") DAOS["ProductDAO"] = ProductDAOFile
if (process.env.STORAGE === "mongodb") DAOS["ProductDAO"] = ProductDAOMongoDB
// Cart
if (process.env.STORAGE === "file") DAOS["CartDAO"] = CartDAOFile
if (process.env.STORAGE === "mongodb") DAOS["CartDAO"] = CartDAOMongoDB
// Messages
if (process.env.STORAGE === "file") DAOS["MessageDAO"] = MessageDAOFile
if (process.env.STORAGE === "mongodb") DAOS["MessageDAO"] = MessageDAOMongoDB
// Users
if (process.env.STORAGE === "mongodb") DAOS["UserDAO"] = UserDAOMongoDB

export default DAOS