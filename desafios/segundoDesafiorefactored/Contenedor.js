const fs = require("fs");
class Contenedor {
    constructor(fileName) {
        this.fileName = fileName;
    }
    async save (obj) {
        const path = `./${this.fileName}`;
        const file = async () => {
            fs.access(path, async noExist => {
                if (noExist) {
                    try {
                        let newObj = [];
                        obj.id = 1;
                        newObj.push(obj);
                        await fs.promises.writeFile(path, JSON.stringify(newObj, null, 2), "utf-8");
                    } catch (error) {
                        console.log("Hubo un error: ", error);
                    }
                } else {
                    try {
                        const readJSON = await fs.promises.readFile(path, "utf-8");
                        let newObj = [];
                        if (readJSON === "" || readJSON === "[]") {
                            obj.id = 1;
                            newObj.push(obj);
                        } else {
                            const arrRead = JSON.parse(readJSON);
                            obj.id = arrRead[arrRead.length - 1].id + 1;
                            arrRead.push(obj);
                            newObj = arrRead;
                        }
                        await fs.promises.writeFile(path, JSON.stringify(newObj, null, 2), "utf-8");
                    } catch (error) {
                        console.log("Hubo un error: ", error);
                    }
                }
            });
        }
        file();
    }
    async getById (num) {
        const path = `./${this.fileName}`;
        try {
            let objId = {};
            const readJSON = JSON.parse(await fs.promises.readFile(path, "utf-8"));
            const indexId = readJSON.map(({ id }) => id).indexOf(num);
            for (let i = 0; i < readJSON.length; i++) {
                indexId === i ? Object.assign(objId, readJSON[i]) : null;
            }
            return objId;
        } catch (error) {
            console.log("Hubo un error: ", error);
        }
    }
    async getAll () {
        const path = `./${this.fileName}`;
        try {
            return await JSON.parse(await fs.promises.readFile(path, "utf-8"));
        } catch (error) {
            console.log("Hubo un error: ", error);
        }
    }
    async deleteById (num) {
        const path = `./${this.fileName}`;
        try {
            const readJSON = JSON.parse(await fs.promises.readFile(path, "utf-8"));
            const indexId = readJSON.map(({ id }) => id).indexOf(num);
            if (indexId > -1) {
                readJSON.splice(indexId, 1);
                try {
                    await fs.promises.writeFile(path, JSON.stringify(readJSON, null, 2), "utf-8");
                    return console.log(`El prodcuto con el id: ${num} ha sido eliminado exitosamente.`);
                } catch (error) {
                    console.log("Hubo un error: ", error);
                }
            } else {
                return console.log("El producto buscado no existe");
            }
        } catch (error) {
            console.log("Hubo un error: ", error);
        }
    }
    async deleteAll () {
        const path = `./${this.fileName}`;
        try {
            const readJSON = await fs.promises.readFile(path, "utf-8");
            if (readJSON === "") {
                return console.log("La lista esta vacia.");
            } else {
                await fs.promises.writeFile(path, "", 'utf-8');
                return console.log("Todos los productos han sido eliminados exitosamente.")
            }
        } catch (error) {
            console.log("Hubo un error: ", error);
        }
    }
}
module.exports = Contenedor;