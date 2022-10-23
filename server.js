//Requires

require("dotenv").config();
const express = require("express")
const handlebars = require("express-handlebars");
const session = require("express-session");
const app = express();
const MongoStore = require("connect-mongo");
//Web sockect

const { Server: HttpServer } = require("http");
const { Server: IoServer } = require("socket.io");
const httpServer = new HttpServer(app);
const io = new IoServer(httpServer);
//Middlewares

const { generadorProductos } = require("./src/utils/generadorProductos");
const checkAuthentication = require("./src/utils/checkeoAuth");
const passport = require("./src/utils/passportMiddleware");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
const PORT = process.env.PORT || 8080;

const productosRandoms = generadorProductos();
const { Carrito, Producto, Login, Chat } = require("./src/daos/index");

const Carritos = new Carrito();
let Productos = new Producto();

const Logins = new Login();
const Chats = new Chat();

const User = new Login();

//hbs
app.set("view engine", "hbs");
app.set("views", "./src/views/layouts");

app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: "",
        layoutsDir: "",
        partialsDir: __dirname + "/src/views/partials"
    })
);

app.use(
    session({
        store: MongoStore.create({
            mongoUrl: "mongodb+srv://root:ytouKOg0TYr2TIGM@cluster0.jciyqmy.mongodb.net/?retryWrites=true&w=majority",
            mongoOptions: {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        }),
        secret: process.env.MONGODB_SECRETO || "hola123123",
        resave: false,
        rolling: true,
        saveUninitialized: false,
        cookie: {
            httpOnly: false,
            secure: false,
            maxAge: 90000
        }
    })
);
//Passport
app.use(passport.initialize());
app.use(passport.session());

app.get("/", checkAuthentication, async (req, res) => {
    const productos = await Productos.getAll();
    res.render("index", { productos });
});


app.get("/login", (req, res) => {
    if (req.isAuthenticated()) {
        let user = req.user;
        console.log("usuario logueado");
        res.render("index");
    } else {
        console.log("user no logueado");
        res.render("login");
    }
});

app.post(
    "/login",
    passport.authenticate("login", {
        successRedirect: "/",
        failureRedirect: "faillogin"
    }),

    (req, res) => {
        res.render("/", { username: req.body.username });
    }
);

app.get("/register", (req, res) => {
    res.render("register");
});

app.post(
    "/register",
    passport.authenticate("register", {
        failureRedirect: "failregister",
        successRedirect: "login"
    }),
    (req, res) => {
        res.render("/login", { username: req.body.username });
    }
);

app.get("/failregister", (req, res) => {
    console.error("Error de registro");
    // now redirect to failregister.hbs
    res.render("failregister");
});


app.get("/faillogin", (req, res) => {
    console.error("Error de login");
    res.render("faillogin");
});


app.get("/logout", async (req, res = response, next) => {
    req.logout(err => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

app.post("/api/carrito", (req, res) => {
    let timestamp = Date.now();
    let { title, price, thumbnail } = req.body;
    let producto = {
        title,
        price,
        thumbnail,
        timestamp
    };
    Carritos.save(producto).then(data => {
        res.json({ id: data });
    });
});


app.delete("/api/carrito/:id", (req, res) => {
    const { id } = req.params;


    Carritos.deleteById(id).then(data => {
        res.json({ delete: id });
    });
});


app.get("/api/carrito/:id/productos", (req, res) => {
    const { id } = req.params;
    Carritos.getById(id).then(data => {
        res.json(data);
    });
});


app.post("/api/carrito/:id/productos", (req, res) => {
    const { id } = req.params;
    const { id_prod } = req.body;

    Productos.getById(id_prod).then(productoData => {
        Carritos.save(id, productoData).then(data => {
            res.json(data);
        });
    });
});


app.delete("/api/carrito/:id/productos/:id_prod", (req, res) => {
    const { id, id_prod } = req.params;

    Carritos.deleteById(id, id_prod).then(data => {
        res.json(data);
    });
});


//Chat 
io.on("connection", async socket => {
    let mensajesChat = await Chats.getAll();
    console.log("Se contectó un usuario");

    const text = {
        text: "ok",
        mensajesChat
    };

    socket.emit("mensaje-servidor", text);

    socket.on("mensaje-nuevo", async (msg, cb) => {
        mensajesChat.push(msg);
        const text = {
            text: "mensaje nuevo",
            mensajesChat
        };

        io.sockets.emit("mensaje-servidor", text);
        await Chats.save({
            mail,
            msg,
            fecha
        });
        return (mensajesChat = await Chats.getAll());
    });
});

httpServer.listen(PORT, () => {
    console.log(`Server listening on ${PORT} ⚡`);
});
