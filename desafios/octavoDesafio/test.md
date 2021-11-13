# Desafio Ocho
### Creando la base de datos ecommerce
```
use ecommerce
```
### Creando las colecciones products y messages a la base de datos ecommerce
```
db.createCollection("products")
```
```
db.createCollection("messages")
```
### Agregando documentos a las colecciones
#### products
```
db.products.insertMany([
    {
        title: "Laptop",
        description: "Laptop MacBook Pro",
        code: "GFST559",
        thumbnail: "https://cdn3.iconfinder.com/data/icons/streamline-icon-set-free-pack/48/Streamline-06-512.png",
        price: 1499,
        stock: 4
    },
    {
        title: "Celular",
        description: "Celular Samsung S30",
        code: "YASP451",
        thumbnail: "https://cdn0.iconfinder.com/data/icons/online-shopping-fill-shoppers-features/512/Augmented_Reality_product_preview-512.png",
        price: 999,
        stock: 6
    },
    {
        title: "Pantalla",
        description: "Pantalla 4K 300 Hz",
        code: "PGGF542",
        thumbnail: "https://cdn0.iconfinder.com/data/icons/devices-42/512/Normal_LCD-512.png",
        price: 499,
        stock: 2
    },
    {
        title: "Audifonos",
        description: "Audifonos Beats",
        code: "ACFA122",
        thumbnail: "https://cdn1.iconfinder.com/data/icons/music-instrument-vol-2/512/headset_headphones_monitor_music-512.png",
        price: 199,
        stock: 9
    },
    {
        title: "Mouse",
        description: "Mouse RGB",
        code: "SDFE445",
        thumbnail: "https://cdn4.iconfinder.com/data/icons/it-components-2/24/mouse_human_interfave_scroll-512.png",
        price: 109,
        stock: 12
    },
    {
        title: "Tarjeta Grafica",
        description: "GPU RTX 3080-TI",
        code: "DYJ592",
        thumbnail: "url6",
        price: 899,
        stock: 5
    },
    {
        title: "CPU Ryzen",
        description: "CPU Ryzen 9 5900X",
        code: "CXX774",
        thumbnail: "url7",
        price: 1399,
        stock: 6
    },
    {
        title: "Motherboard",
        description: "Motherboard ASUS Z590",
        code: "IIP336",
        thumbnail: "url8",
        price: 249,
        stock: 13
    },
    {
        title: "Fuente Poder",
        description: "Fuente de poder 2000w",
        code: "FFG279",
        thumbnail: "url9",
        price: 599,
        stock: 7
    },
    {
        title: "Microfono",
        description: "Microfono con aislador de ruido",
        code: "XYP463",
        thumbnail: "url10",
        price: 399,
        stock: 18
    }
])
```
#### messages
```
db.messages.insertMany([
    {
        name: "test1",
        email: "test1@test.com",
        text: "Hola probando 1..."
    },
    {
        name: "test2",
        email: "test2@test.com",
        text: "Hola probando 2..."
    },
    {
        name: "test3",
        email: "test3@test.com",
        text: "Hola probando 3..."
    },
    {
        name: "test4",
        email: "test4@test.com",
        text: "Hola probando 4..."
    },
    {
        name: "test5",
        email: "test5@test.com",
        text: "Hola probando 5..."
    },
    {
        name: "test6",
        email: "test6@test.com",
        text: "Hola probando 6..."
    },
    {
        name: "test7",
        email: "test7@test.com",
        text: "Hola probando 7..."
    },
    {
        name: "test8",
        email: "test8@test.com",
        text: "Hola probando 8..."
    },
    {
        name: "test9",
        email: "test9@test.com",
        text: "Hola probando 9..."
    },
    {
        name: "test10",
        email: "test10@test.com",
        text: "Hola probando 10..."
    },
])
```
### Listando los documentos de las colecciones
#### products
```
db.products.find().pretty()
```
#### messages
```
db.messages.find().pretty()
```
### Mostrando la cantidad de documentos almacenados en cada una de las colecciones
#### products
```
db.products.count()
```
#### messages
```
db.messages.count()
```
### CRUD
#### Agregando un producto mas a la coleccion de products
##### products
```
db.products.insertOne({
    title: "Parlantes",
    description: "Parlantes HD 2000 Hz",
    code: "HYS637",
    thumbnail: "url11",
    price: 1799,
    stock: 24
})
```
#### Consulta por nombre especifico
##### Listando productos con precio menor a 500
```
db.products.find({"price": {$lt: 500}}).pretty()
```
##### Listando productos con precio entre 500 y 1000
```
db.products.find({
    $and: [
        {"price": {$gt: 500}},
        {"price": {$lt: 1000}}
    ]
}).pretty()
```
##### Listando productos con precio precio mayor a 1000
```
db.products.find({"price": {$gt: 1000}}).pretty()
```
##### Consulta para obtener el nombre del tercer producto mas barato
```
db.products.find({}, {"title": true, _id: false}).sort({"price": 1}).skip(2).limit(1)
``` 
#### Actualizando stock = 100 a todos los productos
```
db.products.updateMany({}, {$set: {"stock": 100}})
```
#### Cambiar el stock a 0 a todos los productos con precio mayor a 1500
```
db.products.updateMany({"price": {$gt: 1500}}, {$set: {"stock": 0}})
```
#### Borrar todos los productos con precio menor a 500
```
db.products.deleteMany({"price": {$lt: 500}})
```
### Crear usuario pepe password asd456 role read
```
```
