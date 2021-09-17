const Contenedor = require("./Contenedor");
const contenedor = new Contenedor("./products.json");
//Agregando primer item
// contenedor.save({title: "Laptop", price: "$ 1499", thumbnail: "url1"});

//Agregando segundo item y comentando el primer item
// contenedor.save({title: "Celular", price: "$ 999", thumbnail: "url2"});

//Agregando el tercer item y comentando el segundo item
// contenedor.save({title: "Audifonos", price: "$ 99", thumbnail: "url3"});
//nota: se puede tambien agregar items llamando una sola vez al metodo: contenedor.save() cambiando los datos del objeto en el parametro y ejecutando el programa

//Obteniendo item por ID
contenedor.getById(1);

//Obteniendo todos los productos
contenedor.getAll();

//Eliminando por ID
// contenedor.deleteById(2);

//Eliminando todo
// contenedor.deleteAll();