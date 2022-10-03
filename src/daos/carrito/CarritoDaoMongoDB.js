const ContenedorMongodb = require("../../contenedores/ContenendorMongoDB");
const mongoose = require("mongoose");
const { mongoConnect } = require("../../connect/mongoConnect");

const carritosCollection = "carritos";

const CarritosSchema = new mongoose.Schema({
    title: { type: String, require: true },
    thumbnail: { type: String, require: true },
    price: { type: Number, require: true },
    stock: { type: Number, require: true }
});

const carritos = mongoose.model(carritosCollection, CarritosSchema);

class CarritoDaoMongoDB extends ContenedorMongodb {
    constructor() {
        super(mongoConnect, carritos);
    }
}

module.exports = CarritoDaoMongoDB;