const fs = require("fs");
class Mensajes {
    constructor(fileName) {
        this.fileName = fileName;
    }
    async saveMessage (obj) {
        const path = `./${this.fileName}`;
        try {
            const readJSON = await fs.promises.readFile(path, "utf-8");
            let newObj = [];
            if (readJSON === "" || readJSON === "[]") {
                newObj.push(obj);
            } else {
                const arrRead = JSON.parse(readJSON);
                arrRead.push(obj);
                newObj = arrRead;
            }
            return await fs.promises.writeFile(path, JSON.stringify(newObj, null, 2), "utf-8");
        } catch (error) {
            console.log("Hubo un error de escritura agragando nuevo mensaje: ", error);
        }
    }
    async getMessages () {
        const path = `./${this.fileName}`;
        const readJSON = await fs.promises.readFile(path, "utf-8");
        if (readJSON === "" || readJSON === "[]") return null;
        return JSON.parse(readJSON);
    }
}
module.exports = Mensajes;