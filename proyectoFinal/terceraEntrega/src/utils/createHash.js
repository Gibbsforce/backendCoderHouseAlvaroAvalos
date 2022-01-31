import bCrypt from "bCrypt"
// Hashing a password with bCrypt
const createHash = (password) => bCrypt.hashSync(
    password,
    bCrypt.genSaltSync(10),
    null
)
export default createHash
