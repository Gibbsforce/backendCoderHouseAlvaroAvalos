// Iniciando express
const express = require("express");
const app = express();
// Middleware json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Redirigiendo
app.get("/", (req, res) => {
    res.redirect("http://localhost:8080/products");
});
// Carpeta estatica
app.use(express.static("src/public"));
// Formateando extension html
app.use(express.static("src/public", {
    extensions: ['html']
}));
// Router
app.use("/api/products", require("./routers/product"));
app.use("/api/cart", require("./routers/cart"));
// Asignando puerto
const PORT = process.env.PORT || 8080;
// Escucnaod puerto
app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${PORT}`);
});
// Manejo de errores
app.on("error", error => console.log(error));