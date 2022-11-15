const express = require("express");
const session = require("express-session");
const expbs = require("express-handlebars");
require("dotenv").config({ path: "./config/.env" });
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const path = require("path");
const routes = require("../src/routers/index")
const passport = require("./middlewares/passportMiddleware")
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
//LOG4JS
const logger = require("./logs/loggers");
/*      PERSISTENCIA POR MONGO ATLAS     */
const MongoStore = require("connect-mongo");
const adavancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
/* ------------------------------------- */

//Session config
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: "mongodb+srv://root:ytouKOg0TYr2TIGM@cluster0.jciyqmy.mongodb.net/?retryWrites=true&w=majority",
      mongoOptions: adavancedOptions,
    }),
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
  })
);

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("./views/layouts"));
app.use("/", routes);

//Motor de plantillas
app.set("view engine", "hbs");
app.set("views", "./src/views/layouts");

app.engine(
  "hbs",
  expbs.engine({
    extname: ".hbs",
    defaultLayout: "",
    layoutsDir: "",
    partialsDir: __dirname + "/views/partials"
  })
);


//passport
app.use(passport.initialize());
app.use(passport.session());

/* CHAT */
const ApiChat = require("./api/apiChat");
const apiChat = new ApiChat();
let messages = [];

io.on("connection", async (socket) => {
  let messagesToEmit = await apiChat.readChatFromFile();

  messages.splice(0, messages.length);
  for (const m of messagesToEmit) {
    messages.push(m);
  }

  socket.emit("messages", messagesToEmit);

  socket.on("new-message", (data) => {
    data.id = messages.length + 1
    messages.push(data);

    io.sockets.emit("messages", [data]);

    apiChat.writeChatToFile(messages);
  });
});

//Manejador de errores
app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send("Ocurrio un error: " + err);
});
app.use((req, res, next) => {
  logger.warn("NONE EXISTING URL");
  res.sendStatus("404");
});

//Server
httpServer.listen(process.env.PORT || 8080, () => {
  console.log("SERVER ON");
});
