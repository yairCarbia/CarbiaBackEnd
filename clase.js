const fs = require("fs");

class Contenedor {
    constructor(archivo) {
        this.archivo = archivo;
    }
    async save(obj) {
        try {
            const lectura = await fs.promises.readFile(this.archivo, "utf-8");
            const data = await JSON.parse(lectura);
            if (lectura.length) {
                await fs.promises.writeFile(this.archivo, JSON.stringify(
                    [...data, { ...obj, id: data.length + 1 }],
                    null,
                    2
                ));
                console.log(`El archivo tiene id: ${data.length + 1}`);
            } else {
                await fs.promises.writeFile(
                    this.archivo,
                    JSON.stringify([{ ...obj, id: data.length + 1 }], null, 2)
                );
                console.log(`El archivo tiene id: ${data.length + 1}`);
            }
        } catch (error) { console.log(error); }


    }


    async getAll() {
        try {
            const lectura = await fs.promises.readFile(this.archivo, "utf-8");
            const data = await JSON.parse(lectura);
            return data;
        } catch (error) { console.log(error); }
    }
    async getById(id) {
        try {
            const lectura = await fs.promises.readFile(this.archivo, "utf-8");
            const data = await JSON.parse(lectura);
            const busqueda = data.find(item => item.id === id);
            if (busqueda) { console.log(busqueda); return busqueda; }
            else { return null }
        }
        catch (error) { console.log(error); }
    }
    async deleteById(id) {
        try {
            const lectura = await fs.promises.readFile(this.archivo, "utf-8");
            const data = await JSON.parse(lectura);
            const busqueda = data.find(item => item.id === id);
            if (busqueda) {
                const filtrado = data.filter(item => item.id !== id)
                await fs.promises.writeFile(this.archivo, JSON.stringify(filtrado));
            };

        }
        catch (error) { console.log(error); }
    }
    async deleteAll() {
        try {
            const lectura = await fs.promises.readFile(this.archivo, "utf-8");
            const data = await JSON.parse(lectura);
            if (data.length) {
                const resultado = await fs.promises.writeFile(this.archivo, JSON.stringify([]));

            }
        } catch (error) { console.log(error); }
    }
}

module.exports = Contenedor;