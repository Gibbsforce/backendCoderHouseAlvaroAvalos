const knex = require("knex");
class Contenedor {
    constructor(config, table) {
        this.config = knex(config);
        this.table = table;
    }
    async save (obj) {
        try {
            const [newObjId] = await this.config(this.table).insert(obj);
            return newObjId;
        } catch (error) {
            console.log("Hubo un error agregando nuevo item: ", error);
        }
    }
    async getById (num) {
        try {
            const objId = await this.config.from(this.table).select("*").where("id", num);
            if (objId.length === 0) return null;
            return objId;
        } catch (error) {
            console.log("Hubo un error obteniendo un item: ", error);
        }
    }
    async getAll () {
        try {
            const objs = await this.config.from(this.table).select("*");
            if (objs.length === 0) return null;
            return objs;
        } catch (error) {
            console.log("Hubo un error obteniendo todos los items: ", error);
        }
    }
    async update (num, obj) {
        try {
            const updatedObj = await this.config.from(this.table).where("id", num).update(obj);
            if (!updatedObj) return null;
            console.log(`El producto con el id: ${num} ha sido actualizado exitosamente.`);
            return await this.getById(num);
        } catch (error) {
            console.log("Hubo un error actualizando el item: ", error);
        }
    }
    async deleteById (num) {
        try {
            const deletedObj = await this.config.from(this.table).where("id", num).del();
            if (!deletedObj) return null;
            console.log(`El item con el id: ${num} ha sido eliminado exitosamente.`);
            return true;
        } catch (error) {
            console.log("Hubo un error  eliminando un item: ", error);
        }
    }
    async deleteAll () {
        try {
            const deleted = await this.config.from(this.table).del();
            if (!deleted) return null;
            await this.config.from(this.table).truncate();
            return true;
        } catch (error) {
            console.log("Hubo un error eliminando todos los items: ", error);
        }
    }
}
module.exports = Contenedor;