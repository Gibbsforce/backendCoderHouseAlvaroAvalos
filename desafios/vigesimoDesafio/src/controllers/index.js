import { DEFINING_STORAGE } from "../utils/globalConstants.js"
import PersistenceFactorySingleton from "../DAOS/index.js"
export const storage = DEFINING_STORAGE === "env" ? process.env.STORAGE : DEFINING_STORAGE === "argv" ? process.argv[2] : process.env.STORAGE
const persistence = PersistenceFactorySingleton.getInstance(storage)
export default persistence