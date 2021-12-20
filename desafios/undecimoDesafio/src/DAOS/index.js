// Requiring DAOS User
const UserDAOMongoDB = require("./users/UserDAOMongoDB");

const DAOS = {}

// User
if (process.env.STORAGE === "mongodb") DAOS["UserDAO"] = UserDAOMongoDB;

module.exports = DAOS;