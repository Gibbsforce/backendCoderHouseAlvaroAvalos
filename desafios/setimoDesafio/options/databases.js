// Motor de base de datos: MySQL
const optionMariaDB  = {
    client: "mysql",
    connection: {
        host: "localhost",
        user: "",
        password: "",
        database: "products",
        port: 3306
    },
    pool: {
        min: 0,
        max: 7
    }
}
// Motor de base de datos: SQLite3
const optionSQLite = {
    client: "sqlite3",
    connection: {
        filename: "./DB/ecommerce.sqlite"
    },
    useNullAsDefault: true
}
// Exportando los motores de base de datos
module.exports = {
    optionMariaDB,
    optionSQLite
}