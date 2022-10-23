const mongoose = require("mongoose");
const mongoConnect = async () => {
    try {
        const URL = "mongodb+srv://root:ytouKOg0TYr2TIGM@cluster0.jciyqmy.mongodb.net/?retryWrites=true&w=majority";
        mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("DATABASE CONENCTED 😎");

    } catch (error) {
        console.error("Error de conexion 😵");
    }

};

module.exports = mongoConnect;