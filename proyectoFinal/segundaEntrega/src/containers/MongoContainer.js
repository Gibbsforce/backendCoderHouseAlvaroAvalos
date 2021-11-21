const mongoose = require("mongoose");
const options = require("../config");
class MongoContainer {
    constructor(collection, schema) {
        this.collection = mongoose.model(collection, schema);
        this.init();
    }
    async init() {
        if (!this.connection) {
            this.connection = await mongoose.connect(options.mongodb.host, options.mongodb.options);
        }
    }
    async save(obj) {
        try {
            const document = await this.collection.create(obj);
            return document._id;
        } catch (error) {
            console.log("Hubo un error agregando nuevo item: ", error);
        }
    }
    async getById(id) {
        try {
            const document = await this.collection.find({ _id: id });
            if (document.length === 0) return null;
            return document[0];

        } catch (error) {
            console.log("Hubo un error obteniendo un item: ", error);
        }
    }
    async getAll() {
        try {
            const documents = await this.collection.find({});
            return documents;
        } catch (error) {
            console.log("Hubo un error obteniendo todos los items: ", error);
        }
    }
    async update(id, obj) {
        try {
            const { n, nModified } = await this.collection.updateOne({ _id: id }, { $set: obj });
            if (n == 0 || nModified == 0) return null;
            const updated = await this.getById(id);
            return updated;
        } catch (error) {
            console.log("Hubo un error actualizando el item: ", error);
        }
    }
    async deleteById(id) {
        try {
            const { n } = await this.collection.deleteOne({ _id: id });
            if (n == 0) return null;
            return true;
        } catch (error) {
            console.log("Hubo un error eliminando un item: ", error);
        }
    }
    async deleteAll() {
        try {
            await this.collection.deleteMany({});
            return true;
        } catch (error) {
            console.log("Hubo un error eliminando todos los items: ", error);
        }
    }
    addToCart = async (id, product) => {
        const getCart = await this.getById(id);
        const productExist = getCart.products.find(({ _id }) => _id === product._id);
        if (productExist) return false;
        getCart.products.push(product);
        const addToCart = await this.update(id, getCart);
        return addToCart;
    }
    deleteFromCart = async (id, productId) => {
        const getCart = await this.getById(id);
        const index = getCart.products.findIndex(({ _id }) => _id === productId);
        getCart.products.splice(index, 1);
        const deleteFromCart = await this.update(id, getCart);
        return deleteFromCart;
    }
}
module.exports = MongoContainer;