const express = require("express");
const { Contenedor } = require("./clase");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ express: true }));
app.use(express.json());
app.use(express.static("public"));


const { Router } = express;
const router = Router();


router.get("/", async (req, res) => {
    const contenedor = new Contenedor("./productos.txt");
    console.log(contenedor);
    const productos = await contenedor.getAll();
    res.json({ productos });
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const contenedor = new Contenedor("./productos.txt");

    const producto = await contenedor.getById(parseInt(id));
    console.log(producto);
    res.json({ producto });
});

router.post("/", async (req, res) => {
    const objProducto = req.body;
    const contenedor = new Contenedor("./productos.txt");
    contenedor.save(objProducto);
    res.json({ message: "Producto guardado", objProducto });
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const objProducto = req.body;


    const contenedor = new Contenedor("./productos.txt");
    contenedor.updateById({ id: parseInt(id), ...objProducto });
    res.json({ message: "Producto actualizado" });
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const contenedor = new Contenedor("./productos.txt");
    contenedor.deleteById(parseInt(id));
    res.json({ message: "Producto eliminado" });
});



app.use("/api/productos", router);


app.listen(PORT, err => {
    if (err) throw err;
    console.log(`Server running on port ${PORT}`);
});
