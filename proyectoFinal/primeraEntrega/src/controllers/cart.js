const Contenedor = require('../../config/Contenedor');
const contenedor = new Contenedor("./data/cart.json");
const createCart = async (cart) => {
    const createCart = await contenedor.save(cart);
    return createCart;
}
const deleteCart = async (id) => {
    const deleteCart = await contenedor.deleteById(id);
    return deleteCart;
}
const getCartById = async (id) => {
    const getCartById = await contenedor.getById(id);
    return getCartById;
}
const addToCart = async (id, product) => {
    const getCart = await contenedor.getById(id);
    const productExist = getCart.products.find(({ id }) => id === parseInt(product.id));
    if(productExist) return false;
    getCart.products.push(product);
    const addToCart = await contenedor.update(id, getCart);
    return addToCart;
}
const deleteFromCart = async (id, productId) => {
    const getCart = await contenedor.getById(id);
    const index = getCart.products.findIndex(({ id }) => id === parseInt(productId));
    getCart.products.splice(index, 1);
    const deleteFromCart = await contenedor.update(id, getCart);
    return deleteFromCart;
}
module.exports = {
    createCart,
    deleteCart,
    getCartById,
    addToCart,
    deleteFromCart
}