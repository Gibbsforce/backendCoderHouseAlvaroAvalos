// Iniciando express
const express = require("express");
const app = express();
// Requerir router
const productsRouter = require("./routers/products");
// Asignando puerto
const PORT = 8080;
// Middleware json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Formateando motor de plantilla ejs
app.set("view engine", "ejs");
// Inicio y renderizando a formulario
app.get("/", (req, res) => {
    res.render("pages");
});
// Accediendo al router
app.use("/", productsRouter);
// Sirviendo al puerto
app.listen(PORT, () => console.log(`Sirviendo puerto: ${PORT}`));
// Manejo de errores
app.on("error", error => console.log("Error: ", error));