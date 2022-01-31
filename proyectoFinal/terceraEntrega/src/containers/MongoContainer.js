import mongoose from "mongoose"
import options from "../config.js"
// Logs
import logger from "../../logs/index.js"
class MongoContainer {
    constructor(collection, schema) {
        this.collection = mongoose.model(collection, schema)
        this.init()
    }
    init = async () => {
        if (!this.connection) {
            try {
                this.connection = await mongoose.connect(options.mongodb.cnxStr, options.mongodb.options)
            } catch (error) {
                logger.error(`Error conneting to the DB: ${error}`)
            }
        }
    }
    save = async (obj) => {
        try {
            const document = await this.collection.create(obj)
            return document._id
        } catch (error) {
            logger.error(`Error at adding new item: ${error}`)
        }
    }
    getById = async (id) => {
        try {
            const document = await this.collection.find({ _id: id })
            if (document.length === 0) return null
            return document[0]
        } catch (error) {
            logger.error(`Error at getting new item: ${error}`)            
        }
    }
    getAll = async () => {
        try {
            const documents = await this.collection.find({})
            return documents
        } catch (error) {
            logger.error(`Error at getting new item: ${error}`)
        }
    }
    update = async (id, obj) => {
        try {
            const { n, nModified } = await this.collection.updateOne({ _id: id }, { $set: obj })
            if (n == 0 || nModified == 0) return null
            const updated = await this.getById(id)
            return updated
        } catch (error) {
            logger.error(`Error at updating item: ${error}`)
        }
    }
    deleteById = async (id) => {
        try {
            const { n } = await this.collection.deleteOne({ _id: id })
            if (n == 0) return null
            return true
        } catch (error) {
            logger.error(`Error at deleting item: ${error}`)
        }
    }
    deleteAll = async () => {
        try {
            await this.collection.deleteMany({})
            return true
        } catch (error) {
            logger.error(`Error at deleting all items: ${error}`)
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
            const index = getCart.products.findIndex(({ _id }) => _id === productId)
            getCart.products.splice(index, 1)
            const deleteFromCart = await this.update(id, getCart)
            return deleteFromCart
        } catch (error) {
            logger.error(`Error at deleting from cart: ${error}`)
        }
    }
}
export default MongoContainer