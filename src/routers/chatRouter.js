const server = require("express").Router();
const loggerMiddleware = require("../middlewares/loggerMiddleware")

server.get("/", (req, res) => {
  if (req.session.user) {
    return res.render("chat");
  } else return res.redirect("login");
});

module.exports = server;
