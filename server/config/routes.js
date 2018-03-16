var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
const secret = "SuperSecret";
var User = mongoose.model("User");
var bcrypt = require("bcrypt");

module.exports = function(app, path) {
  app.get("/testApi", function(req, res) {
    res.json("Heloo");
  });
  app.post("/register", function(req, res) {
    let user = new User();
    user.name = req.body.username;
    user.password = req.body.password;
    user.save(function(err) {
      if (err) {
        return res.status(400).json({ message: err.errors });
      }
      const token = jwt.sign(req.body, secret);
      return res.status(200).json(token);
    });
  });
  app.post("/login", function(req, res) {
    User.findOne({ name: req.body.username }, function(err, user) {
      if (user) {
        bcrypt.compare(req.body.password, user.password, function(
          err,
          response
        ) {
          if (err) {
            res.status(401).json(err);
          } else {
            if (response) {
              const token = jwt.sign(req.body, secret);
              return res.status(200).json(token);
            } else {
              res.status(401).json({ message: "Please try again" });
            }
          }
        });
      } else {
        console.log(err);
        res.status(401).json({ message: "Please try again" });
      }
    });
  });
};
