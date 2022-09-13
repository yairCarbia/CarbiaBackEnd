const express = require("express");
const handlebars = require("express-handlebars");

const { optionsMariaDB } = require("./mariaDB/conectionMariaDb")
const { optionsSqlite3 } = require("./sqlite3/conectionSqlite3")

const knexMariaDb = require("knex")(optionsMariaDB);
const knexSqlite3 = require("knex")(optionsSqlite3);

const { Contenedor } = require("./Contenedor")




const { Server: HttpServer } = require("http");
const { Server: IoServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IoServer(httpServer);

app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 2000;


const productosContenedor = new Contenedor(knexMariaDb, "products");
const mensajes = new Contenedor(knexSqlite3, "messages");

io.on("connection", async socket => {
    let mensajesChat = await mensajes.getAll();
    // console.log("Se contectó un usuario");

    const mensaje = {
        mensaje: "ok",
        mensajesChat
    };

    socket.emit("mensaje-servidor", mensaje);

    socket.on("mensaje-nuevo", async (msg, cb) => {
        mensajesChat.push(msg);
        const mensaje = {
            mensaje: "mensaje nuevo",
            mensajesChat
        };

        const id = new Date().getTime();
        io.sockets.emit("mensaje-servidor", mensaje);
        cb(id);
        await mensajes.save({
            id,
            mail: msg.mail,
            mensaje: msg.mensaje,
            hora: msg.hora
        });
    });
});

app.get("/api/mensajes/:id", async (req, res) => {
    const { id } = req.params;
    const productoById = await mensajes.getById(id);
    productoById
        ? res.json(productoById)
        : res.json({ error: "Producto no encontrado" });
});
app.put("/api/mensajes/;id", async (req, res) => {
    const { id } = req.params;
    const respuesta = await mensajes.updateById(id, req.body)
    res.json(respuesta);
    msj = await mensajes.getAll();
})
app.delete("/api/mensajes/:id", async (req, res) => {
    const { id } = req.params;
    res.json(await mensajes.deleteById(id));
    msj = await mensajes.getAll();
});
app.delete("/api/mensajes", async (req, res) => {
    res.json(await mensajes.deleteAll());
    msj = await mensajes.getAll();
});

app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.static("public"));

app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: "",
        layoutsDir: "",
        partialsDir: __dirname + "/views"
    })
);

app.get("/", async (req, res) => {
    const productos = await productosContenedor.getAll();
    res.render("main", {
        list: productos,
        listExist: true,
        producto: true
    })
})
app.get('/productos', async (req, res) => {
    const productos = await productosContenedor.getAll();
    res.render("productos", {

        list: productos,
        listExist: true,
        producto: true
    });

});
// const productos = [
//     {
//         "title": "coca",
//         "price": "200",
//         "thumbnail": "https://cdn0.iconfinder.com/data/icons/beverage-element-pack-1/512/can-packaging-04c-256.png",
//         id: 1
//     }
// ];

app.post('/', async (req, res) => {
    const objProducto = req.body;
    await productosContenedor.save(objProducto);

    res.redirect("/");

});
app.put("/", async (req, res) => {
    // const { id } = req.params;
    const respuesta = await productosContenedor.updateById(req.params.id, req.body);
    res.json(respuesta);
    // productos = await productosContenedor.getAll();
})

app.delete("/api/productos/:id", async (req, res) => {
    const { id } = req.params;
    res.json(await productosContenedor.deleteById(id));
    productos = await productosContenedor.getAll();
});

app.delete("/api/productos", async (req, res) => {
    res.json(await productosContenedor.deleteAll());
    productos = await productosContenedor.getAll();
});

// const getById = (id) => {
//     const p = productos.find(item => item.id === id);
//     return p;
// }

// const getPosById = (id) => {
//     const pos = productos.findIndex(item => item.id === id);
//     return pos;
// }

// const getMaxId = () => {
//     const ids = productos.map(item => item.id);
//     if (ids.length === 0) {
//         return 0;
//     }
//     return Math.max(...ids);
// }



httpServer.listen(port, err => {
    if (err) throw new Error(`Error al iniciar el servidor: ${err}`);
    console.log(`Server is running on port ${port}`);
});
