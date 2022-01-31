import bCrypt from "bCrypt"
// Validate password
const isValidPassword = (user, password) => bCrypt.compareSync(
    password,
    user.password
)
export default isValidPassword