//Implementado server y adquiriendo los metodos de express
const express = require("express");
const Contenedor = require("./clase")
const contenedor = new Contenedor("./productos.txt");
const app = express();
const PORT = process.env.PORT || 8080;


app.get("/productos", async (req, res) => {
    try {
        const productos = await contenedor.getAll();
        const parseProd = await JSON.parse(productos);
        res.send("Realizado por Carbia Yair, Productos: \n" + parseProd);
    } catch (error) { console.log(error); }

})
app.get("/productorandom", async (req, res) => {
    let randomNumber = Math.floor(Math.random() * 3) + 1;
    const productRandom = await contenedor.getById(randomNumber);
    res.send(productRandom)
})
const server = app.listen(PORT, () => { console.log("Server corriendo en " + PORT); });

