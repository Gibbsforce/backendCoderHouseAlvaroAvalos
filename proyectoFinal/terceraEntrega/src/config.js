const config = {
    DB_HOST: process.env.DB_HOST,
    DB_DATABASE: process.env.DB_DATABASE,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_CLIENT: process.env.DB_CLIENT
}
const options = {
    file: {
        path: "./DB"
    },
    mongodb: process.env.DEV && process.env.DEV === "yes" ? {
        cnxStr: `mongodb://localhost/${config.DB_DATABASE}`,
        client: config.DB_CLIENT,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        }
    } : {
        cnxStr: `mongodb://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST}/${config.DB_DATABASE}?ssl=true&replicaSet=atlas-x601fg-shard-0&authSource=admin&retryWrites=true&w=majority`,
        client: config.DB_CLIENT,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        }
    }
}
export default options