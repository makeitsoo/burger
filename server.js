var express = require("express");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
// set the port 
var port = process.env.PORT || 3030;

var app = express();
// Serve static content for the app from the "public" directory in the app directory.
app.use(express.static(__dirname + "/public"));
// use parser to parse URL
app.use(bodyParser.urlencoded({ extended: false }));

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// handlebars setup 
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// require burgers_controller.js to give server access to the routes
var routes = require("./controllers/burgers_controller.js");
app.use("/", routes);

// express server listener
app.listen(port, function() {
  console.log("server listening on localhost:", port);
});