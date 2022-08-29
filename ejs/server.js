const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 8080;
app.set("view engine", "ejs");
app.set("views", "./views/pages");
const router = require('express').Router();




app.get("/", async (req, res) => {
    res.render("index", {
        listaProductos: productos,
        hayLista: true,
        producto: true
    })
})
app.get('/productos', (req, res) => {
    res.render("productos", {

        listaProductos: productos,
        hayLista: true,
        producto: true
    });

});
const productos = [
    {
        "title": "coca",
        "price": "200",
        "thumbnail": "https://cdn0.iconfinder.com/data/icons/beverage-element-pack-1/512/can-packaging-04c-256.png",
        id: 1
    }
];

app.post('/productos', (req, res) => {
    if (req.body.title && req.body.price && req.body.thumbnail) {
        const id = getMaxId() + 1;
        const p = {
            "title": req.body.title,
            "price": req.body.price,
            "thumbnail": req.body.thumbnail,
            "id": id
        };
        productos.push(p);
        res.redirect("/productos");
        // res.status(200).json(p);
    }

});
const getById = (id) => {
    const p = productos.find(item => item.id === id);
    return p;
}

const getPosById = (id) => {
    const pos = productos.findIndex(item => item.id === id);
    return pos;
}

const getMaxId = () => {
    const ids = productos.map(item => item.id);
    if (ids.length === 0) {
        return 0;
    }
    return Math.max(...ids);
}





const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});
server.on('error', error => console.log(`Error en el servidor: ${error}`));
