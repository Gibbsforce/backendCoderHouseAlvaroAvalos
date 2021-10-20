// Iniciando express
const express = require("express");
// Iniciando el router
const productsRouter = express.Router();
// Renderizando a form
productsRouter.get("/form", (req, res) => {
    res.render("pages");
});
// Exportando el router
module.exports = productsRouter;