const express = require("express");
const https = require("https");
const bodypar = require("body-parser");
const date = require(__dirname + "/date.js");
const session = require("express-session");

const app = express();
app.set("view engine", "ejs");

app.use(bodypar.urlencoded({ extended: true }));
app.use(express.static("public"));

// ✅ Use session to store items/work per user
app.use(
  session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", function (req, res) {
  if (!req.session.items) {
    req.session.items = []; // fresh list per user
  }
  var day = date.Date();
  res.render("list", { day: day, item: req.session.items });
});

app.post("/", function (req, res) {
  var item = req.body.item;

  if (req.body.submit === "work") {
    if (!req.session.work) {
      req.session.work = [];
    }
    req.session.work.push(item);
    res.redirect("/work");
  } else {
    req.session.items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  if (!req.session.work) {
    req.session.work = []; // fresh work list per user
  }
  res.render("list", { day: "work", item: req.session.work });
});

app.get("/about", function (req, res) {
  res.render("about");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
