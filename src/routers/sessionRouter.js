const server = require("express").Router();
server.get("*", (req, res) => {
  return res.render("login");
});
server.get("/login", (req, res) => {
  return res.render("login");
});
server.post("/login", (req, res) => {
  let username = req.body.name;
  req.session.user = username;
  return res.redirect("productos");
});

server.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      res.render("bye_banner");
    } else res.send({ status: "Logout ERROR", body: err });
  });
});

module.exports = server