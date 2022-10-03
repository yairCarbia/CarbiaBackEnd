const { ContenedorArchivo } = require("../../contenedores/ContenedorArchivo");

class ProductoDaoArchivo extends ContenedorArchivo {
    constructor() {
        super("../../data/productos.json");
    }

}

module.exports = ProductoDaoArchivo;