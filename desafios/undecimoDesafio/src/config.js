module.exports = {
    // mongodb: {
    //     host: "mongodb://localhost/ecommerce",
    //     options: {
    //         useNewUrlParser: true,
    //         useUnifiedTopology: true,
    //         serverSelectionTimeoutMS: 5000,
    //     }
    // },
    mongoLocal: {
        client: "mongodb",
        cnxStr: "mongodb://localhost/ecommerce"
    }
}