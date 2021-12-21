const bCrypt = require("bcrypt");
// Validating the password
const isValidPassword = (user, password) => {
    return bCrypt.compareSync(password, user.password);
}
module.exports = isValidPassword;