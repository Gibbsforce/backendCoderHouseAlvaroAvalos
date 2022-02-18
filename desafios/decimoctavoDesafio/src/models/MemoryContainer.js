import fs from "fs"
import options from "../config.js"
// Logs
import logger from "../../logs/index.js"
class Contenedor {
    constructor() {
        this.array = options.memory.arr
    }
    save = async (obj) => {
        try {
            let newObj = []
            if (this.array.length === 0) {
                obj._id = 1
                obj.timestamp = new Date().toISOString()
                newObj.push(obj)
            } else {
                obj._id = this.array[this.array.length - 1]._id + 1
                obj.timestamp = new Date().toISOString()
                newObj.push(obj)
            }
            this.array = [...this.array, ...newObj]
            return obj._id
        } catch (error) {
            logger.error(`Error at saving a new item: ${error}`)
        }
    }
    getById = async (num) => {
        try {
            const objId = this.array.find(({ _id }) => _id === parseInt(num))
            if (!objId) return null
            return objId
        } catch (error) {
            logger.error(`Error at getting item: ${error}`)
        }
    }
    getAll = async () => {
        try {
            if (this.array.length === 0) return null
            return this.array
        } catch (error) {
            logger.error(`Error at getting all items: ${error}`)
        }
    }
    update = async (num, obj) => {
        try {
            const indexId = this.array.findIndex(({ _id }) => _id === parseInt(num))
            if (indexId === -1) return null
            this.array.splice(indexId, 1, obj)
            obj._id = parseInt(num)
            obj.timestamp = new Date().toISOString()
            // this.array = [...this.array, obj]
            logger.info(`Item with id: ${num} has been updated successfully.`)
            return obj
        } catch (error) {
            logger.error(`Error at updating item: ${error}`)
        }
    }
    deleteById = async (num) => {
        try {
            const indexId = this.array.findIndex(({ _id }) => _id === parseInt(num))
            if (indexId === -1) return null
            this.array.splice(indexId, 1)
            // this.array = [...this.array]
            logger.info(`Item with id: ${num} has been deleted successfully.`)
            return true
        } catch (error) {
            logger.error(`Error at removing item: ${error}`)
        }
    }
    deleteAll = async () => {
        try {
            if (this.array.length === 0) return logger.info("Empty list.")
            this.array = []
            logger.info(`All items has been removed successfully.`)
            return true
        } catch (error) {
            logger.error(`Error at removing all items: ${error}`)
        }
    }
    addToCart = async (id, product) => {
        try {
            const getCart = await this.getById(id)
            if (getCart.complete) return null
            const productExist = getCart.products.find(({ _id }) => _id === product._id)
            if (productExist) {
                if (productExist.quantity >= product.stock) return false
                const productIndex = getCart.products.findIndex(({ _id }) => _id === product._id)
                getCart.products[productIndex] = {
                    ...product,
                    quantity: productExist.quantity + 1
                }
            }
            if (!productExist) {
                getCart.products.push({
                    ...product,
                    quantity: 1
                })
            }
            const addToCart = await this.update(id, getCart)
            return addToCart
        } catch (error) {
            logger.error(`Error at adding to cart: ${error}`)
        }
    }
    deleteFromCart = async (id, productId) => {
        try {
            const getCart = await this.getById(id)
            const index = getCart.products.findIndex(({ _id }) => _id === parseInt(productId))
            getCart.products.splice(index, 1)
            const deleteFromCart = await this.update(id, getCart)
            return deleteFromCart
        } catch (error) {
            logger.error(`Error at deleting from cart: ${error}`)
        }
    }
    getUser = async (userName) => {
        try {
            const users = await this.getAll()
            const user = users.find(({ username }) => username === userName)
            if (!user) return null
            return user
        } catch (error) {
            logger.error(`Error at getting user: ${error}`)
        }
    }
    createUser = async (username, newUser) => {
        try {
            const user = await this.getUser(username)
            if (user) return { user: true, message: "User already exists" }
            const createUser = await this.save(newUser)
            if (!createUser) return { user: false, message: "Error creating user" }
            return { createdUser: newUser, created: true, message: "User created successfully" }
        } catch (error) {
            logger.error(`Error at creating user: ${error}`)
        }
    }
}
export default Contenedor