import fs from "fs"
import options from "../config.js"
// Logs
import logger from "../../logs/index.js"
class FileCoontainer {
    constructor(fileName) {
        this.fileName = `${options.file.path}/${fileName}`;
    }
    save = async (obj) => {
        const path = `./${this.fileName}`;
        const file = await fs.promises.access(path, fs.constants.F_OK).then(() => true).catch(async () => {
            try {
                await fs.promises.writeFile(path, "", "utf-8")
                return false
            } catch (error) {
                logger.error(`Error at creating file: ${error}`)
            }
        });
        if (!file) return logger.info("File created, please save again.")
        try {
            const readJSON = await fs.promises.readFile(path, "utf-8")
            let newObj = []
            if (readJSON === "" || readJSON === "[]") {
                obj._id = 1
                obj.timestamp = new Date().toISOString()
                newObj.push(obj)
            } else {
                const arrRead = JSON.parse(readJSON)
                obj._id = arrRead[arrRead.length - 1]._id + 1
                obj.timestamp = new Date().toISOString()
                arrRead.push(obj)
                newObj = arrRead
            }
            await fs.promises.writeFile(path, JSON.stringify(newObj, null, 2), "utf-8")
            return obj._id
        } catch (error) {
            logger.error(`Writting error at saving a new item: ${error}`)
        }
    }
    getById = async (num) => {
        const path = `./${this.fileName}`
        try {
            const readJSON = JSON.parse(await fs.promises.readFile(path, "utf-8"))
            const objId = readJSON.find(({ _id }) => _id === parseInt(num))
            if (!objId) return null
            return objId
        } catch (error) {
            logger.error(`Error at getting item: ${error}`)
        }
    }
    getAll = async () => {
        const path = `./${this.fileName}`
        try {
            const readJSON = await fs.promises.readFile(path, "utf-8")
            if (readJSON === "" || readJSON === "[]") return null
            return JSON.parse(readJSON)
        } catch (error) {
            logger.error(`Error at getting all items: ${error}`)
        }
    }
    update = async (num, obj) => {
        const path = `./${this.fileName}`
        try {
            const readJSON = JSON.parse(await fs.promises.readFile(path, "utf-8"))
            const indexId = readJSON.findIndex(({ _id }) => _id === parseInt(num))
            if (indexId === -1) return null
            readJSON.splice(indexId, 1, obj)
            obj._id = parseInt(num)
            obj.timestamp = new Date().toISOString()
            await fs.promises.writeFile(path, JSON.stringify(readJSON, null, 2), "utf-8")
            logger.info(`Item with id: ${num} has been updated successfully.`)
            return obj
        } catch (error) {
            logger.error(`Error at updating item: ${error}`)
        }
    }
    deleteById = async (num) => {
        const path = `./${this.fileName}`
        try {
            const readJSON = JSON.parse(await fs.promises.readFile(path, "utf-8"))
            const indexId = readJSON.findIndex(({ _id }) => _id === parseInt(num))
            if (indexId === -1) return null
            readJSON.splice(indexId, 1)
            await fs.promises.writeFile(path, JSON.stringify(readJSON, null, 2), "utf-8")
            logger.info(`Item with id: ${num} has been deleted successfully.`)
            return true
        } catch (error) {
            logger.error(`Error at removing item: ${error}`)
        }
    }
    deleteAll = async () => {
        const path = `./${this.fileName}`;
        try {
            const readJSON = await fs.promises.readFile(path, "utf-8")
            if (readJSON === "") return logger.info("Empty list.")
            await fs.promises.writeFile(path, "", 'utf-8')
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
            if (getCart.products.length === 0) return false
            const index = getCart.products.findIndex(({ _id }) => parseInt(_id) === parseInt(productId))
            if (index === -1) return null
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
export default FileCoontainer