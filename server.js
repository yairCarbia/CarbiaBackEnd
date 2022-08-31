const express = require("express");
const handlebars = require("express-handlebars");

const { Contenedor } = require("./Contenedor")
const { Server: HttpServer } = require("http");
const { Server: IoServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IoServer(httpServer);

app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 8080;


const comentarios = new Contenedor("./mensajes.json");

io.on("connection", async socket => {
	let mensajesChat = await comentarios.getAll();
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
		await comentarios.save({
			id,
			mail: msg.mail,
			mensaje: msg.mensaje,
			hora: msg.hora
		});
	});
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
	res.render("main", {
		list: productos,
		listExist: true,
		producto: true
	})
})
app.get('/productos', (req, res) => {
	res.render("productos", {

		list: productos,
		listExist: true,
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



httpServer.listen(port, err => {
	if (err) throw new Error(`Error al iniciar el servidor: ${err}`);
	console.log(`Server is running on port ${port}`);
});
