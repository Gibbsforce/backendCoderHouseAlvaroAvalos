const Contenedor = require("./Contenedor");
const contenedor = new Contenedor("products.json");
//Para agregar mas objetos, cambiar datos dentro del aobjeto addObj
const addObj = {
    title: "Laptop",
    price: "$ 1 499.00",
    thumbnail: "url1"
}
const main = async () => {
    // const id = await contenedor.save(addObj);
     console.log(id);
    // const getById = await contenedor.getById(3);
    // console.log(getById);
    // const getAll = await contenedor.getAll();
    // console.log(getAll);
    // await contenedor.deleteById(2);
    // await contenedor.deleteAll();
}
main();
