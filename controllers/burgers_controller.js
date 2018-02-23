var express = require("express");
var burger = require("../models/burger.js");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

// this will query ALL burgers in db
// burger.selectAll();


// Create the `router` for the app, and export the `router` at the end of your file.
var app = express();
var port = 3030;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// for INSERT
app.post("/new-burger", function(req, res) {
	console.log("INSERT: ", res );
	var newBurg = res;
	burger.insertOne(newBurg);
})
// for UPDATE
app.put("/update-burger", function(req, res) {
	console.log("UPDATE: ", res );
	var updateBurg = res;
	burger.updateOne(updateBurg);

})
// for SELECT
app.get("/burgers", function(req, res) {
	console.log("SELECT: ", res );
	burger.selectAll();
})



app.listen(port, function() {
  console.log("listening on port", port);
});