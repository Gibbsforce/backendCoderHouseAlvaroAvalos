const bCrypt = require("bCrypt");
// Hash password
const createHash = (password) => bCrypt.hashSync(
    password,
    bCrypt.genSaltSync(10),
    null
);
module.exports = createHash;