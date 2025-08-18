const express = require("express");
const bodypar = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.set("view engine", "ejs");

app.use(bodypar.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [];   // temp storage

app.get("/", function (req, res) {
  let day = date.Date();
  res.render("list", { day: day, item: items });
});

app.post("/", function (req, res) {
  let item = req.body.item;
  items.push(item);        // add to list
  res.redirect("/");       // now you'll see all items
});

app.get("/reset", function (req, res) {
  items = [];              // clear list when you go to /reset
  res.redirect("/");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
