import express from 'express'
import handlebars from "express-handlebars"
import Contenedor from "../Contenedor.js"
import ContenedorCarro from "../contenedorCarro.js"
const { Router } = express

import {
    productosDao as productosApi,
    carritosDao as carritosApi
} from './daos/index.js'

//------------------------------------------------------------------------
// instancio servidor

const app = express()

//views
app.set("view engine", "hbs");
app.set("views", "../views/layouts");
app.use(express.static("public"));
app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: "",
        layoutsDir: "",
        partialsDir: "/views/partials"
    })
);
//--------------------------------------------
// permisos de administrador

const esAdmin = true



//--------------------------------------------
// configuro router de productos

const productosRouter = new Router()

productosRouter.get('/', async (req, res) => {
    const contenedor = new Contenedor("../DB/productos.json");
    const productos = await contenedor.getAll();
    // res.json({ productos });
    res.render("productos", {
        titulo: "Útiles escolares 2022",
        list: productos,
        listExist: true,
        producto: true
    });
})

productosRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const contenedor = new Contenedor("../DB/productos.json");
    const producto = await contenedor.getById(parseInt(id));
    res.json({ producto });
})

productosRouter.post("/", async (req, res) => {
    if (esAdmin) {
        const objProducto = req.body;
        const contenedor = new Contenedor("./productos.json");
        contenedor.save(objProducto);
        res.json({ message: "Producto guardado", objProducto });
    } else {
        res.json({
            error: -1,
            message: "No tienes permisos para agregar productos"
        });
    }
});

productosRouter.put("/:id", async (req, res) => {
    if (esAdmin) {
        const { id } = req.params;
        const objProducto = req.body;
        // llamo la clase
        const contenedor = new Contenedor("./productos.json");
        contenedor.updateById({ id: parseInt(id), ...objProducto });
        res.json({ message: "Producto actualizado" });
    } else {
        res.json({
            error: -1,
            message: "No tienes permisos para actualizar productos"
        });
    }
});

productosRouter.delete("/:id", async (req, res) => {
    if (esAdmin) {
        const { id } = req.params;
        const contenedor = new Contenedor("./productos.json");
        contenedor.deleteById(parseInt(id));
        res.json({ message: "Producto eliminado" });
    } else {
        res.json({
            error: -1,
            message: "No tienes permisos para eliminar productos"
        });
    }
});

//--------------------------------------------
// configuro router de carritos

const carritosRouter = new Router()

carritosRouter.post("/", async (req, res) => {
    const carrito = new ContenedorCarro("../DB/carritos.json");
    const idCarrito = await carrito.save(req.body);
    res.json({ message: "Producto guardado en carrito", idCarrito });
});

carritosRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const carrito = new ContenedorCarro("./carrito.json");
    await carrito.deleteById(parseInt(id));
});

//--------------------------------------------------
// router de productos en carrito

carritosRouter.get('/:id/productos', async (req, res) => {
    const carrito = await carritosApi.listar(req.params.id)
    res.json(carrito.productos)
})

carritosRouter.post("/:id/productos", async (req, res) => {
    const { id } = req.params;
    const objCarrito = req.body;
    console.log(objCarrito);
    const contenedor = new ContenedorCarro("./carrito.json");
    const carritoByID = await contenedor.addProductToCart(id, objCarrito);
    res.json({ message: "Producto guardado", carritoByID });
});

carritosRouter.delete("/:idCart/productos/:idProduct", async (req, res) => {
    const { idCart, idProduct } = req.params;
    const carrito = new ContenedorCarro("./carrito.json");
    const eliminado = await carrito.deleteProductByID(parseInt(idCart), parseInt(idProduct));
    res.json({ message: "Producto Eliminado", eliminado });
});

//--------------------------------------------
// configuro el servidor

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/productos', productosRouter)
app.use('/api/carritos', carritosRouter)

export default app