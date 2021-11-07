// Exportando el contenedor de items
const Contenedor = require("../../config/Contenedor");
// Asignando un motor de base de datos
const { optionMariaDB } = require("../../options/databases");
// Creando la table si no existe
const { createProductsTable } = require("../../scripts/createTables");
createProductsTable();
// Instanciando el motor de base de datos y la tabla productos creada al contenedor
const contenedor = new Contenedor(optionMariaDB, "products");
// Obtiene todos los productos
const getProducts = async () => {
    const getProducts = await contenedor.getAll();
    return getProducts;
}
// Obtiene producto por id
const getProduct = async (id) => {
    const getProduct = await contenedor.getById(id);
    return getProduct;
}
// Crenado un nuevo producto
const createProduct = async (product) => {
    const createProduct = await contenedor.save(product);
    return createProduct;
}
// Actualizando un producto
const updateProduct = async (id, product) => {
    const updateProduct = await contenedor.update(id, product);
    return updateProduct;
}
// Borrando un producto
const deleteProduct = async (id) => {
    const deleteProduct = await contenedor.deleteById(id);
    return deleteProduct;
}
// Borrando todos los productos
const deleteProducts = async () => {
    const deleteProducts = await contenedor.deleteAll();
    return deleteProducts;
}
// Exportando las funciones de los metodos
module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    deleteProducts
}