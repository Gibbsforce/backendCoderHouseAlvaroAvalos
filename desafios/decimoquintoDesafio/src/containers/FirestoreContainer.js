const admin = require("firebase-admin");
const options = require("../config");
class FirestoreContainer {
    constructor(collection) {
        this.init();
        this.db = admin.firestore();
        this.query = this.db.collection(collection);
    }
    async init() {
        !admin.apps.length ? admin.initializeApp({ credential: admin.credential.cert(options.firestore) }) : admin.app();
    }
    async save(obj) {
        try {
            const docId = this.query.doc();
            obj._id = docId.id;
            await docId.create(obj);
            return obj._id;
        } catch (error) {
            console.log("Hubo un error agregando nuevo item: ", error);
        }
    }
    async getById(id) {
        try {
            const doc = await this.query.doc(id).get();
            return doc.data();
        } catch (error) {
            console.log("Hubo un error obteniendo un item: ", error);
        }
    }
    async getAll() {
        try {
            const snapshot = await this.query.get();
            return snapshot.docs.map(doc => doc.data());
        } catch (error) {
            console.log("Hubo un error obteniendo todos los items: ", error);
        }
    }
    async update(id, obj) {
        try {
            const up = await this.query.doc(id).update(obj);
            if (!up) return null;
            const updated = await this.getById(id);
            return updated;
        } catch (error) {
            console.log("Hubo un error actualizando el item: ", error);
        }
    }
    async deleteById(id) {
        try {
            const deleted = await this.query.doc(id).delete();
            if (!deleted) return null;
            return true;
        } catch (error) {
            console.log("Hubo un error eliminando un item: ", error);
        }
    }
    async deleteAll() {
        try {
            const snapshot = await this.query.get();
            snapshot.docs.forEach(doc => doc.ref.delete());
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
module.exports = FirestoreContainer;