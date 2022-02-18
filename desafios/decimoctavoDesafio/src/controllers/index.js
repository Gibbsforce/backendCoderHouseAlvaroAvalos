import PersistenceFactorySingleton from "../DAOS/index.js"
const persistence = PersistenceFactorySingleton.getInstance(process.argv[2])
export default persistence