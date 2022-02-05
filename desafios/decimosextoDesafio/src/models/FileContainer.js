import fs from "fs"
import options from "../config.js"
class Contenedor {
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
                console.log("Error creating the file: ", error)
            }
        });
        if (!file) return console.log("File created, please save again.")
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
            console.log("Writting error at saving a new item: ", error)
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
            console.log("Error at getting an item: ", error)
        }
    }
    getAll = async () => {
        const path = `./${this.fileName}`
        try {
            const readJSON = await fs.promises.readFile(path, "utf-8")
            if (readJSON === "" || readJSON === "[]") return null
            return JSON.parse(readJSON)
        } catch (error) {
            console.log("Error at getting all items: ", error)
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
            console.log(`Item with id: ${num} has been updated successfully.`)
            return obj
        } catch (error) {
            console.log("Error at updating the item: ", error)
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
            console.log(`Item with id: ${num} has been removed successfully.`)
            return true
        } catch (error) {
            console.log("Error at removing the item: ", error)
        }
    }
    deleteAll = async () => {
        const path = `./${this.fileName}`;
        try {
            const readJSON = await fs.promises.readFile(path, "utf-8")
            if (readJSON === "") return console.log("Empty list.")
            await fs.promises.writeFile(path, "", 'utf-8')
            console.log("All items have been removed successfully.")
            return true
        } catch (error) {
            console.log("Error at removing all items: ", error)
        }
    }
    addToCart = async (id, product) => {
        try {
            const getCart = await this.getById(id);
            const productExist = getCart.products.find(({ _id }) => _id === parseInt(product._id))
            if (productExist) return false
            getCart.products.push(product)
            const addToCart = await this.update(id, getCart)
            return addToCart
        } catch (error) {
            console.log("Error at adding to cart: ", error)
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
            console.log("Error at removing from cart: ", error)
        }
    }
}
export default Contenedor