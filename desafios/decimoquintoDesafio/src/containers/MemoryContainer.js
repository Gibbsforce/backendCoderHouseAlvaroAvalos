const products = [];
const cart = [];
class ProductsContainer {
    save(obj) {
        try {
            if (products.length === 0) {
                obj._id = 1;
                obj.timestamp = new Date().toISOString();
                products.push(obj);
            } else {
                obj._id = products[products.length - 1]._id + 1;
                obj.timestamp = new Date().toISOString();
                products.push(obj);
            }
            return products._id;
        } catch (error) {
            console.log("Hubo un error de escritura agregando nuevo item: ", error);
        }
    }
    getById(num) {
        try {
            const objId = products.find(({ _id }) => _id === parseInt(num));
            if (!objId) return null;
            return objId;
        } catch (error) {
            console.log("Hubo un error obteniendo un item: ", error);
        }
    }
    getAll() {
        try {
            return products;
        } catch (error) {
            console.log("Hubo un error obteniendo todos los items: ", error);
        }
    }
    update(num, obj) {
        try {
            const indexId = products.findIndex(({ _id }) => _id === parseInt(num));
            if (indexId === -1) return null;
            products.splice(indexId, 1, obj);
            obj._id = parseInt(num);
            obj.timestamp = new Date().toISOString();
            console.log(`El producto con el id: ${num} ha sido actualizado exitosamente.`);
            return obj;
        } catch (error) {
            console.log("Hubo un error actualizando el item: ", error);
        }
    }
    deleteById(num) {
        try {
            const indexId = products.findIndex(({ _id }) => _id === parseInt(num));
            if (indexId === -1) return null;
            products.splice(indexId, 1);
            console.log(`El item con el id: ${num} ha sido eliminado exitosamente.`);
            return true;
        } catch (error) {
            console.log("Hubo un error  eliminando un item: ", error);
        }
    }
    deleteAll() {
        try {
            products = [];
            console.log("Todos los productos han sido eliminados exitosamente.");
            return true;
        } catch (error) {
            console.log("Hubo un error eliminando todos los items: ", error);
        }
    }
    addToCart = async (id, product) => {
        const getCart = await this.getById(id);
        const productExist = getCart.products.find(({ _id }) => _id === parseInt(product._id));
        if (productExist) return false;
        getCart.products.push(product);
        const addToCart = await this.update(id, getCart);
        return addToCart;
    }
    deleteFromCart = async (id, productId) => {
        const getCart = await this.getById(id);
        const index = getCart.products.findIndex(({ _id }) => _id === parseInt(productId));
        getCart.products.splice(index, 1);
        const deleteFromCart = await this.update(id, getCart);
        return deleteFromCart;
    }
}
class CartContainer {
    save(obj) {
        try {
            if (cart.length === 0) {
                obj._id = 1;
                obj.timestamp = new Date().toISOString();
                cart.push(obj);
            } else {
                obj._id = cart[cart.length - 1]._id + 1;
                obj.timestamp = new Date().toISOString();
                cart.push(obj);
            }
            return cart._id;
        } catch (error) {
            console.log("Hubo un error de escritura agregando nuevo item: ", error);
        }
    }
    getById(num) {
        try {
            const objId = cart.find(({ _id }) => _id === parseInt(num));
            if (!objId) return null;
            return objId;
        } catch (error) {
            console.log("Hubo un error obteniendo un item: ", error);
        }
    }
    getAll() {
        try {
            return cart;
        } catch (error) {
            console.log("Hubo un error obteniendo todos los items: ", error);
        }
    }
    update(num, obj) {
        try {
            const indexId = cart.findIndex(({ _id }) => _id === parseInt(num));
            if (indexId === -1) return null;
            cart.splice(indexId, 1, obj);
            obj._id = parseInt(num);
            obj.timestamp = new Date().toISOString();
            console.log(`El producto con el id: ${num} ha sido actualizado exitosamente.`);
            return obj;
        } catch (error) {
            console.log("Hubo un error actualizando el item: ", error);
        }
    }
    deleteById(num) {
        try {
            const indexId = cart.findIndex(({ _id }) => _id === parseInt(num));
            if (indexId === -1) return null;
            cart.splice(indexId, 1);
            console.log(`El item con el id: ${num} ha sido eliminado exitosamente.`);
            return true;
        } catch (error) {
            console.log("Hubo un error  eliminando un item: ", error);
        }
    }
    deleteAll() {
        try {
            cart = [];
            console.log("Todos los productos han sido eliminados exitosamente.");
            return true;
        } catch (error) {
            console.log("Hubo un error eliminando todos los items: ", error);
        }
    }
    addToCart = async (id, product) => {
        const getCart = await this.getById(id);
        const productExist = getCart.products.find(({ _id }) => _id === parseInt(product._id));
        if (productExist) return false;
        getCart.products.push(product);
        const addToCart = await this.update(id, getCart);
        return addToCart;
    }
    deleteFromCart = async (id, productId) => {
        const getCart = await this.getById(id);
        const index = getCart.products.findIndex(({ _id }) => _id === parseInt(productId));
        getCart.products.splice(index, 1);
        const deleteFromCart = await this.update(id, getCart);
        return deleteFromCart;
    }
}
module.exports = {
    ProductsContainer,
    CartContainer
}