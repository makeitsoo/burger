var express = require("express");
var method = require("method-override");
var bodyParser = require("body-parser");
var path = require("path");

var port = 3030;

var app = express();
// Serve static content for the app from the "public" directory in the app directory.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

// handlebars setup 
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// require routes to give server access to the routes
var routes = require("./controllers/burgers_controller.js");

app.use("/", routes);
app.listen(port, function() {
  console.log("server listening on localhost:", port);
});