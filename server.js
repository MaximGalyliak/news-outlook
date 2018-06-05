const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const cheerio = require("cheerio");
//Routes
const api_routes = require("./routes/api_routes");
const user_routes = require("./routes/user_routes");

var PORT = process.env.PORT || 3000;

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/news-outlook";

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
//Our css and js in public folder
app.use(express.static("public"));

mongoose.connect(MONGODB_URI);
//handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// Routes
app.use("/api", api_routes);
app.use("/", user_routes);

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
