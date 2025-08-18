const express = require("express");
const https = require("https");
const bodypar = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.set("view engine", "ejs");

app.use(bodypar.urlencoded({ extended: true }));
app.use(express.static("public")); // static folder

// ❌ No global arrays now

app.get("/", function (req, res) {
  // fresh array on every refresh
  let items = [];
  let day = date.Date();
  res.render("list", { day: day, item: items });
});

app.post("/", function (req, res) {
  let item = req.body.item;

  // you can send data along with redirect using query params
  if (req.body.submit === "work") {
    res.redirect("/work?new=" + item);
  } else {
    res.redirect("/?new=" + item);
  }
});

app.get("/work", function (req, res) {
  // fresh array on every refresh
  let work = [];

  if (req.query.new) {
    work.push(req.query.new); // add only the latest submitted item
  }

  res.render("list", { day: "work", item: work });
});

app.get("/about", function (req, res) {
  res.render("about");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
