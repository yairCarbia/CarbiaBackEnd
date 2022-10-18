const express = require("express");
const session = require("express-session");

const dotenv = require("dotenv").config();

const handlebars = require("express-handlebars");
const MongoStore = require("connect-mongo")
const advanceOptions = { useNewUrlParser: true, useUnifiedTopology: true }
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ** Render con handlebars
// ------------------------------ INICIO
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
app.use(
	session({
		store: MongoStore.create({
			mongoUrl: "mongodb+srv://root:GpDUjvP8e-d35zV@cluster0.jciyqmy.mongodb.net/test",
			mongoOptions: advanceOptions
		}),
		secret: "shghhhhhh",
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 40000
		}
	})
);

app.get("/", (req, res) => {
	const sess = req.session;
	if (sess.username && sess.password) {
		res.write(`<h1>Bievenido ${sess.username} </h1><br>`);
		res.end("<a href=" + "/logout" + ">Cerrar Sesion</a >");
	} else {
		var currentPath = process.cwd();

		res.render(currentPath + "/views/layouts/login.hbs");
	}
});

app.post("/login", async (req, res) => {
	const sess = req.session;
	const { username, password } = req.body;
	sess.username = username;
	sess.password = password;

	await res.redirect("/");
});
app.get("/logout", (req, res) => {
	req.session.destroy(err => {
		if (err) {
			return console.log(err);
		}
		res.redirect("/");
	});
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`escuchando el puerto ${PORT}`);
});
