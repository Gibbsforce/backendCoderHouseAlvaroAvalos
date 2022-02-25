// Requiring DAOS Products
import ProductDAOMemory from "./products/ProductDAOMemory.js"
import ProductDAOFile from "./products/ProductDAOFile.js"
import ProductDAOMongoDB from "./products/ProductDAOMongoDB.js"
// Requiring DAOS Cart
import CartDAOMemory from "./cart/CartDAOMemory.js"
import CartDAOFile from "./cart/CartDAOFile.js"
import CartDAOMongoDB from "./cart/CartDAOMongoDB.js"
// Requiring DAOS messages
import MessageDAOMemory from "./messages/MessageDAOMemory.js"
import MessageDAOFile from "./messages/MessageDAOFile.js"
import MessageDAOMongoDB from "./messages/MessageDAOMongoDB.js"
// Users
import UserDAOMemory from "./users/UserDAOMemory.js"
import UserDAOFile from "./users/UserDAOFile.js"
import UserDAOMongoDB from "./users/UserDAOMongoDB.js"

class PersistenceFactorySingleton {

    static instance

    constructor() {
        this.productDAO = null
        this.cartDAO = null
        this.messageDAO = null
        this.userDAO = null
    }

    static getInstance(persistence) {

        if (!!PersistenceFactorySingleton.instance) {
            return PersistenceFactorySingleton.instance
        }

        if (persistence === "memory") {
            this.productDAO = new ProductDAOMemory()
            this.cartDAO = new CartDAOMemory()
            this.messageDAO = new MessageDAOMemory()
            this.userDAO = new UserDAOMemory()
            PersistenceFactorySingleton.instance = this
            return this
        }

        if (persistence === "file") {
            this.productDAO = new ProductDAOFile()
            this.cartDAO = new CartDAOFile()
            this.messageDAO = new MessageDAOFile()
            this.userDAO = new UserDAOFile()
            PersistenceFactorySingleton.instance = this
            return this
        }

        if (persistence === "mongodb") {
            this.productDAO = new ProductDAOMongoDB()
            this.cartDAO = new CartDAOMongoDB()
            this.messageDAO = new MessageDAOMongoDB()
            this.userDAO = new UserDAOMongoDB()
            PersistenceFactorySingleton.instance = this
            return this
        }

        this.productDAO = new ProductDAOMemory()
        this.cartDAO = new CartDAOMemory()
        this.messageDAO = new MessageDAOMemory()
        this.userDAO = new UserDAOMemory()
        PersistenceFactorySingleton.instance = this
        return this
    }
}

export default PersistenceFactorySingleton