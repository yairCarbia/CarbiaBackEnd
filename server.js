require('dotenv').config()
const express = require("express");
const handlebars = require("express-handlebars");
const { Contenedor } = require("./contenedor");
const { ContenedorCarro } = require("./contenedorCarro");

const app = express();
const PORT = process.env.PORT || 8080;

const { Carrito, Producto } = require("./src/daos/index");

const carritos = new Carrito();
const Productos = new Producto();

app.use(express.urlencoded({ express: true }));
app.use(express.json()); // función entre

app.set("view engine", "hbs");
app.set("views", "./views/layouts");

app.use(express.static("public"));

app.engine(
	"hbs",
	handlebars.engine({
		extname: ".hbs",
		defaultLayout: "",
		layoutsDir: "",
		partialsDir: __dirname + "/views/partials"
	})
);

const admin = true;

//Rutas
const { Router } = express;
const routerProductos = Router();
const routerCarrito = Router();

//RUTAS PRODUCTOS

//Mostrar Productos
routerProductos.get("/", async (req, res) => {
	const contenedor = new Contenedor("./productos.json");
	const productos = await contenedor.getAll();
	// res.json({ productos });
	res.render("productos", {
		titulo: "Útiles escolares 2022",
		list: productos,
		listExist: true,
		producto: true
	});
});

//Por ID
routerProductos.get("/:id", async (req, res) => {
	const { id } = req.params;
	const contenedor = new Contenedor("./productos.json");
	const producto = await contenedor.getById(parseInt(id));
	res.json({ producto });
});

//Agregar Productos si es admin 
routerProductos.post("/", async (req, res) => {
	if (admin) {
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

// Aactualizar productos por id si es admin 
routerProductos.put("/:id", async (req, res) => {
	if (admin) {
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

// Eliminar productos si es admin
routerProductos.delete("/:id", async (req, res) => {
	if (admin) {
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

// Error 404 de productos
routerProductos.get("*", async (req, res) => {
	res.json({
		error: -2,
		description: "Ruta no implementada"
	});
});

//RUTAS CARRITO

// Obtener carrito por ID
routerCarrito.get("/:id", async (req, res) => {
	const { id } = req.params;
	const contenedor = new ContenedorCarro("./carrito.json");
	const carrito = await contenedor.getById(parseInt(id));
	// res.json({ carrito });
	res.render("carritos", {
		titulo: `Carrito ${id}`,
		tiempo: carrito.timestamp,
		list: carrito.productos,
		listExist: true,
		carrito: true
	});
});

// Obtener los productos del carrito
routerCarrito.get("/:id/productos", async (req, res) => {
	const { id } = req.params;
	const carrito = new ContenedorCarro("./carrito.json");
	const carritoById = await carrito.getById(parseInt(id));
	listaProductos = carritoById.productos;
	res.json(listaProductos);
});


//agregar un carrito
routerCarrito.post("/", async (req, res) => {
	const carrito = new ContenedorCarro("./carrito.json");
	const idCarrito = await carrito.save(req.body);
	res.json({ message: "Producto guardado en carrito", idCarrito });
});

//Agrega un producto al carrito :id
routerCarrito.post("/:id/productos", async (req, res) => {
	const { id } = req.params;
	const objCarrito = req.body;
	console.log(objCarrito);
	const contenedor = new ContenedorCarro("./carrito.json");
	const carritoByID = await contenedor.addProductToCart(id, objCarrito);
	res.json({ message: "Producto guardado", carritoByID });
});

// Eliminar carrito por ID
routerCarrito.delete("/:id", async (req, res) => {
	const { id } = req.params;
	const carrito = new ContenedorCarro("./carrito.json");
	await carrito.deleteById(parseInt(id));
});

//Elimina un producto del carrito
routerCarrito.delete("/:idCart/productos/:idProduct", async (req, res) => {
	const { idCart, idProduct } = req.params;
	const carrito = new ContenedorCarro("./carrito.json");
	const eliminado = await carrito.deleteProductByID(parseInt(idCart), parseInt(idProduct));
	res.json({ message: "Producto Eliminado", eliminado });
});

//Erorr 404 de carritos
routerCarrito.get("*", async (req, res) => {

	res.json({
		error: -2,
		description: "Ruta no implementada"
	});
});

app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);


app.listen(PORT, err => {
	if (err) throw err;
	console.log(`Server running on port ${PORT}`);
});
