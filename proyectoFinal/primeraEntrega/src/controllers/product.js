const Contenedor = require('../../config/Contenedor');
const contenedor = new Contenedor("./data/products.json");
const getProducts = async () => {
    const getProducts = await contenedor.getAll();
    return getProducts;
}
const getProduct = async (id) => {
    const getProduct = await contenedor.getById(id);
    return getProduct;
}
const createProduct = async (product) => {
    const createProduct = await contenedor.save(product);
    return createProduct;
}
const updateProduct = async (id, product) => {
    const updateProduct = await contenedor.update(id, product);
    return updateProduct;
}
const deleteProduct = async (id) => {
    const deleteProduct = await contenedor.deleteById(id);
    return deleteProduct;
}
module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}