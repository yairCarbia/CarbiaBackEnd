const server = require("express").Router();
const { url } = require("inspector");
const path = require('path')
const Contenedor = require("../class/contenedor");
const logger = require("../logs/loggers");
const productos = new Contenedor(path.join(__dirname, '../data/productos.json'));

server.get("/", (req, res) => {
  if (req.session.user) {
    let content = productos.content;
    let boolean = content.length !== 0;
    logger.info(`La url es : ${url}`);
    return res.render("index", {
      list: content,
      showList: boolean,
      name: req.session.user,
    });
  } else return res.redirect("login");
});

server.post("/", (req, res) => {
  if (req.session.user) {
    productos.save(req.body);
    let content = productos.content;
    let boolean = content.length !== 0;
    return res.render("index", {
      list: content,
      showList: boolean,
      name: req.session.user,
    });
  } else return res.redirect("login");
});

module.exports = server;
