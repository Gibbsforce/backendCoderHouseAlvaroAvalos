const fs = require("fs");
class Contenedor {
    constructor (fileName) {
        this.fileName = fileName;
    }
    save (obj) {
        const path = `${this.fileName}`;
        fs.access(path, error => {
            if(error) {
                const writeNew = async () => {
                    const objId = Object.assign(obj, {id: 0});
                    const newObj = [];
                    newObj.push(objId);
                    try {
                        return await fs.promises.writeFile(path, JSON.stringify(newObj, null, 2), "utf-8");
                    } catch (error){
                        console.log(error);
                    }
                }
                writeNew();
            } else {
                const writeAll = async () => {
                    try {
                        const read = JSON.parse(await fs.promises.readFile(path, "utf-8")); //mefh
                        const reading = [];
                        for (let i = 0; i < read.length; i++) {
                            reading.push(Object.assign(read[i]));
                        }
                        const arr = [];
                        arr.push(Object.assign(obj, {id: reading[reading.length - 1].id + 1}));
                        const res = [...reading, ...arr];
                        const writeJSON = async () => {
                            try {
                                return await fs.promises.writeFile(path, JSON.stringify(res, null, 2), "utf-8");
                            } catch (error) {
                                console.log(error);
                            }
                        }
                        writeJSON();
                    } catch (error) {
                        console.log(error);
                    }
                }
                writeAll();
            }
        });
    }
    getById (num) {
        const read = async () => {
            let res = {};
            try {
                const readJSON = JSON.parse(await fs.promises.readFile(this.fileName, "utf-8"));
                for (let i = 0; i < readJSON.length; i++) {
                    (num === i) ? Object.assign(res, readJSON[i]) : null;
                }
                return console.log(res);
            } catch (error) {
                console.log(error);
            }
        } 
        read();
    }
    getAll () {
        const read = async () => {
            try {
                const res = JSON.parse(await fs.promises.readFile(this.fileName, 'utf-8'));
                return console.log(res);
            } catch (error) {
                console.log(error);
            }
        }
        read();
    }
    deleteById (num) {
        const deleteId = async () => {
            try {
                const readJSON = JSON.parse(await fs.promises.readFile(this.fileName, "utf-8"));
                const indexId = readJSON.map(id => id.id).indexOf(num);
                indexId > -1 ? readJSON.splice(indexId, 1) : console.log("El producto buscado no existe");
                const writeRemoved = async () => {
                    try {
                        await fs.promises.writeFile(this.fileName, JSON.stringify(readJSON, null, 2), "utf-8");
                    } catch (error) {
                        console.log(error);
                    }
                }
                writeRemoved();
            } catch (error) {
                console.log(error);
            }
        }
        deleteId();
    }
    deleteAll() {
        const delAll = async () => {
            try {
                return await fs.promises.unlink(this.fileName)
            } catch (error) {
                console.log(error);
            }
        }
        delAll();
    }
}
module.exports = Contenedor;
