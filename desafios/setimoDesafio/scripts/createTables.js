// Asignando un motor de base de datos
const { optionMariaDB, optionSQLite } = require("../options/databases");
// Exportando los knex con el motor de base de datos
const knexMySQL = require("knex")(optionMariaDB);
const knexSQLite3 = require("knex")(optionSQLite);
// Funcion que crea la tabla de productos si no existe y si existe eliminandola con el motor de base de datos MariaDB
const createProductsTable = async () => {
    try {
        const tableExists = await knexMySQL.schema.hasTable("products");
        if (tableExists) return true;
        await knexMySQL.schema.createTable("products", table => {
            table.increments("id").primary();
            table.string("title");
            table.string("description");
            table.string("code");
            table.string("thumbnail");
            table.string("price");
            table.string("stock");
            table.timestamp("timestamp").defaultTo(knexMySQL.fn.now());
        });
        console.log("Table products created");
    } catch (error) {
        console.log(error);
    } finally {
        await knexMySQL.destroy();
    }
}
// Funcion que crea la tabla de mensajes si no existe y si existe eliminandola con el motor de base de datos SQLite3
const createMessagesTable = async () => {
    try {
        const tableExists = await knexSQLite3.schema.hasTable("messages");
        if (tableExists) return true;
        await knexSQLite3.schema.createTable("messages", table => {
            table.increments("id").primary();
            table.string("email");
            table.string("message");
            table.string("date");
        });
        console.log("Table messages created");
    } catch (error) {
        console.log(error);
    } finally {
        await knexSQLite3.destroy();
    }
}
// Exportando las funciones
module.exports = {
    createProductsTable,
    createMessagesTable
}